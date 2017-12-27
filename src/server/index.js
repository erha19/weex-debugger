const Path = require('path');
const Koa = require('koa');
const serve = require('koa-serve-static');
const Websockify = require('koa-websocket');
const bodyParser = require('koa-bodyparser');
const WsRouter = require('./router/Websocket');
const HttpRouter = require('./router/Http');
const app = Websockify(new Koa());
const rootPath = Path.join(__dirname, '../../frontend/');
require('../mlink/link');
/*
 ===================================
 WebSocket Router
 ===================================
 */

exports.start = function (port, cb) {
  app.use(bodyParser());
  app.ws.use(WsRouter.routes());
  app.on('error', function (err, ctx) {
    if (err.status === 404) {
      console.error(err);
    }
    else {
      console.error(err);
    }
  });
    /*
     ===================================
     Http Router
     ===================================
     */
  app.use(HttpRouter.routes());
  app.use(serve(rootPath));

  app.listen(port, cb);
};
