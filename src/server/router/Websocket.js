/**
 * Created by godsong on 16/6/13.
 */
const Router = require('koa-router');
const mlink = require('mlink');
const WebsocketTerminal = mlink.Terminal.WebsocketTerminal;

const inspectorHub = mlink.Hub.get('proxy.inspector');
const proxyNativeHub = mlink.Hub.get('proxy.native');
const proxyDebuggerHub = mlink.Hub.get('page.debugger');
const runtimeWorkerHub = mlink.Hub.get('runtime.worker');
const entryHub = mlink.Hub.get('page.entry');
const wsRouter = Router();
wsRouter.all('/page/entry', function * (next) {
  entryHub.join(new WebsocketTerminal(this.websocket));
});
wsRouter.all('/debugProxy/inspector/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  inspectorHub.join(terminal);
  yield next;
});

wsRouter.all('/debugProxy/debugger/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  proxyDebuggerHub.join(terminal);

  yield next;
});

wsRouter.all('/debugProxy/runtime/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  runtimeWorkerHub.join(terminal);
  yield next;
});

wsRouter.all('/debugProxy/native/:channelId', function * (next) {
  const terminal = new WebsocketTerminal(this.websocket);
  terminal.channelId = this.params.channelId;
  proxyNativeHub.join(terminal, true);
  yield next;
});
module.exports = wsRouter;
