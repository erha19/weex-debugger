#!/usr/bin/env node

'use strict';

const program = require('commander');
const ip = require('ip');
const exit = require('exit');
const path = require('path');
const detect = require('detect-port');
const del = require('del');
const mlink = require('mlink');
const op = require('os');
const packageInfo = require('../package.json');
const debugRun = require('../lib/util/debug_run');
const config = require('../lib/lib/config');
const devtool = require('../lib/lib/devtool');
const hook = require('../lib/util/hook');
const env = require('../lib/util/env');
const hosts = require('../lib/util/hosts');

program
.option('-v, --version', 'display version')
.option('-h, --help', 'display help')
.option('-H --host [host]', 'set the host ip of debugger server')
.option('-V, --verbose', 'display logs of debugger server')
.option('-p, --port [port]', 'set debugger server port', '8088')
.option('-m, --manual', 'manual mode,this mode will not auto open chrome')
.option('--min', 'minimize the jsbundle')
.option('--debug', 'set log level to debug mode')
.option('--loglevel [loglevel]', 'set log level silent|error|warn|info|log|debug', 'error')
.option('--remotedebugport [remotedebugport]', 'set the remote debug port', config.remoteDebugPort);


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

if (program.host && !hosts.isValidLocalHost(program.host)) {
  console.log('[' + program.host + '] is not your local address!');
  exit(0);
}

if (program.verbose) {
  config.logLevel = 'debug';
}

if (program.remotedebugport) {
  config.remoteDebugPort = program.remotedebugport;
}

// Get the local environment
env.getVersionOf('weex', (v) => {
  config.weexVersion = v.version;
})
env.getVersionOf('npm', (v) => {
  config.npmVersion = v.version;
})
env.getVersionOf('node', (v) => {
  config.nodeVersion = v.version;
})

// Formate config 
config.ip = program.host || ip.address();
config.verbose = program.verbose;
config.manual = program.manual;
config.min = program.min;
config.logLevel = program.loglevel;

process.on('uncaughtException', (err) => {
  try {
    let killTimer;
    const params = Object.assign({
      stack: err && err.stack,
      os: os.platform(),
      node: config.nodeVersion,
      npm: config.npmVersion
    }, config.weexVersion);
    hook.record('/weex_tool.weex_debugger.app_crash', params);
    killTimer = setTimeout(function () {
      process.exit(1);
    }, 30000);
    killTimer.unref();
  } catch (e) {
      console.log('Error Message: ', e.stack);
  }
});

// Check whether the port is occupied
detect(program.port).then( (open) => {
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
