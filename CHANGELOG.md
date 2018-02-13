## Changelog
All notable changes to this project will be documented in this file.

### 1.0.6
  - Fix [jira issue](https://issues.apache.org/jira/browse/WEEX-214?focusedCommentId=16359842&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-16359842).
  - Rename `frontend/lib/App.js` to `app.js`.

### 1.0.5
  - Fix [jira issue](https://issues.apache.org/jira/browse/WEEX-214).
  - Upgrade `puppeteer` to `v1.0.0` version.

### 1.0.4
#### Changeed
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
