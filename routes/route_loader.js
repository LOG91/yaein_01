var route_loader = {};

var config = require('../config');

route_loader.init = function(app, router) {
    console.log('router_loader.init 호출됨.');
    return initRoutes(app, router);
}

function initRoutes(app, router) {
    // var infoLen = config.route_info.length;

    app.use('/', router);
}

module.exports = route_loader;