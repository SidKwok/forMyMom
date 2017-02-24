/**
 * @file 进货单 api
 */

const av = require('leanengine');

module.exports = router => {
    // 生成进货单
    router.post('/api/create-purchase-order', (req, res) => {
        const user = req.currentUser;
        const { venderObjectId, orderId, note, items } = req.body;
        let vender = av.Object.createWithoutData('Vender', venderObjectId);
        let Order = new av.Query('PurchaseOrder');
        Order.equalTo('orderId', orderId);
        Order.equalTo('vender', vender);
        Order
            .find()
            .then(result => {
                if (!result.length) {
                    let _items = items.map(item => {
                        let newItem = new av.Object('PurchaseItems');
                        let sizes = {};
                        for (let key in item) {
                            if (key === 'shoeObjectId') {
                                let shoeType = av.Object.createWithoutData('Stock', item[key]);
                                newItem.set('shoeType', shoeType);
                            } else {
                                sizes[key] = {
                                    needed: item[key],
                                    sent: 0
                                };
                            }
                        }
                        newItem.set('sizes', sizes);
                        return newItem;
                    });
                    return av.Object.saveAll(_items);
                } else {
                    return Promise.reject({
                        code: -1,
                        errMsg: '已含有该订单'
                    });
                }
            })
            .then(items => {
                let newOrder = new av.Object('PurchaseOrder');
                let relation = newOrder.relation('items');
                items.forEach(item => {
                    relation.add(item);
                });
                newOrder.set('vender', vender);
                newOrder.set('user', user);
                newOrder.set('orderId', orderId);
                newOrder.set('note', note);
                return newOrder.save();
            })
            .then(({ id }) => {
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            })
            .catch(({ code, errMsg }) => {
                res.send({ errNo: code, errMsg });
            });
    });

    // 展示进货单
    router.get('/api/show-purchase-orders', (req, res) => {
        const user = req.currentUser;
        let purchaseOrder = new av.Query('PurchaseOrder');
        purchaseOrder
            .equalTo('user', user)
            .find()
            .then(results => {
                let orders = results
                    .filter(order => !order.get('isDel'))
                    .map(order => ({
                        date: order.get('createdAt'),
                        note: order.get('note'),
                        orderId: order.get('orderId'),
                        objectId: order.id,
                    }));
                res.send({
                    errNo: 0,
                    orders: orders
                });
            })
            .catch(({ code }) => {
                res.send({
                    errNo: code,
                    errMsg: '出错了'
                });
            });
    });

    // 展示进货单详情
    router.get('/api/show-purchase-order-items', (req, res) => {
        const { id } = req.query;
        const order = av.Object.createWithoutData('PurchaseOrder', id);
        const query = order.relation('items').query();
        query.include(['shoeType']);
        query.find()
            .then(items => {
                let retData = items.map(item => ({
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
            })
            .catch(({ code }) => {
                res.send({ errNo: code });
            });
    });

    // 更新进货单
    router.post('/api/purchase-to-stock', (req, res) => {
        const { orderId, changedItems } = req.body;
        const order = av.Object.createWithoutData('PurchaseOrder', orderId);
        order.relation('items')
            .query()
            .include(['shoeType'])
            .find()
            .then(orderItems => {
                let saveObjects = [];
                for (let changedItem of changedItems) {
                    let { itemId, sizes } = changedItem;
                    for (let orderItem of orderItems) {
                        if (itemId === orderItem.id) {
                            let orderItemSizes = orderItem.get('sizes');// {"s34": {needed: 0, sent: 0}}
                            let shoe = orderItem.get('shoeType')
                            let shoeSizes = shoe.get('sizes');
                            let shoeCount = shoe.get('count');
                            let shoePurchased = shoe.get('purchased');
                            Object.keys(sizes).forEach(size => {
                                // 进货单项sent的修改
                                orderItemSizes[size].sent += sizes[size];
                                // 库存数量修改
                                shoeSizes[size] += sizes[size];
                                shoeCount += sizes[size];
                                // 进货量修改
                                shoePurchased += sizes[size];
                            });
                            // 保存对象
                            orderItem.set('sizes', orderItemSizes);
                            shoe.set('sizes'. shoeSizes)
                                .set('count', shoeCount);
                            saveObjects.push(orderItem, shoe);
                            break;
                        }
                    }
                }
                return av.Object.saveAll(saveObjects);
            })
            .then((param) => {
                res.send(param);
            })
            .catch(err => {
                res.send({
                    errNo: err.code
                });
            });
    });

    // 更新进货单备注信息
    router.post('/api/update-purchase-note', (req, res) => {
        const { orderId, note } = req.body;
        const order = av.Object.createWithoutData('PurchaseOrder', orderId);
        order.set('note', note)
            .save()
            .then(() => {
                res.send({ errNo: 0 });
            })
            .catch(() => {
                res.send({ errNo: -1 });
            });
    });
};
