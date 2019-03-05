const mlink = require('../index')
const config = require('../../config')
const Router = mlink.Router
const { util } = require('../../util')
const debuggerRouter = Router.get('debugger')

debuggerRouter
  .registerHandler(message => {
    let method = message.payload.method
    if (method === 'WxDebug.applyChannelId') {
      const channelId = debuggerRouter.newChannel(config.CHANNELID)
      message.payload = {
        method: 'WxDebug.pushChannelId',
        params: {
          channelId,
          connectUrl: util.getConnectUrl(channelId),
        },
      }
      message.reply()
    } else if (method === 'WMLDebug.applyChannelId') {
      const channelId = debuggerRouter.newChannel(config.CHANNELID)
      message.payload = {
        method: 'WMLDebug.pushChannelId',
        params: {
          channelId,
          connectUrl: util.getWmlConnectUrl(channelId, '_wml_devtool'),
        },
      }
      message.reply()
    } else if (method === 'WxDebug.queryServerVersion') {
      let pkg = require('../../../package.json')
      debuggerRouter.pushMessage('page.entry', {
        method: 'WxDebug.pushServerVersion',
        params: {
          version: pkg.version,
        },
      })
      message.discard()
    }

  })
  .at('page.entry')

setInterval(() => {
  debuggerRouter.pushMessage('page.entry', 'ping')
}, 30000)