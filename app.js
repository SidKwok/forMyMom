'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var AV = require('leanengine');

var app = express();
// 加载 cookieSession 以支持 AV.User 的会话状态
app.use(AV.Cloud.CookieSession({ secret: 'my secret', maxAge: 3600000, fetchUser: true }));

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云函数定义
require('./cloud');
// 加载云引擎中间件
app.use(AV.express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 处理url
app.get('/', function(req, res) {
    if (req.currentUser) {
        res.render('index', {username: req.currentUser.username});
    } else {
        res.render('login');
    }
});
app.get('/login', function(req, res) {
    res.render('login.ejs');
});
app.post('/login', function(req, res) {
    AV.User.logIn(req.body.username, req.body.password)
           .then(function(user) {
               res.saveCurrentUser(user);
               res.redirect('/index');
    }, function(error) {
        res.redirect('/login');
    });
});
app.get('/index', function(req, res) {
    // 判断用户是否已经登录
    if (req.currentUser) {
        // 如果已经登录，发送当前登录用户信息。
        res.render('index', {username: req.currentUser.attributes.username});
    } else {
        // 没有登录，跳转到登录页面。
        res.redirect('/login');
    }
});

// 登出账号
app.get('/logout', function(req, res) {
    req.currentUser.logOut();
    res.clearCurrentUser(); // 从 Cookie 中删除用户
    res.redirect('/login');
});

// 可以将一类的路由单独保存在一个文件中
app.use('/todos', todos);

app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, next) { // jshint ignore:line
  var statusCode = err.status || 500;
  if(statusCode === 500) {
    console.error(err.stack || err);
  }
  if(req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {}
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
