/**
 * Created by godsong on 16/6/26.
 */
const Emitter = require('events').EventEmitter;

class DeviceManager extends Emitter {
  constructor () {
    super();
    this.deviceMap = {};
  }

  registerDevice (device, channelId) {
    const existed = this.deviceMap[channelId];
    if (existed) {
      clearTimeout(existed.timer);
      if (existed.deviceId !== device.deviceId) {
        console.error('This channel already exists a different device!');
      }
      return false;
    }
    else {
      device.channelId = channelId;
      this.deviceMap[channelId] = device;
      return device;
    }
  }

  removeDevice (channelId, callback) {
    const device = this.deviceMap[channelId];
    if (device) {
      clearTimeout(device.timer);
      device.timer = setTimeout(() => {
        delete this.deviceMap[channelId];
        callback();
      }, 5000);
    }
    return device;
  }

  getDevice (channelId) {
    return this.deviceMap[channelId];
  }

  getDeviceList () {
    return Object.keys(this.deviceMap).map((key) => this.deviceMap[key]);
  }

}

module.exports = new DeviceManager();

