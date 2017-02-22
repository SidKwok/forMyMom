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
        Stock.equalTo('user', user);
        Stock.equalTo('shoeId', shoeId);
        Stock.equalTo('brand', brand);
        Stock.equalTo('color', color);
        Stock
            .find()
            .then(result => {
                if (!result.length) {
                    newShoe.set('user', user);
                    newShoe.set('shoeId', shoeId);
                    newShoe.set('brand', brand);
                    newShoe.set('color', color);
                    newShoe.set('sizes', sizes);

                    return newShoe.save();
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
            .catch(({ code, errMsg }) => {
                res.send({ errNo: code, errMsg });
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
                result.set('sizes', _sizes);
                result.set('returns', returns);
                result.set('delivered', delivered);
                result.set('purchased', purchased);
                return result.save();
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
                result.set('isDel', true);
                return result.save();
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
