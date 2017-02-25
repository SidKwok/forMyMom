/**
 * @file 出货单 api
 */

const av = require('leanengine');
const _ = require('lodash');
const sizeKeys = _.cloneDeep(require('./utils').sizeKeys);

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
                            delivered: 0
                        };
                        if (Object.keys(sizes).includes(k)) {
                            struc.notyet = sizes[k];
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
        const { orderObjectId, changedItems } = req.body;
        try {
            // TODO
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({
                errNo: e.code
            });
        }
    });


};
