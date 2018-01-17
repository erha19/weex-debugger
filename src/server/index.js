const path = require('path');
const Koa = require('koa');
const serve = require('koa-serve-static');
const Websockify = require('koa-websocket');
const bodyParser = require('koa-bodyparser');
const WsRouter = require('./router/Websocket');
const HttpRouter = require('./router/Http');
const app = Websockify(new Koa());
const rootPath = path.join(__dirname, '../../frontend/');
const { init } = require('../mlink/link');

const {
  logger
} = require('../util/logger');

/*
 ===================================
 WebSocket Router
 ===================================
 */

exports.start = function (port, cb) {
  init();
  app.use(bodyParser());
  app.ws.use(WsRouter.routes());
  app.on('error', function (err, ctx) {
    if (err.status === 404) {
      logger.verbose(err);
    }
    else {
      logger.verbose(err);
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
