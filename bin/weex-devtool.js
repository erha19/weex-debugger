#!/usr/bin/env node

'use strict';
var program = require('commander');
var debugRun = require('../src/util/debug_run');
var config = require('../src/lib/config');
var ip = require('ip');
var exit = require('exit');
var hosts = require('../src/util/hosts');
var packageInfo = require('../package.json');
var path = require('path');
var detect = require('detect-port');
var del = require('del');
var devtool = require('../src/lib/devtool');
var mlink = require('mlink');

program.option('-v, --version', 'display version')
.option('--ip [ip]', 'set the host ip of debugger server')
.option('-h, --help', 'display help')
.option('-V, --verbose', 'display logs of debugger server')
.option('--loglevel [loglevel]', 'set log level silent|error|warn|info|log|debug', 'error')
.option('-p, --port [port]', 'set debugger server port', '8088')
.option('-m, --manual', 'manual mode,this mode will not auto open chrome')
.option('--min', '')
.option('--debug', '');
.option('--remotedebugport', '9223');

// Supporting add the file / directory parameter after the command.
program['arguments']('[target]').action(function (target) {
  program.target = target;
});

program.parse(process.argv);

// Fix tj's commander bug overwrite --help
if (program.help === undefined) {
  program.outputHelp();
  exit(0);
}
// Fix tj's commander bug overwrite --version
if (program.version === undefined) {
  console.log(packageInfo.version);
  exit(0);
}

if (program.ip && !hosts.isValidLocalHost(program.ip)) {
  console.log('[' + program.ip + '] is not your local address!');
  exit(0);
}
if (program.verbose) {
  config.logLevel = 'debug';
}

if (program.remotedebugport) {
  config.remoteDebugPort = program.remotedebugport;
}

// Formate config 
config.ip = program.ip || ip.address();
config.verbose = program.verbose;
config.manual = program.manual;
config.min = program.min;
config.logLevel = program.loglevel;

// Check whether the port is occupied
detect(program.port).then(function (open) {
  config.inUse = open !== +program.port;
  if (config.inUse) {
    config.inUse = {
      old: program.port,
      open: open
    };
    config.port = open;
  } else {
    config.port = program.port;
  }
  if (program.debug) {
    debugRun(__filename, config);
  }
  else {
    mlink.Logger.setLogLevel(mlink.Logger.LogLevel[config.logLevel.toUpperCase()]);
    // Clear files on bundleDir
    try {
      del.sync(path.join(__dirname, '../frontend/', config.bundleDir, '/*'), {
        force: true
      });
    } catch (e) {}
    devtool.start(program.target, config);
  }
});
