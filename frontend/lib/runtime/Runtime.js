importScripts('/lib/runtime/EventEmitter.js');
self.$$frameworkFlag = {};
var channelId;
var shouldReturnResult = false;
var requestId;
var payloads = []
var injectedGlobals = ['Promise',
  // W3C
  'window', 'weex', 'service', 'Rax', 'services', 'global', 'screen', 'document', 'navigator', 'location', 'fetch', 'Headers', 'Response', 'Request', 'URL', 'URLSearchParams', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'alert',
  // ModuleJS
  'define', 'require',
  // Weex
  'bootstrap', 'register', 'render', '__d', '__r', '__DEV__', '__weex_define__', '__weex_require__', '__weex_viewmodel__', '__weex_document__', '__weex_bootstrap__', '__weex_options__', '__weex_data__', '__weex_downgrade__', '__weex_require_module__', 'Vue'
];
var cachedSetTimeout = this.setTimeout;
Object.defineProperty(this, 'setTimeout', {
  get: function () {
    return cachedSetTimeout;
  },
  set: function () {}
});

function EventEmitter() {
  this._handlers = {};
}

function createWeexBundleEntry(sourceUrl) {
  var code = '';
  if (self.$$frameworkFlag[sourceUrl] || self.$$frameworkFlag['@']) {
    code += (self.$$frameworkFlag[sourceUrl] || self.$$frameworkFlag['@']) + '\n';
  }
  code += '__weex_bundle_entry__(';
  injectedGlobals.forEach(function (g, i) {
    if (false && g === 'navigator') {
      code += 'typeof ' + g + '==="undefined"||' + g + '===self.' + g + '?undefined:' + g;
    }
    else {
      code += 'typeof ' + g + '==="undefined"?undefined:' + g;
    }
    if (i < injectedGlobals.length - 1) {
      code += ',';
    }
  });
  code += ');';
  return code;
}
var origConsole = self.console;
var clearConsole = self.console.clear.bind(self.console);
self.__WEEX_DEVTOOL__ = true;
var eventEmitter = new EventEmitter();
onmessage = function (message) {
  eventEmitter.emit(message.data && message.data.method, message.data)
};
self.callNativeModule = function () {
    var message = {
        method: 'WxDebug.syncCall',
        params: {
        method: 'callNativeModule',
        args: Array.prototype.slice.call(arguments)
        },
        channelId: channelId
    }
    var result = syncRequest(message);
    if (shouldReturnResult && requestId) {
        postData({
            id: requestId,
            result: null,
            error: {errorCode: 0}
        });
    }
    if (result && result.error) {
        self.console.error(result.error);
        // throw new Error(result.error);
    }
    else return result && result.ret;
}

self.callNativeComponent = function () {
  var message = {
    method: 'WxDebug.syncCall',
    params: {
      method: 'callNativeComponent',
      args: Array.prototype.slice.call(arguments)
    },
    channelId: channelId
  }
  var result = syncRequest(message);
  if (result.error) {
    self.console.error(result.error);
    // throw new Error(result.error);
  }
  else return result.ret;
};

self.callNative = function (instance, tasks, callback) {
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    if (task.method == 'addElement') {
      for (var key in task.args[1].style) {
        if (Number.isNaN(task.args[1].style[key])) {
          self.console.error('invalid value [NaN] for style [' + key + ']', task);
          //task.args[1].style[key]=0;
        }
      }
    }
  }
  var payload = {
    method: 'WxDebug.callNative',
    params: {
      instance: instance,
      tasks: tasks,
      callback: callback
    }
  };
  postData(payload);
};

self.callAddElement = function (instance, ref, dom, index, callback) {
  var payload = {
    method: 'WxDebug.callAddElement',
    params: {
      instance: instance,
      ref: ref,
      dom: dom,
      index: index,
      callback: callback
    }
  };
  postData(payload);
};

