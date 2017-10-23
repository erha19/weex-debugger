const Router = require('koa-router');
const MemoryFile = require('../../lib/memory_file');
const mlink = require('mlink');
const Logger = mlink.Logger;
const DeviceManager = require('../../mlink/lib/device_manager');
const URL = require('url');
const config = require('../../lib/config');
const bundleWrapper = require('../../util/bundle_wrapper');
const protocols = {
  'http:': require('http'),
  'https:': require('https')
};
const httpRouter = Router();

function getRemote (url) {
  return new Promise(function (resolve, reject) {
    const urlObj = URL.parse(url);
    (protocols[urlObj.protocol] || protocols['http:']).get({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.path,
      method: 'GET',
      headers: {
        'User-Agent': 'Weex/1.0.0'
      }
    }, function (res) {
      let chunks = [];
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
      res.on('end', function () {
        resolve(Buffer.concat(chunks).toString());
        chunks = null;
      });
    }).on('error', function (e) {
      reject(e);
    });
  });
}
const rSourceMapDetector = /\.map$/;
httpRouter.get('/source/*', function * (next) {
  const path = this.params[0];
  if (rSourceMapDetector.test(path)) {
    // fixme 硬写协议头 隐患
    const content = yield getRemote('http://' + path);
    if (!content) {
      this.response.status = 404;
    }
    else {
      this.response.status = 200;
      this.set('Access-Control-Allow-Origin', '*');
      this.type = 'text/javascript';
      this.response.body = content;
    }
  }
  else {
    let query = this.request.url.split('?');
    query = query[1] ? '?' + query.slice(1).join('?') : '';
    const file = MemoryFile.get(path + query);
    if (file) {
      this.response.status = 200;
      this.type = 'text/javascript';
      if (file.url && config.proxy) {
        const content = yield getRemote(file.url).catch(function (e) {
          Logger.error(e);
        });
        if (!content) {
          this.response.body = file.getContent();
        }
        else {
          this.response.body = bundleWrapper(content, file.getUrl());
        }
      }
      else {
        this.response.body = file.getContent();
      }
    }
    else {
      this.response.status = 404;
    }
  }
});

// function exists (file) {
//   return new Promise((resolve, reject) => {
//     fs.exists(file, function (flag) {
//       resolve(flag);
//     });
//   });
// }
// const bundleDir = path.join(__dirname, '../../frontend/', config.bundleDir);
/* httpRouter.get('/' + config.bundleDir + '/!*', function*(next) {
    const ext = path.extname(this.params[0]);
    if (ext == '.js' || ext == '.we') {
        const dir = path.dirname(this.params[0]);
        const basename = path.basename(this.params[0], ext);
        const bundle = path.join(bundleDir, dir, basename + '.js');
        const we = path.join(config.root || bundleDir, dir, basename + '.we');
        if (yield exists(bundle)) {
            this.response.status = 200;
            this.type = 'text/javascript';
            this.response.body = fs.createReadStream(bundle);
        }
        /!*else if (yield exists(we)) {
            const targetPath = yield Builder[config.buildMode](we, dir);
            this.response.status = 200;
            this.type = 'text/javascript';
            this.response.body = fs.createReadStream(targetPath);
        }*!/
        else {
            this.response.status = 404;
        }
    }
    else {
        this.response.status = 404;
    }
});*/
let syncApiIndex = 0;
const SyncTerminal = mlink.Terminal.SyncTerminal;
const syncHub = mlink.Hub.get('sync');
httpRouter.post('/syncApi', function * () {
  const idx = syncApiIndex++;
  const payload = this.request.body;
  const device = DeviceManager.getDevice(payload.channelId);
  if (device) {
    const terminal = new SyncTerminal();
    terminal.channelId = payload.channelId;
    syncHub.join(terminal);
    payload.params.syncId = 100000 + idx;
    payload.id = 100000 + idx;
    const data = yield terminal.send(payload);
    this.response.status = 200;
    this.type = 'application/json';
    this.response.body = JSON.stringify(data);
  }
  else {
    this.response.status = 500;
    this.response.body = 'device not found!';
  }
});
module.exports = httpRouter;
