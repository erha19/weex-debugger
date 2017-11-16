var worker;
var timer;
var RuntimeSocket
var BrowserChannelId
var EntrySocket = new WebsocketClient('ws://' + location.host + '/page/entry');
EntrySocket.on('WxDebug.startDebugger', function (message) {
    timer && clearTimeout(timer)
    timer = setTimeout(function(){
        if (!RuntimeSocket) {
            connect(message.params)
        }
        else if(RuntimeSocket && BrowserChannelId!==message.params){
            RuntimeSocket.close()
            connect(message.params)
        }
    },3000)
})

function connect(channelId) {
  BrowserChannelId = channelId || new URLSearchParams(location.search).get('channelId');
  RuntimeSocket = new WebsocketClient('ws://' + window.location.host + '/debugProxy/runtime/' + BrowserChannelId);
  RuntimeSocket.on('*', function (message) {
    if (worker) {
      worker.postMessage(message);
    }
  });
  RuntimeSocket.on('socketOpened', function() {
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
    var domain = message.method.split('.')[0];
    var method = message.method.split('.')[1];
    if (domain == 'WxRuntime') {
      if (method === 'clearLog') {
        //console.clear();
      }
      else if (method === 'dom') {}
    }
    else {
      RuntimeSocket.send(message);
    }
  };
  worker.postMessage(message)
}
//initJSRuntime();
function resolve(root) {
  var html = `<${root.type} ${resolveStyle(root.style)}`;
  var value = '';
  for (var key in root.attr) {
    if (root.attr.hasOwnProperty(key)) {
      if (root.type == 'text' && key == 'value') {
        value = root.attr[key];
      }
      html += ` ${key}="${root.attr[key]}"`;
    }
  }
  html += '>';
  if (value) {
    html += value;
  }
  else {
    for (var i = 0; root.children && i < root.children.length; i++) {
      html += resolve(root.children[i]);
    }
  }
  html += `</${root.type}>`;
  return html;
}

function resolveStyle(styles) {
  var styleText = '';
  for (var key in styles) {
    if (styles.hasOwnProperty(key)) {
      styleText += key.replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '-' + b.toLowerCase();
      }) + ':' + resolveStyleValue(styles[key]) + ';';
    }
  }
  if (styleText) {
    styleText = ` style="${styleText}"`;
  }
  return styleText;
}
var cssNumber = {
  columnCount: true,
  fillOpacity: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true
};

function resolveStyleValue(value) {
  if (isNaN(value) || cssNumber[value]) {
    return value;
  }
  else {
    return value + 'px';
  }
}
