/**
 * Created by exolution on 17/3/14.
 */
const hosts = require('../util/hosts');
const path = require('path');
const builder = require('weex-builder');
const url = require('url');
const chalk = require('chalk');
const config = require('./config');
const debugServer = require('../server');
const launcher = require('../util/launcher');
const headless = require('../server/headless');
const Router = require('mlink').Router;
const boxen = require('boxen');

exports.startServerAndLaunch = function (ip, port, manual, cb) {
  this.startServer(ip, port).then(() => {
    cb && cb();
    if (!manual) this.launch(ip, port);
  });
};
exports.startServer = function (ip, port) {
  return new Promise((resolve, reject) => {
    const inUse = config.inUse;
    let message = chalk.green('Start debugger server!');
    if (inUse) {
      message += ' ' + chalk.red('(on port ' + inUse.open + ',' + (' because ' + inUse.old + ' is already in use)'));
    }
    message += '\n\n';
    message += '- ' + chalk.bold('Websocket Address For Native: ') + ' ws://' + ip + ':' + port + '/debugProxy/native\n';
    message += '- ' + chalk.bold('Debug Server:                 ') + ' http://' + ip + ':' + port + '\n';
    debugServer.start(port, function () {
      console.log(boxen(message, {
        padding: 1,
        borderColor: 'green',
        margin: 1
      }));
      resolve();
    });
  });
};
exports.launch = function (ip, port) {
  const debuggerURL = 'http://' + (ip || 'localhost') + ':' + port + '/';
  console.log('Launching Dev Tools...');
  if (config.enableHeadless) {
    headless.launchHeadless(`${config.ip}:${config.port}`, config.remoteDebugPort);
  }
  launcher.launchChrome(debuggerURL, config.remoteDebugPort || 9222);
};
exports.resolveBundlesAndEntry = function (entry, bundles, ip, port) {
  let entryUrl;
  const bundleUrls = bundles.map(b => resolveBundleUrl(b, ip, port));
  if (isUrl(entry)) {
    entryUrl = resolveRealUrl(entry);
    entryUrl = entryUrl(/127\.0\.0\.1/g, ip);
    const urlObj = url.parse(entryUrl, true);
    if (!/wh_weex=true/.test(entryUrl) && !urlObj.query['_wx_tpl']) {
      urlObj.query['_wx_tpl'] = entryUrl;
      urlObj.search = '';
      entryUrl = url.format(urlObj);
    }
    bundleUrls.push(entryUrl);
  }
  return bundleUrls;
};

function resolveBundleUrl (bundlePath, ip, port) {
  return 'http://' + ip + ':' + port + path.join('/' + config.bundleDir, bundlePath.replace(/\.(we|vue)$/, '.js')).replace(/\\/g, '/');
}

function isUrl (str) {
  return /^https?:\/\//.test(str);
}

function resolveRealUrl (url) {
  return url.replace(/^(https?:\/\/)([^/:]+)(?=:\d+|\/)/, function (m, a, b) {
    if (!/\d+\.\d+\.\d+\.\d+/.test(a)) {
      return a + hosts.findRealHost(b);
    }
    else {
      return m;
    }
  });
}

function resolveConnectUrl (config) {
  const host = config.ip + ':' + config.port;
  config.connectUrl = config.connectUrl || `http:\/\/${host}/devtool_fake.html?_wx_devtool=ws:\/\/${host}/debugProxy/native/{channelId}`;
}
exports.start = function (target, config, cb) {
  resolveConnectUrl(config);
  if (isUrl(target)) {
    const bundleUrls = this.resolveBundlesAndEntry(target, [], config.ip, config.port);
    config.bundleUrls = bundleUrls;
    this.startServerAndLaunch(config.ip, config.port, config.manual, cb);
  }
  else if (target) {
    const filePath = path.resolve(target);
    let firstBuild = true;
    builder.build(filePath, path.join(__dirname, '../../frontend/weex'), {
      watch: true,
      devtool: 'inline-source-map'
    }, (err, output, json) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log('Build completed!\nChild');
        console.log(output.toString());
        console.log(`Time: ${chalk.bold(json.time)}ms`);
        if (firstBuild) {
          firstBuild = false;
          const bundles = output.map((o) => path.relative(path.join(__dirname, '../../frontend/weex'), o.to));
          const bundleUrls = this.resolveBundlesAndEntry(config.entry, bundles, config.ip, config.port);
          config.bundleUrls = bundleUrls;
          this.startServerAndLaunch(config.ip, config.port, config.manual, cb);
        }
        else {
          Router.get('debugger').pushMessage('proxy.native', {
            method: 'WxDebug.reload'
          });
        }
      }
    });
  }
  else {
    this.startServerAndLaunch(config.ip, config.port, config.manual, cb);
  }
};
