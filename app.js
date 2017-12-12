/*
  My first Project
  Check Application
*/

// Express 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express 미들웨어 불러오기\
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorHandler');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// mongoose 모듈 불러들이기
// var mongoose = require('mongoose');

var config = require('./config');

var database = require('./database/database');

var route_loader = require('./routes/route_loader');

// 익스프레스 객체 생성
var app = express();

route_loader.init(app, express.Router());

// body-parser를 사용해  application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

var router = express.Router();

app.use('/', router);

app.use(static(path.join(__dirname, '/public')));
// app.get('/', function(req, res) {
//     res.send('Hello Yaein Application');
// })
app.listen(config.server_port, function() {
    console.log('Server Starting .');
});