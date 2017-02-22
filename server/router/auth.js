const express = require('express');
const router = express.Router();
const AV = require('leanengine');

// 这一类路由都会先经过这一个函数操作
// router.use(function(req, res, next) {
//     console.log(req.body);
//     next();
// });

// 登陆
router.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    AV.User
        .logIn(username, password)
        .then(user => {
            res.saveCurrentUser(user);
            res.send({
                errNo: 0,
                retData: {
                    user: user.get('username'),
                    userId: user.get('objectId')
                }
            });
        })
        .catch(err => {
            res.send({ errNo: err.code });
        });
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
