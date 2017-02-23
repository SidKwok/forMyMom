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
        purchaseOrder.equalTo('user', user);
        purchaseOrder
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
                    shoeType: {
                        shoeObjectId: item.id,
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
};
