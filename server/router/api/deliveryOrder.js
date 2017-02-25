/**
 * @file 出货单 api
 */

const av = require('leanengine');
const _ = require('lodash');
const utils = require('./utils');
const sizeKeys = _.cloneDeep(utils.sizeKeys);
const defineStatus = utils.defineStatus;
const defineSizeStatus = utils.defineSizeStatus;

module.exports = router => {
    // 生成出货单
    router.post('/api/create-delivery-order', async (req, res) => {
        const user = req.currentUser;
        const { clientObjectId, orderId, note, items, isRetailed } = req.body;
        // TODO: 处理零售
        const client = av.Object.createWithoutData('Clients', clientObjectId);
        const Order = new av.Query('DeliveryOrder');
        try {
            const orders = await Order.equalTo('orderId', orderId)
                .equalTo('client', client)
                .equalTo('isRetailed', isRetailed)
                .equalTo('isDel', false)
                .find();
            if (!orders.length) {
                // 订单初始金额
                let count = 0;
                // 整理出货单的每一项，保存每一项stock的pointer
                // 并计算出订单总额
                let _items = items.map(item => {
                    let newItem = new av.Object('DeliveryItems');
                    let { shoeObjectId, unitPrice, sizes } = item;
                    let _sizes = {};
                    sizeKeys.forEach(k => {
                        let struc = {
                            needed: 0,
                            sent: 0
                        };
                        if (Object.keys(sizes).includes(k)) {
                            struc.needed = sizes[k];
                            count += (sizes[k] * unitPrice);
                        }
                        _sizes[k] = struc;
                    });
                    const shoe = av.Object.createWithoutData(
                        'Stock',
                        shoeObjectId
                    );
                    // 设置订单每一项的鞋子种类
                    newItem.set('shoeType', shoe);
                    // 设置订单每一项的尺码
                    newItem.set('sizes', _sizes);
                    // 设置订单每一项的单价
                    newItem.set('unitPrice', unitPrice);
                    return newItem;
                });
                // 获取保存之后的出货单项，然后添加到出货单的relation
                const saveItems = await av.Object.saveAll(_items);
                let newOrder = new av.Object('DeliveryOrder');
                let relation = newOrder.relation('items');
                saveItems.forEach(item => {
                    relation.add(item);
                });
                // 设置出货单的基本信息
                newOrder.set('client', client);
                newOrder.set('user', user);
                newOrder.set('orderId', orderId);
                newOrder.set('note', note);
                newOrder.set('count', count);
                // 新建出货单的时候，由于没有发货所以欠货总额应该和总额一样
                newOrder.set('notyetCount', count);
                const { id } = await newOrder.save();
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            } else {
                throw {
                    code: -1,
                    msg: '已含有该订单'
                };
            }
        } catch (e) {
            console.log(e);
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 展示出货单
    router.get('/api/show-delivery-orders', async (req, res) => {
        // TODO
    });

    // 展示出货单详情
    router.get('/api/show-delivery-order-items', async (req, res) => {
        const { id } = req.query;
        const order = av.Object.createWithoutData('DeliveryOrder', id);
        try {
            const items = await order
                .relation('items')
                .query()
                .include(['shoeType'])
                .find();
            const retData = items.map(item => ({
                itemId: item.id,
                shoeType: {
                    shoeObjectId: item.get('shoeType').id,
                    brand: item.get('shoeType').get('brand'),
                    color: item.get('shoeType').get('color'),
                    shoeId: item.get('shoeType').get('shoeId')
                },
                sizes: item.get('sizes')
            }));
            res.send({
                errNo: 0,
                retData
            });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 从仓库出货
    router.post('/api/stock-to-delivery', async (req, res) => {
        try {
            // 获取该订单的所有items
            let order = av.Object.createWithoutData('DeliveryOrder', req.body.orderObjectId);
            let orderItems = await order
                .relation('items')
                .query()
                .include(['shoeType'])
                .find();
            // 构建以id为键名的键值对
            let orderMap = new Map();
            orderItems.forEach(orderItem =>
                orderMap.set(orderItem.id, {
                    orderItem,
                    sizes: orderItem.get('sizes')
                }));
            // 需要保存的所有对象
            let saveObjects = [];
            const { changedItems } = req.body;
            for (let changedItem of changedItems) {
                const { itemId } = changedItem;
                // 原本order中的item
                let originalItem = orderMap.get(itemId).orderItem;
                // 用来计算status用的
                let statusSizes = _.cloneDeep(orderMap.get(itemId).sizes);
                let changedSizes = changedItem.sizes;
                // 获取原来的item的sizes
                let originalSizes = _.cloneDeep(originalItem.get('sizes'));
                let shoe = originalItem.get('shoeType');
                // 鞋子原来的总数
                let shoeCount = shoe.get('count');
                // 鞋子原来的进货量
                let shoeDelivered = shoe.get('delivered');
                // 鞋子的尺码表
                let shoeSizes = _.cloneDeep(shoe.get('sizes'));
                // 遍历需要改变的size的同时
                // 更新鞋子库存总量
                // 具体的尺码数量
                Object.keys(changedSizes).forEach(key => {
                    // 根据changed的size添加进originalSizes的delivered
                    originalSizes[key].sent += changedSizes[key];
                    // 同步一份，避免在云端获取一份新的重新计算
                    statusSizes[key].sent += changedSizes[key];
                    // 库存总数的增加
                    shoeCount -= changedSizes[key];
                    // 出货量的增加
                    shoeDelivered += changedSizes[key];
                    // 具体尺码的添加
                    shoeSizes[key] -= changedSizes[key]
                });
                // 保存数据
                originalItem.set('sizes', originalSizes);
                shoe.set('count', shoeCount);
                shoe.set('delivered', shoeDelivered);
                shoe.set('sizes', shoeSizes);
                saveObjects.push(originalItem, shoe);
                // 同步status
                orderMap.get(itemId).sizes = statusSizes;
            }
            const status = defineStatus(
                [...orderMap.values()]
                    .map(({ sizes }) => {
                        const sizeArr = Object.values(sizes);
                        return defineStatus(
                            sizeArr.filter(({ needed, sent }) => {
                                // needed 和 delivered 同时为0的时候无意义
                                return (needed !== 0 && sent !== 0);
                            })
                            .map(defineSizeStatus)
                        );
                    })
            );
            const notyetCount = [...orderMap.values()]
                .map(({ orderItem, sizes }) => {
                    const unitPrice = orderItem.get('unitPrice');
                    let itemNotyetCount = 0;
                    Object.values(sizes).forEach(size => {
                        itemNotyetCount += ((size.needed - size.sent) * unitPrice);
                    });
                    return itemNotyetCount;
                })
                .reduce((sum, cur) => sum + cur);
            console.log(status, notyetCount);
            order.set('status', status);
            order.set('notyetCount', notyetCount);
            saveObjects.push(order);
            await av.Object.saveAll(saveObjects);
            res.send({ errNo: 0 });
        } catch (e) {
            console.log(e);
            res.send({
                errNo: e.code
            });
        }
    });


};
