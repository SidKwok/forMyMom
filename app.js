'use strict';
const express = require('express');
const timeout = require('connect-timeout');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AV = require('leanengine');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = express();

// 登陆测试
app.use(AV.Cloud.CookieSession({ secret: 'my secret', maxAge: 3600000, fetchUser: true }));

app.use(require('connect-history-api-fallback')());

app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/api/login', function(req, res) {
    AV.User.logIn(req.body.username, req.body.password)
        .then((user) => {
            res.saveCurrentUser(user);
            res.send('success');
        })
        .catch(() => {
            res.send('fail')
        });
});

// app.use('/api', (req, res) => {
//     // const minyou = AV.Object.createWithoutData('_User', '575f6711df0eea0062c31d24');
//     const purchaseInfo = AV.Object.createWithoutData('PurchaseInfo', '58a9c6dc128fe1006cc9a981');
//     const query = new AV.Query('PurchaseOrder');
//     query.equalTo('purchaseInfo', purchaseInfo);
//     query.find().then((result) => {
//         if (result.length) {
//             const orderItem = result[0];
//             console.log(orderItem.get('sizes'));
//         }
//         res.send('succ');
//     });
//     // let purchaseInfo = new AV.Object('PurchaseInfo');
//     // purchaseInfo.set('user', minyou);
//     // purchaseInfo.set('orderid', '002');
//     // purchaseInfo.set('vender', 'bar');
//     // purchaseInfo.set('note', 'yoyo');
//     // let shoesType = new AV.Object('ShoesType');
//     // shoesType.set('user', minyou);
//     // shoesType.set('shoeid', '1102');
//     // shoesType.set('color', 'black');
//     // shoesType.set('brand', 'foo');
//     // let purchaseOrder = new AV.Object('PurchaseOrder');
//     // purchaseOrder.set('shoesType', shoesType);
//     // purchaseOrder.set('purchaseInfo', purchaseInfo);
//     // purchaseOrder.set('sizes', {
//     //     s34: {
//     //         need: 2,
//     //         recieved: 0
//     //     },
//     //     s35: {
//     //         need: 2,
//     //         recieved: 0
//     //     },
//     //     s36: {
//     //         need: 2,
//     //         recieved: 0
//     //     },
//     //     s37: {
//     //         need: 2,
//     //         recieved: 0
//     //     },
//     // });
//     // purchaseOrder.save()
//     //     .then(() => {
//     //         res.send('succ');
//     //     })
//     //     .catch(() => {
//     //         res.send('fail');
//     //     });
// });

// // 可以将一类的路由单独保存在一个文件中
// app.use('/todos', require('./routes/todos'));

app.use(function(req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function(err, req, res, next) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    const statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    let error = {}
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error
    });
});

module.exports = app;
