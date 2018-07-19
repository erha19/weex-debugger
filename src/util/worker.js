// mock environment
importScripts('/lib/constructors/_EventEmitter.js');
var __channelId__;
var ___shouldReturnResult__ = false;
var __requestId__;
var __origConsole__ = self.console;
var __eventEmitter__ = new __EventEmitter__();


// The argument maybe an undefine value
var __protectedAragument__ = function (arg) {
  var args = Array.prototype.slice.call(arg);
  for(var i = 0; i < args.length; i++) {
    if (!args[i]){
      args[i] = '';
    }
  }
  return args;
}

var __postData__ = function (payload) {
  if (payload.method === 'WxDebug.callCreateBody' && !payload.params.domStr) {
    return;
  }
  try {
    // self.console.debug(`CallNative with some json data:`, payload);
    postMessage(payload);
  }
  catch (e) {
    self.console.warn(`CallNative with some non-json data:`, payload);
    payload = JSON.parse(JSON.stringify(payload));
    postMessage(payload);
  }
}

var __rewriteLog__ = function () {
  var LEVELS = ['error', 'warn', 'info', 'log', 'debug'];
  var backupConsole = {
    error: __origConsole__.error,
    warn: __origConsole__.warn,
    info: __origConsole__.info,
    log: __origConsole__.log,
    debug: __origConsole__.debug
  };

  function resetConsole() {
    self.console.error = backupConsole.error;
    self.console.warn = backupConsole.warn;
    self.console.info = backupConsole.info;
    self.console.log = backupConsole.log;
    self.console.debug = backupConsole.debug;
    self.console.time = __origConsole__.time;
    self.console.timeEnd = __origConsole__.timeEnd;
  }

  function noop() {}
  return function (logLevel) {
    resetConsole();
    LEVELS.slice(LEVELS.indexOf(logLevel) + 1).forEach(function (level) {
      self.console[level] = noop;
    })
  }
}();

var __syncRequest__ = function (data) {
  var request = new XMLHttpRequest();
  request.open('POST', '/syncApi', false); // `false` makes the request synchronous
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(data));
  if (request.status === 200) {
    return JSON.parse(request.responseText);
  }
  else {
    return {
      error: request.responseText
    };
  }
}

/**
 * init hook function for (layout/sandbox)
 */
var __initLayoutAndSandboxEnv__ = function () {
  debugger
  self.callCreateBody = function (instance, domStr) {
    if (!domStr) return;
    var payload = {
      method: 'WxDebug.callCreateBody',
      params: {
        instance: instance,
        domStr: domStr
      }
    };
    __postData__(payload);
  };
  
  self.callUpdateFinish = function (instance, tasks, callback) {
    var payload = {
      method: 'WxDebug.callUpdateFinish',
      params: {
        instance: instance,
        tasks: tasks,
        callback: callback
      }
    };
    __postData__(payload);
  };
  
  self.callCreateFinish = function (instance) {
    var payload = {
      method: 'WxDebug.callCreateFinish',
      params: {
        instance: instance
      }
    };
    __postData__(payload);
  }
  
  self.callRefreshFinish = function (instance, tasks, callback) {
    var payload = {
      method: 'WxDebug.callRefreshFinish',
      params: {
        instance: instance,
        tasks: tasks,
        callback: callback
      }
    };
    __postData__(payload);
  }
  
  self.callUpdateAttrs = function (instance, ref, data) {
    var payload = {
      method: 'WxDebug.callUpdateAttrs',
      params: {
        instance: instance,
        ref: ref,
        data: data
      }
    };
    __postData__(payload);
  }
  
  self.callUpdateStyle = function (instance, ref, data) {
    var payload = {
      method: 'WxDebug.callUpdateStyle',
      params: {
        instance: instance,
        ref: ref,
        data: data
      }
    };
    __postData__(payload);
  }
  
  self.callRemoveElement = function (instance, ref) {
    var payload = {
      method: 'WxDebug.callRemoveElement',
      params: {
        instance: instance,
        ref: ref
      }
    };
    __postData__(payload);
  }
  
  self.callMoveElement = function (instance, ref, parentRef, index_str) {
    var payload = {
      method: 'WxDebug.callMoveElement',
      params: {
        instance: instance,
        ref: ref,
        parentRef: parentRef,
        index_str: index_str
      }
    };
    __postData__(payload);;
  }

  self.callAddEvent = function (instance, ref, event) {
    var payload = {
      method: 'WxDebug.callAddEvent',
      params: {
        instance: instance,
        ref: ref,
        event: event
      }
    };
    __postData__(payload);
  }

  self.callRemoveEvent = function (instance, ref, event) {
    var payload = {
      method: 'WxDebug.callRemoveEvent',
      params: {
        instance: instance,
        ref: ref,
        event: event
      }
    };
    __postData__(payload);
  }
}

