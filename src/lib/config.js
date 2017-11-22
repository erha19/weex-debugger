/**
 * @author erha19
 * @desc some default config of whole project.
 */
module.exports = {
  bundleDir: 'weex',
  remoteDebugPort: '9999',
  enableHeadless: true,
  getConnectUrl (channelId) {
    return this.connectUrl && this.connectUrl.replace('{channelId}', channelId);
  }
};