function postData(payload) {
  payloads.push(payload)
  try {
    self.console.debug(`CallNative with some json data:`, payload)
    postMessage(payload);
  }
  catch (e) {
    self.console.warn(`CallNative with some non-json data:`, payload);
    payload = JSON.parse(JSON.stringify(payload));
    postMessage(payload);
  }
}
var _rewriteLog = function () {
  var LEVELS = ['error', 'warn', 'info', 'log', 'debug'];
  var backupConsole = {
    error: origConsole.error,
    warn: origConsole.warn,
    info: origConsole.info,
    log: origConsole.log,
    debug: origConsole.debug
  };

  function resetConsole() {
    self.self.console.error = backupConsole.error;
    self.self.console.warn = backupConsole.warn;
    self.console.info = backupConsole.info;
    self.self.console.log = backupConsole.log;
    self.console.debug = backupConsole.debug;
    self.console.time = origConsole.time;
    self.console.timeEnd = origConsole.timeEnd;
  }

  function noop() {}
  return function (logLevel) {
    resetConsole();
    LEVELS.slice(LEVELS.indexOf(logLevel) + 1).forEach(function (level) {
      self.console[level] = noop;
    })
  }
}();
eventEmitter.on('WxDebug.initJSRuntime', function (message) {
  channelId = message.channelId;
  for (var key in message.params.env) {
    if (message.params.env.hasOwnProperty(key)) {
      self[key] = message.params.env[key];
    }
  }
  importScripts(message.params.url);
  _rewriteLog(message.params.env.WXEnvironment.logLevel);
});
eventEmitter.on('WxDebug.changeLogLevel', function (message) {
  self.WXEnvironment.logLevel = message.params;
});
eventEmitter.on('Console.messageAdded', function (message) {
  self.console.error('[Native Error]', message.params.message.text);
});
var instanceMap = {};
eventEmitter.on('WxDebug.importScript', function (data) {
  if (data.params.sourceUrl) {
    importScripts(data.params.sourceUrl);
  }
  else {
    new Function('', data.params.source)();
  }
})
eventEmitter.on('WxDebug.callJsResult', function (data) {
  var method = data.params.method;
  if (method === 'createInstance') {
    var url = data.params.sourceUrl;
    postMessage({
      method: 'WxRuntime.clearLog',
    });
    importScripts(url);
    self.createInstance(data.params.args[0], createWeexBundleEntry(url), data.params.args[2], data.params.args[3]);
    instanceMap[data.params.args[0]] = true;
  }
  else if (method === 'destroyInstance') {
    if (instanceMap[data.params.args[0]]) {
      self.destroyInstance(data.params.args[0]);
      delete instanceMap[data.params.args[0]];
    }
    else {
      // self.console.warn('invalid destroyInstance[' + data.params.args[0] + '] because runtime has been refreshed(It does not impact your code. )');
    }
  }
  else if (self[data.params.method]) {
    shouldReturnResult = true;
    requestId = +data.id
    self[data.params.method].apply(null, data.params.args);
  }
  else {
    self.console.warn('execJSWithResult[' + data.params.method + '] error: jsframework has no such api');
  }
});

eventEmitter.on('WxDebug.callJS', function (data) {
  var method = data.params.method;
  if (method === 'createInstance') {
    var url = data.params.sourceUrl;
    postMessage({
      method: 'WxRuntime.clearLog',
    });
    importScripts(url);
    self.createInstance(data.params.args[0], createWeexBundleEntry(url), data.params.args[2], data.params.args[3]);
    instanceMap[data.params.args[0]] = true;
  }
  else if (method === 'destroyInstance') {
    if (instanceMap[data.params.args[0]]) {
      self.destroyInstance(data.params.args[0]);
      delete instanceMap[data.params.args[0]];
    }
    else {
      self.console.warn('invalid destroyInstance[' + data.params.args[0] + '] because runtime has been refreshed(It does not impact your code. )');
    }
  }
  else if (self[data.params.method]) {
    shouldReturnResult = false;
    self[data.params.method].apply(null, data.params.args);
  }
  else {
    self.console.warn('callJS[' + data.params.method + '] error: jsframework has no such api');
  }
});

function dump(id) {
  postMessage({
    method: 'WxRuntime.dom',
    params: getRoot(id)
  })
}

function syncRequest(data) {
  var request = new XMLHttpRequest();
  request.open('POST', '/syncApi', false); // `false` makes the request synchronous
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(data));
  if (request.status === 200) {
    return JSON.parse(request.responseText);
  }
  else {
    // self.console.error('sync request failed:['+request.status+']'+request.responseText);
    return {
      error: request.responseText
    };
  }
}
