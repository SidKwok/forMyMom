const express = require('express');
const router = express.Router();
const av = require('leanengine');

// 登陆
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await av.User.logIn(username, password);
        res.saveCurrentUser(user);
        res.send({
            errNo: 0,
            retData: {
                user: user.get('username'),
                userId: user.get('objectId')
            }
        });
    } catch (e) {
        res.send({ errNo: e.code });
    }
});

// 登出
router.post('/auth/logout', (req, res) => {
    // 登陆了之后才可以进行该操作
    if (req.currentUser) {
        req.currentUser.logOut();
        res.clearCurrentUser();
        res.send({ errNo: 0 });
    } else {
        // TODO: 假如未登陆就使用该接口的处理情况
        res.send('TODO');
    }
});

module.exports = router;
