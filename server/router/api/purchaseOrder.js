/**
 * @file 进货单 api
 */

const av = require('leanengine');
const _ = require('lodash');
const sizeKeys = _.cloneDeep(require('./utils').sizeKeys);

const defineStatus = (arr) => {
    if (arr.includes(-1) && !arr.includes(0) && !arr.includes(1)) {
        // 未发货
        return -1;
    } else if (arr.includes(1) && !arr.includes(0) && !arr.includes(-1)) {
        // 已完成
        return 1;
    } else {
        // 发货中
        return 0;
    }
}

const defineSizeStatus = ({ needed, sent }) => {
    // 对于一种鞋子的一种尺码来说
    let gap = needed - sent;
    switch (gap) {
        case needed:
            // 未发货
            return -1;
        case 0:
            // 已完成
            return 1;
        default:
            // 发货中
            return 0;
    }
}

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
        const { orderId, changedItems } = req.body;
        let order = av.Object.createWithoutData('PurchaseOrder', orderId);
        try {
            // 获取该订单的所有items
            let orderItems = await order
                .relation('items')
                .query()
                .include(['shoeType'])
                .find();
            let orderMap = new Map();
            // 避免对象的多处引用所以用了一个deep clone
            orderItems.forEach(item =>
                orderMap.set(item.id, _.cloneDeep(item.get('sizes'))));
            let saveObjects = [];
            // 检验订单并修改库存
            for (let changedItem of changedItems) {
                let { itemId, sizes } = changedItem;
                // handle status
                if (orderMap.has(itemId)) {
                    let formerSizes = orderMap.get(itemId);
                    Object.keys(sizes).forEach(key => {
                        formerSizes[key].sent += sizes[key];
                    });
                    orderMap.set(itemId, formerSizes);
                }
                for (let orderItem of orderItems) {
                    if (itemId === orderItem.id) {
                        let orderItemSizes = orderItem.get('sizes'); // {"s34": {needed: 0, sent: 0}}
                        let shoe = orderItem.get('shoeType');
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
                        // 保存订单项的尺码
                        orderItem.set('sizes', orderItemSizes);
                        // 保存库存信息
                        shoe
                            .set('sizes'.shoeSizes)
                            .set('count', shoeCount)
                            .set('purchased', shoePurchased);
                        saveObjects.push(orderItem, shoe);
                        break;
                    }
                }
            }
            let status = defineStatus(
                [...orderMap.keys()].map(id => {
                    let sizeArr = Object.values(orderMap.get(id));
                    return defineStatus(sizeArr.map(defineSizeStatus));
                })
            );
            order.set('status', status);
            saveObjects.push(order);
            // 将所有需要保存的对象上传的云端
            await av.Object.saveAll(saveObjects);
            res.send({ errNo: 0 });
        } catch (e) {
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
