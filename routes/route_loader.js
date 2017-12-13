var route_loader = {};

var config = require('../config');

route_loader.init = function(app, router) {
    console.log('router_loader.init 호출됨.');
    return initRoutes(app, router);
}

function initRoutes(app, router) {
    // var infoLen = config.route_info.length;
    var infoLen = config.route_info.length;
    console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);

    for (var i = 0; i < infoLen; i++) {
        var curItem = config.route_info[i]; // 

        var curModule = require(curItem.file);
        if (curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
        } else {

            router.route(curItem.path).get(curModule[curItem.method]);
        }
    }
    app.use('/', router);
}

module.exports = route_loader;