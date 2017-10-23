/**
 * Created by exolution on 17/3/6.
 */
const Router = require('mlink').Router;
const DeviceManager = require('../lib/device_manager');
const bundleWrapper = require('../../util/bundle_wrapper');
const MemoryFile = require('../../lib/memory_file');
const debuggerRouter = Router.get('debugger');
const util = require('../../util');
debuggerRouter.registerHandler(function (message) {
  const payload = message.payload;
  if (payload.method === 'WxDebug.initJSRuntime') {
    const device = DeviceManager.getDevice(message.channelId);
    payload.params.url = new MemoryFile('js-framework.js', payload.params.source).getUrl();
    if (device.logLevel) {
      payload.params.env.WXEnvironment.logLevel = device.logLevel;
    }
  }
  else if (payload.method === 'WxDebug.callJS' && payload.params.method === 'createInstance') {
    let code = payload.params.args[1];
    if (payload.params.args[2] && (payload.params.args[2]['debuggable'] === 'false' || payload.params.args[2]['debuggable'] === false)) {
      code = util.obfuscate(code);
    }
    debuggerRouter.pushMessageByChannelId('page.debugger', message.channelId, {
      method: 'WxDebug.bundleRendered',
      params: {
        bundleUrl: payload.params.args[2].bundleUrl
      }
    });
    payload.params.sourceUrl = new MemoryFile(payload.params.args[2].bundleUrl || (util.md5(code) + '.js'), bundleWrapper(code)).getUrl();
  }
  else if (payload.method === 'WxDebug.importScript') {
    payload.params.sourceUrl = new MemoryFile('imported_' + util.md5(payload.params.source) + '.js', payload.params.source).getUrl();
  }
  else if (payload.method === 'syncReturn') {
    message.payload = {
      error: payload.error,
      ret: payload.params.ret
    };
    message.to('sync');
    return;
  }
  else if (payload.method === 'WxDebug.sendTracingData') {
    message.to('page.debugger');
    return;
  }
  else if (payload.method === 'WxDebug.sendSummaryInfo') {
    message.to('page.debugger');
    return;
  }
  message.to('runtime.worker');
}).at('proxy.native').when('payload.method&&payload.method.split(".")[0]==="WxDebug"');
debuggerRouter.registerHandler(function (message) {
  const payload = message.payload;
  if (payload.method === 'Page.screencastFrame') {
    payload.params.sessionId = 1;
  }
  else if (payload.method === 'Console.messageAdded') {
    message.payload = {
      'method': 'Runtime.consoleAPICalled',
      'params': {
        'type': payload.params.message.level,
        'args': payload.params.message.parameters,
        'executionContextId': 1
          // "stackTrace": payload.params.message.stackTrace
      }
    };
  }
  else if (payload.method === 'DOM.childNodeRemoved') {
    const device = DeviceManager.getDevice(message.channelId);
    // 此处是为了 扫bundle二维码通知页面关掉bundle二维码界面这个功能
    // 当没有打开JS Debug时 weex加载bundle devtool是不知道的 只能模糊的通过childNodeRemoved判断
    // 这个标记用来限制短时间内发出很多次通知
    const now = new Date().getTime();
    if (!device || (now - (device.lastRenderedNotifyTime || 0) > 1500)) { // 对device不存在的异常做保护
      if (device) device.lastRenderedNotifyTime = now;
      if (device && device.platform !== 'iOS') {
        debuggerRouter.pushMessageByChannelId('page.debugger', message.channelId, {
          method: 'WxDebug.bundleRendered'
        });
      }
    }
  }
  else if (payload.result && payload.result.method === 'WxDebug.syncReturn') {
    message.payload = {
      error: payload.error,
      ret: payload.result.params.ret
    };
    message.to('sync');
    return;
  }
  else if (payload.result && payload.id === undefined) {
    message.discard();
  }
  message.to('proxy.inspector');
}).at('proxy.native').when('!payload.method||payload.method.split(".")[0]!=="WxDebug"');
