/**
 * @file 库存 api
 */

const av = require('leanengine');

module.exports = router => {
    // 添加鞋子
    router.post('/api/create-shoe', (req, res) => {
        const user = req.currentUser;
        const { shoeId, brand, color, sizes } = req.body;
        let newShoe = new av.Object('Stock');
        let Stock = new av.Query('Stock');
        Stock
            .equalTo('user', user)
            .equalTo('shoeId', shoeId)
            .equalTo('brand', brand)
            .equalTo('color', color)
            .find()
            .then(result => {
                if (!result.length) {
                    let count = Object.keys(sizes)
                        .map(size => sizes[size])
                        .reduce((sum, cur) => (sum + cur));
                    return newShoe
                        .set('user', user)
                        .set('shoeId', shoeId)
                        .set('brand', brand)
                        .set('color', color)
                        .set('sizes', sizes)
                        .set('count', count)
                        .save();
                } else {
                    return Promise.reject({
                        code: 101,
                        errMsg: '已存在该鞋子'
                    });
                }
            })
            .then(({ id }) => {
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            })
            .catch(err => {
                res.send({
                    errNo: err.code,
                    errMsg: err.errMsg
                });
            });
    });

    // 更新鞋子
    router.post('/api/update-shoe', (req, res) => {
        const user = req.currentUser;
        const { stockObjectId, sizes, returns, delivered, purchased } = req.body;
        let shoe = new av.Query('Stock');
        shoe.get(stockObjectId)
            .then(result => {
                let _sizes = result.get('sizes');
                Object.keys(sizes)
                    .forEach(key => {
                        _sizes[key] = sizes[key];
                    });
                let count = Object.keys(_sizes)
                    .map(size => _sizes[size])
                    .reduce((sum, cur) => (sum + cur));
                return result
                    .set('sizes', _sizes)
                    .set('count', count)
                    .set('returns', returns)
                    .set('delivered', delivered)
                    .set('purchased', purchased)
                    .save();
            })
            .then(() => {
                res.send({errNo: 0});
            })
            .catch(({ code }) => {
                res.send({ errNo: code });
            });
    });

    // 删除鞋子
    router.post('/api/del-shoe', (req, res) => {
        const { stockObjectId } = req.body;
        let shoe = new av.Query('Stock');
        shoe.get(stockObjectId)
            .then(result => {
                return result
                    .set('isDel', true)
                    .save();
            })
            .then(() => {
                res.send({ errNo: 0 });
            })
            .catch(({ code }) => {
                res.send({ errNo: code });
            });
    });

    // 展示鞋子
    router.get('/api/show-shoes', (req, res) => {
        const user = req.currentUser;
        let Stock = new av.Query('Stock');
        Stock
            .equalTo('user', user)
            .find()
            .then(result => {
                const filtResult = result.filter(shoe => !shoe.get('isDel'));
                res.send(filtResult);
            })
            .catch(({ code }) => {
                res.send(code);
            });
    });
};
