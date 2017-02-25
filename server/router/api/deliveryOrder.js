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
        const { clientObjectId, orderId, note, items } = req.body;
        const client = av.Object.createWithoutData('Clients', clientObjectId);
        const Order = new av.Query('DeliveryOrder');
        try {
            const orders = await Order.equalTo('orderId', orderId)
                .equalTo('client', client)
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
                            notyet: 0,
                            delivered: 0
                        };
                        if (Object.keys(sizes).includes(k)) {
                            struc.notyet = sizes[k];
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
};
