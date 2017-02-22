/**
 * @file 进货单 api
 */

const av = require('leanengine');

module.exports = router => {
    router.post('/api/create-purchase-order', (req, res) => {
        const user = req.currentUser;
        const { vender, orderId, note, items } = req.body;
        let newOrder = new av.Object('PurchaseOrder');
        let Order = new av.Query('PurchaseOrder');
        Order.equalTo('orderId', orderId);
        Order
            .find()
            .then(result => {
                // TODO: remind relations
                // if (!result.length) {
                //     let _items = items.map(item => {
                //         let shoeType = av.Object.createWithoutData('PurchaseOrder', item.shoeObjectId);
                //         let newItem = { shoeType };
                //         Object.keys(item)
                //             .forEach(key => {
                //                 newItem[key] = {
                //                     needed: item[key],
                //                     sent: 0
                //                 };
                //             });
                //         return newItem;
                //     });
                //     newOrder.set('vender', vender);
                //     newOrder.set('orderId', orderId);
                //     newOrder.set('note', note);
                //     newOrder.set('items', _items);
                //     return newOrder.save();
                // } else {
                //     return Promise.reject({
                //         code: -1,
                //         errMsg: '已存在该订单'
                //     });
                // }
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
};
