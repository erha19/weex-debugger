/**
 * Created by exolution on 17/2/27.
 */
const Router = require('mlink').Router;
const DeviceManager = require('../lib/device_manager');
const config = require('../../lib/config');
const debuggerRouter = Router.get('debugger');

debuggerRouter.on(Router.Event.TERMINAL_LEAVED, 'proxy.native', function (signal) {
  const device = DeviceManager.getDevice(signal.channelId);
  DeviceManager.removeDevice(signal.channelId, function () {
    console.log('websocket disconnect!');
    debuggerRouter.pushMessageByChannelId('page.debugger', signal.channelId, {
      method: 'WxDebug.deviceDisconnect',
      params: device
    });
  });
});
debuggerRouter.on(Router.Event.TERMINAL_JOINED, 'page.debugger', function (signal) {
  const device = DeviceManager.getDevice(signal.channelId);
  debuggerRouter.pushMessage('page.debugger', signal.terminalId, {
    method: 'WxDebug.pushDebuggerInfo',
    params: {
      device,
      bundles: config.bundleUrls,

      connectUrl: config.getConnectUrl(signal.channelId)
    }
  });
});
debuggerRouter.registerHandler(function (message) {
  const device = DeviceManager.registerDevice(message.payload.params, message.channelId);
  if (device) {
    message.payload = {
      method: 'WxDebug.pushDebuggerInfo',
      params: {
        device,
        bundles: config.bundleUrls,
        connectUrl: config.getConnectUrl(message.channelId)
      }

    };
    debuggerRouter.pushMessage('page.entry', {
      method: 'WxDebug.startDebugger',
      params: message.channelId
    });
    message.to('page.debugger');
  }

  return false;
}).at('proxy.native').when('payload.method=="WxDebug.registerDevice"');

