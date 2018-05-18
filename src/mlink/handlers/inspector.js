const mlink = require('../midware');
const debuggerRouter = mlink.Router.get('debugger');
const DeviceManager = require('../managers/device_manager');
const redirectMessage = /^(Page.(enable|disable|reload)|Debugger|Target|Worker|Runtime\.runIfWaitingForDebugger)/;
const ignoredMessage = /^(ServiceWorker)/;
const {
  logger
} = require('../../util/logger');

debuggerRouter.registerHandler(function (message) {
  const device = DeviceManager.getDevice(message.channelId);
  if (device) {
    if (redirectMessage.test(message.payload.method)) {
      if (message.payload && message.payload.method === 'Page.reload') {
        message.payload.ignoreCache = true;
      }
      message.to('runtime.proxy');
    }
    else if (ignoredMessage.test(message.payload.method)) {
      message.discard();
    }
    else {
      if (message.payload.method === 'Page.startScreencast') {
        message.to('page.debugger');
      }
      else if (message.payload.method === 'Runtime.enable') {
        message.payload.method = 'Console.enable';
        message.to('proxy.native');
      }
      else if (message.payload.method === 'Page.screencastFrameAck') {
        message.to('page.debugger');
      }
      message.to('proxy.native');
    }
  }
  else {
    logger.error('loss message from "proxy.inspector" device not found in channelId [' + message.channelId + ']');
    message.to('proxy.native');
  }
}).at('proxy.inspector');
