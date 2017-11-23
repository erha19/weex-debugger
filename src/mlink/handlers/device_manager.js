const Router = require('mlink').Router;
const DeviceManager = require('../lib/device_manager');
const config = require('../../lib/config');
const debuggerRouter = Router.get('debugger');
let registerDeviceChannelId;
let FirstStartDebug = true;
debuggerRouter.on(Router.Event.TERMINAL_LEAVED, 'proxy.native', function (signal) {
  const device = DeviceManager.getDevice(signal.channelId);
  if (!device) {
    return;
  }
  // This is a special treatment for android devices
  // The android platform will registe twice and the socket leave signl may come after registed, the newly registered device may be removed immediately。
  if (device.platform === 'android' && FirstStartDebug) {
    FirstStartDebug = false;
  }
  else {
    DeviceManager.removeDevice(signal.channelId, function () {
      debuggerRouter.pushMessageByChannelId('page.debugger', signal.channelId, {
        method: 'WxDebug.deviceDisconnect',
        params: device
      });
    });
  }
});
debuggerRouter.on(Router.Event.TERMINAL_JOINED, 'page.debugger', function (signal) {
  const device = DeviceManager.getDevice(signal.channelId);
  // Fixme Android will connect twice while first scan.
  if (registerDeviceChannelId === signal.channelId) {
    FirstStartDebug = true;
  }
  registerDeviceChannelId = signal.channelId;
  debuggerRouter.pushMessageByChannelId('page.debugger', signal.channelId, {
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
    // iOS platform need reload signal to reload runtime context.
    if (device.platform === 'iOS') {
      setTimeout(() => {
        debuggerRouter.pushMessageByChannelId('page.debugger', message.channelId, {
          method: 'WxDebug.reloadInspector',
          params: device
        });
      }, 3000);
    }
  }
  return false;
}).at('proxy.native').when('payload.method=="WxDebug.registerDevice"');
