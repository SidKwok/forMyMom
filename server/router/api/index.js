const express = require('express');
const router = express.Router();

// 先进行登陆验证，若没有登陆则不使用接下来的接口
router.use((req, res, next) => {
    if (req.currentUser) {
        next();
    } else {
        res.send({ errNo: -1 });
    }
});

require('./stock')(router);

module.exports = router;
