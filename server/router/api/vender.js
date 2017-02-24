/**
 * @file 厂家 api
 */

const av = require('leanengine');

module.exports = router => {
    // 新建厂家
    router.post('/api/create-vender', (req, res) => {
        const user = req.currentUser;
        const { name, mobilephone, telephone, address, note } = req.body;
        let newVender = new av.Object('Vender');
        let Vender = new av.Query('Vender');

        Vender
            .equalTo('user', user)
            .equalTo('name', name)
            .find()
            .then(result => {
                if (!result.length) {
                    return newVender
                        .set('user', user)
                        .set('name', name)
                        .set('mobilephone', mobilephone)
                        .set('telephone', telephone)
                        .set('address', address)
                        .set('note', note)
                        .save();
                } else {
                    return Promise.reject({
                        code: -1,
                        errMsg: '已存在该厂家'
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

    // 更新厂家
    router.post('/api/update-vender', (req, res) => {
        const { venderObjectId, mobilephone, telephone, note, address } = req.body;
        let Vender = new av.Query('Vender');
        Vender.get(venderObjectId)
            .then(result => {
                return result
                    .set('address', address)
                    .set('mobilephone', mobilephone)
                    .set('telephone', telephone)
                    .set('note', note)
                    .save();
            })
            .then(() => {
                res.send({errNo: 0});
            })
            .catch(({ code }) => {
                res.send({ errNo: code });
            });
    });

    // 删除厂家
    router.post('/api/del-vender', (req, res) => {
        const { venderObjectId } = req.body;
        let Vender = new av.Query('Vender');
        Vender.get(venderObjectId)
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

    // 展示厂家
    router.get('/api/show-venders', (req, res) => {
        const user = req.currentUser;
        let Vender = new av.Query('Vender');
        Vender
            .equalTo('user', user)
            .find()
            .then(result => {
                const venders = result.filter(Vender => !Vender.get('isDel'));
                res.send({
                    errNo: 0,
                    retData: { venders }
                });
            })
            .catch(({ code }) => {
                res.send(code);
            });
    });
};
