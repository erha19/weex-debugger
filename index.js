const Devtool = require('./lib/lib/devtool');
const Config = require('./lib/lib/config');
const IP = require('ip');

/**
 * Start server and lanunch chrome.
 * @param {string} entry filename/floder
 * @param {Object} config 
 * - ip ip of node server.
 * - port port of node server
 * - remoteDebugPort remote-debug-port of headless.
 * - enableHeadless enable to start headless chromium or not.
 * @param {Function} cb 
 */
const  startServerAndLaunchDevtool = (entry, config, cb) => {
  Config.ip = config.ip || IP.address();
  Config.port =  config.port || 8088;
  Config.remoteDebugPort = config.remoteDebugPort || 9222;
  Config.enableHeadless = config.enableHeadless === false ? false : true;
  Devtool.start(entry, config, cb)
}
const api = {
  startServerAndLaunchDevtool: startServerAndLaunchDevtool
}

module.exports ={
  api
}