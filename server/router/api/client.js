/**
 * @file 客户 api
 */

const av = require('leanengine');

module.exports = router => {
    // 新建客户
    router.post('/api/create-client', (req, res) => {
        const user = req.currentUser;
        const { name, mobilephone, telephone, address, note } = req.body;
        let newClient = new av.Object('Clients');
        let Client = new av.Query('Clients');

        Client
            .equalTo('user', user)
            .equalTo('name', name)
            .find()
            .then(result => {
                if (!result.length) {
                    return newClient
                        .set('user', user)
                        .set('name', name)
                        .set('mobilephone', mobilephone)
                        .set('telephone', telephone)
                        .set('address', address)
                        .set('note', note)
                        .save()
                } else {
                    return Promise.reject({
                        code: -1,
                        errMsg: '已存在该客户'
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

    // 更新客户
    router.post('/api/update-client', (req, res) => {
        const { clientObjectId, mobilephone, telephone, note, address } = req.body;
        let client = new av.Query('Clients');
        client.get(clientObjectId)
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

    // 删除客户
    router.post('/api/del-client', (req, res) => {
        const { clientObjectId } = req.body;
        let client = new av.Query('Clients');
        client.get(clientObjectId)
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

    // 展示客户
    router.get('/api/show-clients', (req, res) => {
        const user = req.currentUser;
        let Client = new av.Query('Clients');
        Client
            .equalTo('user', user)
            .find()
            .then(result => {
                const filtResult = result.filter(client => !client.get('isDel'));
                res.send(filtResult);
            })
            .catch(({ code }) => {
                res.send(code);
            });
    });
};
