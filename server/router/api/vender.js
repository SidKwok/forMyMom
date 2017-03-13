/**
 * @file 厂家 api
 */

const av = require('leanengine');

module.exports = router => {
    // 新建厂家
    router.post('/api/create-vender', async (req, res) => {
        const user = req.currentUser;
        const { name, mobilephone, telephone, address, note } = req.body;
        let Vender = new av.Query('Vender');
        try {
            const venders = await Vender.equalTo('user', user)
                .equalTo('name', name)
                .equalTo('isDel', false)
                .find();
            if (!venders.length) {
                let newVender = new av.Object('Vender');
                const { id } = await newVender
                    .set('user', user)
                    .set('name', name)
                    .set('mobilephone', mobilephone)
                    .set('telephone', telephone)
                    .set('address', address)
                    .set('note', note)
                    .save();
                res.send({
                    errNo: 0,
                    retData: { id }
                });
            } else {
                throw {
                    code: -1,
                    msg: '已存在该厂家'
                };
            }
        } catch (e) {
            res.send({
                errNo: e.code,
                errMsg: e.msg
            });
        }
    });

    // 更新厂家
    router.post('/api/update-vender', async (req, res) => {
        const {
            venderObjectId,
            mobilephone,
            telephone,
            note,
            address
        } = req.body;
        const Vender = new av.Query('Vender');
        try {
            let vender = await Vender.get(venderObjectId);
            await vender
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

    // 删除厂家
    router.post('/api/del-vender', async (req, res) => {
        const { venderObjectId } = req.body;
        const Vender = new av.Query('Vender');
        try {
            let vender = await Vender.get(venderObjectId);
            await vender.set('isDel', true).save();
            res.send({ errNo: 0 });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });

    // 展示厂家
    router.get('/api/show-venders', async (req, res) => {
        const user = req.currentUser;
        const Vender = new av.Query('Vender');
        try {
            const results = await Vender.equalTo('user', user)
                .equalTo('isDel', false)
                .find();
            const venders = results.map(vender => ({
                objectId: vender.id,
                address: vender.get('address'),
                telephone: vender.get('telephone'),
                mobilephone: vender.get('mobilephone'),
                name: vender.get('name'),
                note: vender.get('note')
            }));
            res.send({
                errNo: 0,
                retData: { venders }
            });
        } catch (e) {
            res.send({ errNo: e.code });
        }
    });
};
