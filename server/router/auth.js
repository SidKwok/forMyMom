const express = require('express');
const router = express.Router();
const av = require('leanengine');

router.get('/auth/init', (req, res) => {
    if (req.currentUser) {
        res.send({
            errNo: 0,
            isLogin: true,
            user: req.currentUser.get('username'),
            userId: req.currentUser.id
        });
    } else {
        res.send({ isLogin: false });
    }
});

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
                userId: user.id
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
