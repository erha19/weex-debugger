var worker;
var timer;
var RuntimeSocket
var BrowserChannelId
var EntrySocket = new WebsocketClient('ws://' + location.host + '/page/entry');

EntrySocket.on('WxDebug.startDebugger', function (message) {
  if (!RuntimeSocket) {
    location.href = `http://${location.host}/runtime.html?channelId=${message.params}`
  }
  else if(RuntimeSocket && BrowserChannelId!==message.params){
    location.href = `http://${location.host}/runtime.html?channelId=${message.params}`
  }
})

BrowserChannelId = new URLSearchParams(location.search).get('channelId');

if (BrowserChannelId) {
  connect(BrowserChannelId)
}

function connect(channelId) {
  RuntimeSocket = new WebsocketClient('ws://' + window.location.host + '/debugProxy/runtime/' + channelId);
  RuntimeSocket.on('*', function (message) {
    if (worker) {
      worker.postMessage(message);
    }
  });

  RuntimeSocket.on('WxDebug.deviceDisconnect', function () {
    location.href = `http://${location.host}/runtime.html`
  })

  RuntimeSocket.on('WxDebug.refresh', function () {
    location.reload();
  });

  RuntimeSocket.on('WxDebug.initJSRuntime', function (message) {
    destroyJSRuntime();
    var logLevel = localStorage.getItem('logLevel');
    if (logLevel) {
      message.params.env.WXEnvironment.logLevel = logLevel;
    }
    message.channelId = BrowserChannelId;
    initJSRuntime(message);
  });
}

function destroyJSRuntime() {
  if (worker) {
    worker.terminate();
    worker.onmessage = null;
    worker = null;
  }
}

function initJSRuntime(message) {
  worker = new Worker('/lib/runtime/Runtime.js');
  worker.onmessage = function (message) {
    message = message.data;
    RuntimeSocket.send(message);
    var domain = message.method.split('.')[0];
    var method = message.method.split('.')[1];
  };
  worker.postMessage(message);
}
