const express = require('express');
const router = express.Router();
const AV = require('leanengine');

// 这一类路由都会先经过这一个函数操作
// router.use(function(req, res, next) {
//     console.log(req.body);
//     next();
// });

router.post('/auth/login', (req, res) => {
    console.log('login');
    res.send('login');
});

router.post('/auth/logout', (req, res) => {
    console.log('logout');
    res.send('logout');
});

module.exports = router;
