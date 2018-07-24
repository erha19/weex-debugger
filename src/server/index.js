const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Websockify = require('koa-websocket');
const bodyParser = require('koa-bodyparser');
const WsRouter = require('./router/websocket');
const HttpRouter = require('./router/http');
const app = Websockify(new Koa());
const rootPath = path.join(__dirname, '../../frontend/');
const { setup } = require('../link/setup');

const {
  logger
} = require('../util');

/*
 ===================================
 WebSocket Router
 ===================================
 */
exports.start = function (port, cb) {
  setup();
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
