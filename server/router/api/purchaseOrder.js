/**
 * @file 进货单 api
 */

const av = require('leanengine');
const _ = require('lodash');
const utils = require('./utils');
const sizeKeys = _.cloneDeep(utils.sizeKeys);
const defineStatus = utils.defineStatus;
const defineSizeStatus = utils.defineSizeStatus;

module.exports = router => {
    // 生成进货单
    router.post('/api/create-purchase-order', async (req, res) => {
        const user = req.currentUser;
        const { venderObjectId, orderId, note, items } = req.body;
        let vender = av.Object.createWithoutData('Vender', venderObjectId);
        const Order = new av.Query('PurchaseOrder');
        try {
            const orders = await Order.equalTo('orderId', orderId)
                .equalTo('vender', vender)
                .equalTo('isDel', false)
                .find();
            if (!orders.length) {
                // 整理出货单的每一项，保存每一项stock的pointer
                let _items = items.map(item => {
                    let newItem = new av.Object('PurchaseItems');
                    let { shoeObjectId, sizes } = item;
                    let _sizes = {};
                    sizeKeys.forEach(k => {
                        let struc = {
                            needed: 0,
                            sent: 0
                        };
                        if (Object.keys(sizes).includes(k)) {
                            struc.needed = sizes[k];
                        }
                        _sizes[k] = struc;
                    });
                    const shoe = av.Object.createWithoutData(
                        'Stock',
                        shoeObjectId
                    );
                    newItem.set('shoeType', shoe);
                    newItem.set('sizes', _sizes);
                    return newItem;
                });
                // 获取保存之后的出货单项，然后添加到出货单的relation
                const saveItems = await av.Object.saveAll(_items);
                let newOrder = new av.Object('PurchaseOrder');
                let relation = newOrder.relation('items');
                saveItems.forEach(item => {
                    relation.add(item);
                });
                // 设置出货单的基本信息
                newOrder.set('vender', vender);
                newOrder.set('user', user);
                newOrder.set('orderId', orderId);
                newOrder.set('note', note);
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
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 展示进货单
    router.get('/api/show-purchase-orders', async (req, res) => {
        const user = req.currentUser;
        const PurchaseOrder = new av.Query('PurchaseOrder');
        try {
            const results = await PurchaseOrder.equalTo('user', user)
                .equalTo('isDel', false)
                .include(['vender'])
                .find();
            const orders = results.map(order => ({
                date: order.get('createdAt'),
                note: order.get('note'),
                vender: order.get('vender').get('name'),
                status: order.get('status'),
                orderId: order.get('orderId'),
                objectId: order.id
            }));
            res.send({
                errNo: 0,
                orders
            });
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: '出错了'
            });
        }
    });

    // 展示进货单详情
    router.get('/api/show-purchase-order-items', async (req, res) => {
        const { id } = req.query;
        const order = av.Object.createWithoutData('PurchaseOrder', id);
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

    // 进货到仓库
    router.post('/api/purchase-to-stock', async (req, res) => {
        try {
            // 获取该订单的所有items
            let order = av.Object.createWithoutData(
                'PurchaseOrder',
                req.body.orderObjectId
            );
            let orderItems = await order
                .relation('items')
                .query()
                .include(['shoeType'])
                .find();
            // 构建以id为键名的键值对
            let orderMap = new Map();
            orderItems.forEach(orderItem => orderMap.set(orderItem.id, {
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
                let shoePurchased = shoe.get('purchased');
                // 鞋子的尺码表
                let shoeSizes = _.cloneDeep(shoe.get('sizes'));
                // 遍历需要改变的size的同时
                // 更新鞋子库存总量
                // 具体的尺码数量
                Object.keys(changedSizes).forEach(key => {
                    // 根据changed的size添加进originalSizes的sent
                    originalSizes[key].sent += changedSizes[key];
                    // 同步一份，避免在云端获取一份新的重新计算
                    statusSizes[key].sent += changedSizes[key];
                    // 库存总数的增加
                    shoeCount += changedSizes[key];
                    // 进货量的增加
                    shoePurchased += changedSizes[key];
                    // 具体尺码的添加
                    shoeSizes[key] += changedSizes[key];
                });
                // 保存数据
                originalItem.set('sizes', originalSizes);
                shoe.set('count', shoeCount);
                shoe.set('purchased', shoePurchased);
                shoe.set('sizes', shoeSizes);
                saveObjects.push(originalItem, shoe);
                // 同步status
                orderMap.get(itemId).sizes = statusSizes;
            }
            const status = defineStatus(
                [...orderMap.values()].map(({ sizes }) => {
                    const sizeArr = Object.values(sizes);
                    return defineStatus(
                        sizeArr
                            .filter(({ needed, sent }) => {
                                // needed 和 sent 同时为0的时候无意义
                                return needed !== 0 && sent !== 0;
                            })
                            .map(defineSizeStatus)
                    );
                })
            );
            order.set('status', status);
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

    // 更新进货单备注信息
    router.post('/api/update-purchase-note', async (req, res) => {
        const { orderId, note } = req.body;
        let order = av.Object.createWithoutData('PurchaseOrder', orderId);
        try {
            await order.set('note', note).save();
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 删除进货单
    router.get('/api/del-purchase-order', async (req, res) => {
        const { id } = req.query;
        let purchaseOrder = av.Object.createWithoutData('PurchaseOrder', id);
        try {
            const order = await purchaseOrder.fetch({ keys: 'status' });
            const status = order.get('status');
            if (status === -1) {
                await order.set('isDel', true).save();
                res.send({ errNo: 0 });
            } else {
                throw {
                    code: -1,
                    msg: `进货单已经${status === 0 ? '开始发货' : '完成'}，无法删除`
                };
            }
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });
};
