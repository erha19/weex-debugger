const mlink = require('mlink');
const debuggerRouter = mlink.Router.get('debugger');
const Logger = mlink.Logger;
const DeviceManager = require('../lib/device_manager');
const redirectMessage = /^(Page.(enable|disable|reload)|Debugger|Target|Worker|Runtime\.runIfWaitingForDebugger)/;
const ignoredMessage = /^(ServiceWorker)/;
debuggerRouter.registerHandler(function (message) {
  const device = DeviceManager.getDevice(message.channelId);
  if (device) {
    if (redirectMessage.test(message.payload.method)) {
      if (message.payload.method === 'Debugger.setBreakpointByUrl') {
        message.discard();
        return;
      }
      message.to('runtime.proxy');
    }
    else if (ignoredMessage.test(message.payload.method)) {
      message.discard();
    }
    else {
      message.to('proxy.native');
      if (message.payload.method === 'Page.startScreencast') {
        message.to('page.debugger');
      }
    }
  }
  else {
    Logger.error('loss message from "proxy.inspector" device not found in channelId [' + message.channelId + ']');
    message.to('proxy.native');
  }
}).at('proxy.inspector');
