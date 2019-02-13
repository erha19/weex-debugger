## Changelog
All notable changes to this project will be documented in this file.

### 1.2.7 - 1.2.8
#### Changed
  - Support for WeexSDK v0.20.1.

### 1.2.6
#### Changed
  - Remove useless babel config.

### 1.2.5
#### Changed
  - Fix debug while first connected with android device.

### 1.2.4
#### Changed
  - Protected envrionment variable.

### 1.2.3
#### Changed
  - [Replace opn with chrome-opn to prevent duplicate tabs](https://github.com/weexteam/weex-debugger/pull/32).

### 1.2.2
#### Changed
  - Support specify a unique id for communication channel.

### 1.2.0 - 1.2.1
#### Changed
  - Support for weex playground app v0.19.0.

### 1.1.18 - 1.1.19
#### Fixed
  - Support url include '#'.

### 1.1.17
#### Fixed
  - Fix importscript error while the source response as text/plain.

### 1.1.16
#### Fixed
  - Remove unuseful worker while page reload.

### 1.1.15
#### Fixed
  - Fix JSService debugging.

### 1.1.14
#### Fixed
  - Fix `remoteDebug` not found bug.

### 1.1.13
#### Fixed
  - Fix sync callNative or callJS request queue.
#### Changed
  - Re-use native log again.

### 1.1.12
##### Fixed
  - Fix weexteam/weex-toolkit/issues/439.

### 1.1.10 - 1.1.11
#### Changed
  - Fix host search logic.
  - Support for specifying channelid. 

### 1.1.7 - 1.1.9
##### Changed
  - Fix entry for calling debug api.
  - Remove useless log message.

### 1.1.6
##### Changed
  - Support Embed Component.

### 1.1.5
##### Changed
  - Support RecycleList Component.

### 1.1.4
##### Fixed
  - Fix entry for calling debug api.

### 1.1.3
##### Changed
  - Import Jsservice source util the WxEnvironment has been register.

### 1.1.2
##### Fixed
  - Fix compilation failure of the QRcode.

### 1.1.1
##### Fixed
  - Fix util function missing error.

### 1.1.0
##### Changed
  - Upgrade chrome devtool to version 70.
  - Fix entry error of version 1.0.28.

### 1.0.28
#### Changed
  - Upgrade koa-router to 7.4.0, koa-websocket to 5.0.1, weex-builder to 0.4.0.
#### Fixed
  - Fix builder logic on debugger.

### 1.0.27
#### Changed
  - Mock window.navigator for some environment judgement.

### 1.0.26
#### Changed
  - Refactoring the server system.

### 1.0.25
#### Changed
  - Formate source code.

### 1.0.24
#### Fixed
  - The worker file should not be compile by babel.

### 1.0.23
#### Fixed
  - Fix error of `can not find .xtoolkit/package.json file`.

### 1.0.22
#### Fixed
  - Fix the entry file of debugger command.

### 1.0.21
### Changed
  - Update tool version on frontend.

### 1.0.20
#### Changed
  - Improve the debugging logic of weex in the sandbox debugging environment.

### 1.0.19
#### Fixed
  - Protect the parameters passed to native.
  
### 1.0.18
#### Fixed
  - Avoiding the structure of comments in the last line causes `}` to be annotated.
#### Changed
  - Add mannul api expose for npm useage.
  
### 1.0.17
#### Changed
  - Turning off display of client log information due to [issue 408](https://github.com/weexteam/weex-toolkit/issues/408).

### 1.0.16
#### Changed
  - Support for the weex v0.19.0.

### 1.0.15
#### Fixed
  - Remove the local reference to JS FRAMEWORK.

### 1.0.14
#### Fixed
  - Suprrot JS FRAMEWORK 0.26.0+.

### 1.0.13
#### Fixed
  - Fixed the application screencast.
  - Fixed the filter of device log.
#### Changed
  - Remove simulator debugger.

### 1.0.12
#### Fixed
  - Fixed issue https://github.com/weexteam/weex-toolkit/issues/265.

### 1.0.11
#### Fixed
  - Fixed [weex-toolkit/issues/265](https://github.com/weexteam/weex-toolkit/issues/265#issuecomment-385626763)

### 1.0.11
#### Fixed
  - Fixed [weex-toolkit/issues/366](https://github.com/weexteam/weex-toolkit/issues/366)
#### Changed
  - Remove useless `callNative` log.

### 1.0.10
#### Changed
  - Support debugger on muticontext.
  - Remove useless log while using Js Debbug.

### 1.0.9
#### Changed
  - Disable clearlog method on Runtime progress.

### 1.0.8
#### Changed
  - Support debugger on weexSDK v0.18.+ (add sandbox feature).
#### Fixed
  - Fixed [issues 355](https://github.com/weexteam/weex-toolkit/issues/355).

### 1.0.7
#### Changed
  - Formate time for logger.
  - Add 'content-type' for the http respense.
#### Fixed
  - Fix bug that playground app can't open remote url while using JSdebug, remove '?' while it is the last char.
  - Add native log from `weex-devtool` into console.

### 1.0.6
#### Changed
  - Rename `frontend/lib/App.js` to `app.js`.
#### Fixed
  - Fix [jira issue](https://issues.apache.org/jira/browse/WEEX-214?focusedCommentId=16359842&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-16359842)

### 1.0.5
#### Changed
  - Fix [jira issue](https://issues.apache.org/jira/browse/WEEX-214).
  - Upgrade `puppeteer` to `v1.0.0` version.
#### Fixed
  - Fix [jira issue](https://issues.apache.org/jira/browse/WEEX-214).

### 1.0.4
#### Changed
  - Add iconfont support for frontend.
  - Optimized interface display of debugger page.
#### Removed
  - Remove useless source on `frontend/assets`.

### 1.0.3
#### Fixed
  - Fix less/sass etc loader compile error. [commit/346f7c](https://github.com/weexteam/weex-builder/commit/346f7c37b0032f17b023d80c9e15306764484d23)
#### Changed
  - Set default compile mode to vue|we. [commit/50f8bf](https://github.com/weexteam/weex-builder/commit/50f8bf13a6c914dd89b9728ef470a985b640e81a)

### 1.0.2
#### Fixed
  - Fix issue [weex-toolkit/issues/277](https://github.com/weexteam/weex-toolkit/issues/277)

### 1.0.1
#### Fixed
  - Fix issue [weex-toolkit/issues/265](https://github.com/weexteam/weex-toolkit/issues/265).
  - Fix wrong release version on the page.
#### Added
  - Support multi-terminal debugging mode, you can open multiple debugger services in the command line.

### 1.0.0
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
