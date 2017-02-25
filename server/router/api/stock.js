/**
 * @file 库存 api
 */

const av = require('leanengine');
const _ = require('lodash');

module.exports = router => {
    // 添加鞋子
    router.post('/api/create-shoe', async (req, res) => {
        const user = req.currentUser;
        const { shoeId, brand, color, sizes } = req.body;
        const Stock = new av.Query('Stock');
        try {
            const shoes = await Stock.equalTo('user', user)
                .equalTo('isDel', false)
                .equalTo('shoeId', shoeId)
                .equalTo('brand', brand)
                .equalTo('color', color)
                .find();
            if (!shoes.length) {
                const count = Object.keys(sizes)
                    .map(size => sizes[size])
                    .reduce((sum, cur) => sum + cur);
                let newShoe = new av.Object('Stock');
                const { id } = await newShoe
                    .set('user', user)
                    .set('shoeId', shoeId)
                    .set('brand', brand)
                    .set('color', color)
                    .set('sizes', sizes)
                    .set('count', count)
                    .save();
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            } else {
                throw {
                    code: -1,
                    msg: '已存在该鞋子'
                };
            }
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 更新鞋子
    router.post('/api/update-shoe', async (req, res) => {
        const user = req.currentUser;
        const {
            stockObjectId,
            sizes,
            returns,
            delivered,
            purchased
        } = req.body;
        const Stock = new av.Query('Stock');
        try {
            let shoe = await Stock.get(stockObjectId);
            let _sizes = _.cloneDeep(shoe.get('sizes'));
            Object.keys(sizes).forEach(key => {
                _sizes[key] = sizes[key];
            });
            let count = Object.keys(_sizes)
                .map(size => _sizes[size])
                .reduce((sum, cur) => sum + cur);
            await shoe
                .set('sizes', _sizes)
                .set('count', count)
                .set('returns', returns)
                .set('delivered', delivered)
                .set('purchased', purchased)
                .save();
            res.send({ errNo: 0 });
        } catch (e) {
            console.log(e);
            res.send({ errNo: e.code });
        }
    });

    // 删除鞋子
    router.post('/api/del-shoe', async (req, res) => {
        const { stockObjectId } = req.body;
        let Stock = new av.Query('Stock');
        try {
            let shoe = await Stock.get(stockObjectId);
            await shoe.set('isDel', true).save();
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 展示鞋子
    router.get('/api/show-shoes', async (req, res) => {
        const user = req.currentUser;
        let Stock = new av.Query('Stock');
        try {
            const shoes = await Stock
                .equalTo('user', user)
                .equalTo('isDel', false)
                .find();
            res.send({
                errNo: 0,
                errMsg: { shoes }
            });
        } catch (e) {
            res.send(e.code);
        }
    });
};
