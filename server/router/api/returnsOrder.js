/**
 * @file 退货单 api
 */

const av = require('leanengine');
const _ = require('lodash');
const utils = require('./utils');
const sizeKeys = _.cloneDeep(utils.sizeKeys);

module.exports = router => {
    // 新建退货单
    router.post('/api/create-returns-order', async (req, res) => {
        const user = req.currentUser;
        const { clientObjectId, note, items } = req.body;
        let client = av.Object.createWithoutData('Clients', clientObjectId);
        try {
            let newOrder = new av.Object('ReturnsOrder');
            newOrder.set('client', client);
            newOrder.set('user', user);
            newOrder.set('note', note);

            // 退货单总额
            let amount = 0;
            // 鞋子总数
            let count = 0;
            let saveObjects = items.map(item => {
                let newItem = new av.Object('ReturnsItems');
                let { shoeObjectId, unitPrice, sizes } = item;
                let _sizes = {};
                sizeKeys.forEach(k => {
                    if (Object.keys(sizes).includes(k)) {
                        _sizes[k] = sizes[k];
                        amount += sizes[k] * unitPrice;
                        count += sizes[k];
                    } else {
                        _sizes[k] = 0;
                    }
                });
                let shoe = av.Object.createWithoutData(
                    'Stock',
                    shoeObjectId
                );
                // 设置订单每一项的鞋子种类
                newItem.set('shoeType', shoe);
                // 设置订单每一项的尺码
                newItem.set('sizes', _sizes);
                // 设置订单每一项的单价
                newItem.set('unitPrice', unitPrice);
                // 设置订单每一项的所属订单
                newItem.set('returnsOrder', newOrder);
                return newItem;
            });
            newOrder.set('amount', amount);
            newOrder.set('count', count);
            const results = await av.Object.saveAll(saveObjects);
            res.send({
                errNo: 0,
                retData: { id: results[0].get('returnsOrder').id }
            });
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 修改退货单
    router.post('/api/update-returns-order', async (req, res) => {
        const ReturnsItems = new av.Query('ReturnsItems');
        const { orderObjectId, changedItems, note } = req.body;
        let returnsOrder = av.Object.createWithoutData('ReturnsOrder', orderObjectId);
        try {
            let orderItems = await ReturnsItems
                .equalTo('returnsOrder', returnsOrder)
                .include(['returnsOrder'])
                .find();
            const changedMap = new Map();
            changedItems.forEach(changedItem =>
                changedMap.set(changedItem.itemId, changedItem)
            );
            // 退货单
            let order = orderItems[0].get('returnsOrder')
            const isDone = order.get('isDone');
            if (!isDone) {
                // 鞋子原总数
                let count = 0;
                // 退货单原价值
                let amount = 0;
                let saveObjects = [];
                orderItems.forEach(orderItem => {
                    const id = orderItem.id;
                    let _sizes = _.cloneDeep(orderItem.get('sizes'));
                    const unitPrice = changedMap.has(id)
                        ? changedMap.get(id).unitPrice
                        : orderItem.get('unitPrice');
                    Object.keys(_sizes)
                        .forEach(k => {
                            let realPairs = _sizes[k];
                            if (changedMap.has(id)) {
                                const changedItem = changedMap.get(id);
                                realPairs = changedItem.sizes[k] || _sizes[k];
                            }
                            _sizes[k] = realPairs;
                            count += realPairs;
                            amount += realPairs * unitPrice;
                        });
                    if (changedMap.has(id)) {
                        orderItem.set('sizes', _sizes);
                        orderItem.set('unitPrice', unitPrice);
                        saveObjects.push(orderItem);
                    }
                });
                order.set('count', count);
                order.set('amount', amount);
                order.set('note', note);
                saveObjects.push(order);
                await av.Object.saveAll(saveObjects);
                res.send({ errNo: 0 });
            } else {
                throw {
                    code: -1,
                    msg: '订单已经完成，无法修改'
                };
            }
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 删除退货单
    router.get('/api/del-returns-order', async (req, res) => {
        const ReturnsOrder = new av.Query('ReturnsOrder');
        try {
            let order = await ReturnsOrder.get(req.query.orderObjectId);
            const isDone = order.get('isDone');
            if (!isDone) {
                order.set('isDel', true);
                await order.save();
                res.send({ errNo: 0 });
            } else {
                throw {
                    code: -1,
                    msg: '退货单已完成，无法删除'
                };
            }

        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 完成退货单
    router.get('/api/done-returns-order', async (req, res) => {
        const order = av.Object.createWithoutData(
            'ReturnsOrder',
            req.query.orderObjectId
        );
        const ReturnsItems = new av.Query('ReturnsItems');
        try {
            let items = await ReturnsItems
                .equalTo('returnsOrder', order)
                .include(['shoeType'])
                .find();
            let saveObjects = items.map(item => {
                let shoe = item.get('shoeType');
                let shoeSizes = _.cloneDeep(shoe.get('sizes'));
                let count = shoe.get('count');
                let returns = shoe.get('returns');

                const itemSizes = item.get('sizes');
                Object.keys(itemSizes).forEach(k => {
                    shoeSizes[k] += itemSizes[k];
                    count += itemSizes[k];
                    returns += itemSizes[k];
                });

                shoe.set('sizes', shoeSizes);
                shoe.set('count', count);
                shoe.set('returns', returns);
                return shoe;
            });
            order.set('isDone', true);
            saveObjects.push(order);
            await av.Object.saveAll(saveObjects);
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 展示退货单
    router.post('/api/show-returns-order', async (req, res) => {
        // TODO
    });

    // 展示退货单详情
    router.get('/api/show-returns-items', async (req, res) => {
        const ReturnsItems = new av.Query('ReturnsItems');
        const order = av.Object.createWithoutData(
            'ReturnsOrder',
            req.query.orderObjectId
        );
        try {
            const items = await ReturnsItems
                .equalTo('returnsOrder', order)
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
};