self.__WEEX_DEVTOOL__ = true;

self.callNativeModule = function () {
  var message = {
    method: 'WxDebug.syncCall',
    params: {
      method: 'callNativeModule',
      args: __protectedAragument__(arguments)
    },
    channelId: __channelId__
  }
  var result = __syncRequest__(message);
  if (___shouldReturnResult__ && __requestId__) {
    __postData__({
      id: __requestId__,
      result: null,
      error: {
        errorCode: 0
      }
    });
  }
  if (result && result.error) {
    self.console.error(result.error);
    // throw new Error(result.error);
  }
  else return result && result.ret;
}

self.callNativeComponent = function () {
  var args = Array.prototype.slice.call(arguments);
  for(var i = 0; i < args.length; i++) {
    if (!args[i]){
      args[i] = ''
    }
  }
  var message = {
    method: 'WxDebug.syncCall',
    params: {
      method: 'callNativeComponent',
      args: args
    },
    channelId: __channelId__
  }
  var result = __syncRequest__(message);
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
  __postData__(payload);
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
  __postData__(payload);
};

self.nativeLog = function (args){
  __rewriteLog__(self.WXEnvironment.logLevel);
  self.console.log(args)
}

self.onmessage = function (message) {
  __eventEmitter__.emit(message.data && message.data.method, message.data)
};

__eventEmitter__.on('WxDebug.callJS', function (data) {
  var method = data.params.method;
  if (method === 'importScript') {
    importScripts(data.params.sourceUrl)
  }
  else if (method === 'destroyInstance') {
    // close worker
    self.destroyInstance(data.params.args[0]);
    self.console.log('destroy')
  }
  // else if (method === '__WEEX_CALL_JAVASCRIPT__') {
  //   self['__WEEX_CALL_JAVASCRIPT__'].apply(null, data.params.args)
  // }
  else if (self[method]) {
    self[method].apply(null, data.params.args)
  }
  else {
    self.console.warn('call [' + method + '] error: jsframework has no such api');
  }
});

__eventEmitter__.on('WxDebug.changeLogLevel', function (message) {
  self.WXEnvironment.logLevel = message.params;
});

__eventEmitter__.on('Console.messageAdded', function (message) {
  self.console.error('[Native Error]', message.params.message.text);
});

__eventEmitter__.on('WxDebug.importScript', function (message) {
    if (message.params.sourceUrl) {
      importScripts(message.params.sourceUrl);
    }
    else {
      new Function('', message.params.source)();
    }
})

__eventEmitter__.on('WxDebug.initSandbox', function (message) {
  var instanceid = message.params.args[0];
  var options = message.params.args[1];
  var instanceData = message.params.args[2];
  var instanceContext = self.createInstanceContext(instanceid, options, instanceData);

  __channelId__ = message.channelId;
  if (message.params.isLayoutAndSandbox !== 'false' && message.params.isLayoutAndSandbox) {
    __initLayoutAndSandboxEnv__();
  }
  for (var prop in instanceContext) {
    if (instanceContext.hasOwnProperty(prop) && prop !== 'callNative') {
      self[prop] = instanceContext[prop];
    }
  }
  for (var key in message.params.env) {
    if (message.params.env.hasOwnProperty(key)) {
      self[key] = message.params.env[key];
    }
  }
  if (message.params.dependenceUrl) {
    importScripts(message.params.dependenceUrl);
  }
  __rewriteLog__(message.params.env.WXEnvironment.logLevel);
});