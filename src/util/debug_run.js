/**
 * Created by exolution on 17/3/22.
 */
const childProcess = require('child_process');
const url = require('url');
const launcher = require('./launcher');
module.exports = function (filename, config) {
  const child = childProcess.spawn('node', ['--inspect=9331', filename, '-V'].concat(process.argv.slice(2).filter(arg => arg !== '--debug')), {
    stdio: ['inherit', 'pipe', 'pipe']
  });
  let inspectorUrl = null;
  child.stderr.on('data', function (data) {
    const match = /(chrome-devtools:\/\/.*)\n/.exec(data.toString());
    if (match && inspectorUrl !== false) {
      const urlObj = url.parse(match[1].replace('127.0.0.1', config.ip));
      urlObj.protocol = 'http';
      urlObj.host = config.ip + ':' + config.port;
      urlObj.pathname = '/inspector/inspector.html';
      inspectorUrl = url.format(urlObj);
    }
  });

  child.stdout.on('data', function (data) {
    if (/Debug Server online/i.test(data.toString())) {
      if (inspectorUrl) {
        const url = inspectorUrl;
        setTimeout(function () {
          launcher.launchChrome(url);
        }, 500);

        inspectorUrl = false;
      }
    }
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
};
