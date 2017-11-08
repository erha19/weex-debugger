const Devtool = require('./lib/lib/devtool');
const Config = require('./lib/lib/config');

let map = module.exports;

let api = map['api'] = {};

const IP = require('ip');

api.startServerAndLaunchDevtool = (entry, root, port, cb) => {
  Config.ip = IP.address();
  Config.port =  port || 8088;
  Devtool.start(entry, Config, cb)
}