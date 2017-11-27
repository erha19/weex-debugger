const Devtool = require('./lib/lib/devtool');
const Config = require('./lib/lib/config');

let map = module.exports;

let api = map['api'] = {};

const IP = require('ip');

api.startServerAndLaunchDevtool = (entry, config, cb) => {
  Config.ip = config.ip || IP.address();
  Config.port =  config.port || 8088;
  Config.remoteDebugPort = config.remoteDebugPort || 9222;
  Config.enableHeadless = config.enableHeadless === false ? false : true;
  Devtool.start(entry, Config, cb)
}