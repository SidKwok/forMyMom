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
            const results = await Client.equalTo('user', user)
                .equalTo('isDel', false)
                .find();
            const clients = results.map(client => ({
                objectId: client.id,
                address: client.get('address'),
                telephone: client.get('telephone'),
                mobilephone: client.get('mobilephone'),
                name: client.get('name'),
                note: client.get('note')
            }));
            res.send({
                errNo: 0,
                retData: { clients }
            });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 导入数据
    // router.get('/api/to-clients', async (req, res) => {
    //     try {
    //         const Client = new av.Query('Client');
    //         const results = await Client.equalTo('uid', 'mingyou').limit(200).find();
    //         const user = req.currentUser;
    //         const saveObjects = results.map(client => {
    //             let newClient = new av.Object('Clients');
    //             newClient
    //                 .set('user', user)
    //                 .set('name',client.get('name'))
    //                 .set('mobilephone', client.get('mobilephone'))
    //                 .set('address', client.get('address'))
    //                 .set('note', client.get('telephone'));
    //             return newClient;
    //         });
    //         await av.Object.saveAll(saveObjects);
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         res.send('done')
    //     }
    // });
};
