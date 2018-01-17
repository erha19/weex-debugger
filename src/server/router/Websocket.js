const Router = require('koa-router');
const mlink = require('../../mlink/midware');
const WebsocketTerminal = mlink.Terminal.WebsocketTerminal;

const inspectorHub = mlink.Hub.get('proxy.inspector');
const proxyNativeHub = mlink.Hub.get('proxy.native');
const proxyDebuggerHub = mlink.Hub.get('page.debugger');
const runtimeWorkerHub = mlink.Hub.get('runtime.worker');
const entryHub = mlink.Hub.get('page.entry');
const wsRouter = Router();
const {
  logger
} = require('../../util/logger');

wsRouter.all('/page/entry', function * (next) {
  logger.verbose(`Joined entry hub joined`);
  entryHub.join(new WebsocketTerminal(this.websocket));
});
wsRouter.all('/debugProxy/inspector/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  logger.verbose(`Joined entry hub joined, channelId -> ${terminal.channelId}`);
  inspectorHub.join(terminal, true);
  yield next;
});

wsRouter.all('/debugProxy/debugger/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  logger.verbose(`Joined entry hub joined, channelId -> ${terminal.channelId}`);
  proxyDebuggerHub.join(terminal, true);
  yield next;
});

wsRouter.all('/debugProxy/runtime/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  logger.verbose(`Joined entry hub joined, channelId -> ${terminal.channelId}`);
  runtimeWorkerHub.join(terminal);
  yield next;
});

wsRouter.all('/debugProxy/native/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  logger.verbose(`Joined entry hub joined, channelId -> ${terminal.channelId}`);
  proxyNativeHub.join(terminal, true);
  yield next;
});
module.exports = wsRouter;
