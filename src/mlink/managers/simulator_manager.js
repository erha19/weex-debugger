const config = require('../../lib/config');
const hook = require('../../util/hook');
const simrun = require('../../util/simrun');
exports.connect = function (channelId) {
  let params = `_wx_devtool=ws://${config.ip}:${config.port}/debugProxy/native/${channelId}`;
  if (config.bundleUrls && config.bundleUrls.length === 1) {
    params += ',' + config.bundleUrls[0];
  }
  hook.record('/weex_tool.weex_debugger.scenes', { feature: 'simrun', status: 'start' });
  return simrun.ios('weex-devtool', 'iPhone 6', 'https://registry.npm.taobao.org/weex-ios-playground/-/weex-ios-playground-1.2.0.tgz|package/WeexDemo.app', 'wxpage', params);
};
