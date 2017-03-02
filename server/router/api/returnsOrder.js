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

            let count = 0;
            let saveObjects = items.map(item => {
                let newItem = new av.Object('ReturnsItems');
                let { shoeObjectId, unitPrice, sizes } = item;
                let _sizes = {};
                sizeKeys.forEach(k => {
                    if (Object.keys(sizes).includes(k)) {
                        _sizes[k] = sizes[k];
                        count += sizes[k] * unitPrice;
                    }
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
                // 设置订单每一项的所属订单
                newItem.set('returnsOrder', newOrder);
                return newItem;
            });
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
        // TODO
    });

    // 删除退货单
    router.post('/api/del-returns-order', async (req, res) => {
        // TODO
    });

    // 完成退货单
    router.post('/api/done-returns-order', async (req, res) => {
        // TODO
    });

    // 展示退货单
    router.post('/api/show-returns-order', async (req, res) => {
        // TODO
    });

    // 展示退货单详情
    router.post('/api/show-returns-items', async (req, res) => {
        // TODO
    });
};
