/**
 * Created by exolution on 17/3/15.
 */
module.exports = {
  bundleDir: 'weex',
  remoteDebugPort: '9223',
  enableHeadless: true,
  getConnectUrl (channelId) {
    return this.connectUrl && this.connectUrl.replace('{channelId}', channelId);
  }
};
