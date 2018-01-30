## Changelog
All notable changes to this project will be documented in this file.


### 1.0.1
#### Changed
  - Fix issues [weex-toolkit/issues/265](https://github.com/weexteam/weex-toolkit/issues/265).
  - Fix wrong release version on the page.
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
