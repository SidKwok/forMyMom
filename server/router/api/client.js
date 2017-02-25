/**
 * @file 客户 api
 */

const av = require('leanengine');

module.exports = router => {
    // 新建客户
    router.post('/api/create-client', async (req, res) => {
        const user = req.currentUser;
        const { name, mobilephone, telephone, address, note } = req.body;
        const Client = new av.Query('Clients');
        try {
            const clients = Client.equalTo('user', user)
                .equalTo('name', name)
                .equalTo('isDel', false)
                .find();
            if (!clients.length) {
                let newClient = new av.Object('Clients');
                newClient
                    .set('user', user)
                    .set('name', name)
                    .set('mobilephone', mobilephone)
                    .set('telephone', telephone)
                    .set('address', address)
                    .set('note', note);
                const { id } = await newClient.save();
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            } else {
                throw {
                    code: -1,
                    errMsg: '已存在该客户'
                };
            }
        } catch ({ code, errMsg }) {
            res.send({ errNo: code, errMsg });
        }
    });

    // 更新客户
    router.post('/api/update-client', async (req, res) => {
        const {
            clientObjectId,
            mobilephone,
            telephone,
            note,
            address
        } = req.body;
        const Client = new av.Query('Clients');
        try {
            (await Client.get(clientObjectId))
                .set('address', address)
                .set('mobilephone', mobilephone)
                .set('telephone', telephone)
                .set('note', note)
                .save();
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 删除客户
    router.post('/api/del-client', async (req, res) => {
        const { clientObjectId } = req.body;
        let Client = new av.Query('Clients');
        try {
            (await Client.get(clientObjectId)).set('isDel', true).save();
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 展示客户
    router.get('/api/show-clients', async (req, res) => {
        const user = req.currentUser;
        let Client = new av.Query('Clients');
        try {
            const clients = await Client.equalTo('user', user)
                .equalTo('isDel', false)
                .find();
            res.send({
                errNo: 0,
                retData: { clients }
            });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });
};
