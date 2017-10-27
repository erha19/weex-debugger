/**
 * Created by exolution on 17/3/2.
 */
const WebsocketTerminal = require('mlink').Terminal.WebsocketTerminal;
const url = require('url');
const request = require('../../util/request');
const querystring = require('querystring');
const WebSocket = require('ws');
const config = require('../../lib/config');
const chalk = require('chalk');
const os = require('os');

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
        /**
         * Why has the logic here？
         * open https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
         * see the Troubleshooting of debugger-for-chrome
         * You should kill all chrome process using the below way:
         * Windows:
         * Try to run `TASKKILL /IM chrome.exe /F`
         * Mac:
         * Try to run `pkill Google Chrome`
         * Linux:
         * Try to run `pkill chrome`
         * Ubuntu:
         * Try to run `pkill chromium`
         */
        console.log(`${chalk.yellow('Warning: Js Debug execution environment initialization failed, you can repair with following command:')}\n`);
        switch (os.platform()) {
          case 'darwin':
            console.log(`  ${chalk.yellow('Try to run `pkill Google Chrome`')}`);
            break;
          case 'win32':
            console.log(`  ${chalk.yellow('Try to run `TASKKILL /IM chrome.exe /F`')}`);
            break;
          case 'linux':
            console.log(`  ${chalk.yellow('Try to run `pkill chrome`')}`);
            break;
          default:
            console.log(`  ${chalk.yellow('Try to run `pkill chrome`')}`);
            break;
        }
        console.log(`\n${chalk.red('Note: The command will close all chrome pages, please save your unfinished work')}`);

        reject('Js Debug执行环境初始化失败，参见控制台输出的帮助信息进行修复!');
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
