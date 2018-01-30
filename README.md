# Weex-debugger

[![Build Status](https://travis-ci.org/erha19/weex-debugger.svg?branch=master)](https://travis-ci.org/erha19/weex-debugger)
[![dependcy](https://david-dm.org/erha19/weex-debugger.svg)](https://david-dm.org/erha19/weex-debugger)
[![dev dependcy](https://david-dm.org/erha19/weex-debugger/dev-status.svg)](https://david-dm.org/erha19/weex-debugger?type=dev)

Weex-debugger is a Weex developer tool for debugging weex app with chrome devtool, it's an upgraded version of [weex-devtool](https://github.com/weexteam/weex-devtool).

The weex-debugger works as a debugging server, it cooperates with the inspect modules on [Android](https://github.com/weexteam/weex_devtools_android) and [iOS](https://github.com/weexteam/weex-devtool-iOS) to help user to inspect/debug weex source codes and project.

## New Features

- Added weex performance analysis tools，only supports sdk version higher than 0.17.0.
- Merge debug logs from debugger and inspector.
- Using the server headless provides weex execution environment.
- Support for simple i18n.

## Install
```
$npm install -g weex-toolkit
```
We advise you to use weex-toolkit which will call weex-devtool.

##  usage

``` bash
$ weex debug [options] [vue_file|bundles_dir]
```     
| Options | Description |
| :--- | :--- |
| -v, --version | display version |
| -h, --help | display help |
| -V, --verbose | display logs of debugger server |
| -p, --port [port] | set debugger server port |
| -m, --manual | manual mode,this mode will not auto open chrome |
| -H --host [host] | set the host ip of debugger server |
| --debug | set log level to debug mode |
| --loglevel [loglevel] | set log level silent|error|warn|info|log|debug |
| --remotedebugport | set the remote debug port |
| --min | minimize the jsbundle |
     
#### start debugger
```
$ weex debug
```
his command will start debug server and launch a chrome opening `DeviceList` page.
this page will display a QR code, you can use [Playground](https://weex.apache.org/cn/playground.html) scan it for starting debug or integrate [Weex devtools](#Integrate devtool) into your application.

##### debug with `.vue` file

```
$ weex debugx your_weex.vue
```

This command will compile `your_weex.vue` to `your_weex.js`  and start the debug server as upon command.
`your_weex.js` will be deployed on the server and displayed on the debug page, using another QR code for debugging `your_weex.js` file.


##### start debugger with a directory of vue files

```
$weex debugx your/vue/path  -e index.vue
```

This command will compile each of the files in `your/vue/path` and deploy them on the bundled server with the new file mapped to the path `http://localhost:port/weex/`.

##  How to access devtools in native

  - Android: pls refer to [Weex Devtool Android](https://github.com/weexteam/weex_devtools_android/blob/master/README.md)
  
  - IOS: pls refer to [Weex Devtool IOS](https://github.com/weexteam/weex-devtool-iOS/blob/master/README-zh.md)
  
## Release Note

### [1.0.0] - 2018-1-18
#### Added
  - Added weex performance analysis tools，only supports latest weex devtool sdk.
  - Merge debug logs from debugger and inspector.
  - Using the server headless provides weex execution environment.
  - Support for simple i18n.
#### Removed
  - Remove useless dependencise for weex compiling.
  - Remove some useless tags of devtool.
#### Changed
  - Upgrade `weex-builder` to support latest weex sdk.
  - More beautiful debugging interface and more simple interaction.
#### Fixed
  - Fix JSdebug environment initialization failed issue.
  - Fix some models frequently disconnected problem.
  - Fix the problem that playground debugging can not be hot updated,[issue 100](https://github.com/weexteam/weex-devtool/issues/100). 
