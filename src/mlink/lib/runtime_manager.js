/**
 * Created by exolution on 17/3/2.
 */
const WebsocketTerminal = require('mlink').Terminal.WebsocketTerminal;
const url = require('url');
const request = require('../../util/request');
const querystring = require('querystring');
const WebSocket = require('ws');
const config = require('../../lib/config');
class RuntimeManager {
  constructor () {
    this.runtimeTerminalMap = {};
  }

  connect (channelId) {
    return new Promise((resolve, reject) => {
      request.getRemote(`http://localhost:${config.remoteDebugPort || 9222}/json`).then((data) => {
        const list = JSON.parse(data);
        let found = false;
        for (const target of list) {
          const urlObj = url.parse(target.url);
          const qs = querystring.parse(urlObj.query);
          if (urlObj.pathname === '/runtime.html' && qs.channelId === channelId) {
            found = target;
            break;
          }
          else if (urlObj.pathname === '/debug.html' && qs.channelId === channelId) {
            found = target;
          }
        }
        if (found) {
          if (found.webSocketDebuggerUrl) {
            const ws = new WebSocket(found.webSocketDebuggerUrl);
            const terminal = new WebsocketTerminal(ws, channelId);
            this.runtimeTerminalMap[channelId] = terminal;
            ws.on('error', function (err) {
              console.error(err);
            });
            resolve(terminal);
          }
          else {
            reject('请不要打开chrome自带的的inspector');
          }
        }
        else {
          reject('找不到运行时~!');
        }
      }).catch((e) => {
        reject('JS运行时初始化失败,JS调试功能已失效(其他功能依旧可用)。\n请尝试彻底退出Chrome (cmd + Q) 并在命令行重新运行debug');
      });
    });
  }

  remove (channelId) {
    const terminal = this.runtimeTerminalMap[channelId];
    if (terminal) {
      terminal.websocket.close();
      delete this.runtimeTerminalMap[channelId];
    }
    else {
      console.error('try to remove a non-exist runtime');
    }
  }

  has (channelId) {
    return this.runtimeTerminalMap[channelId];
  }
}
module.exports = new RuntimeManager();
