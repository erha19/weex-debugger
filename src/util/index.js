const URL = require("url");
const queryParser = require("querystring");
const crypto = require("./crypto");
const env = require("./env");
const {hook} = require("./hook");
const launcher = require("./launcher");
const logger = require("./logger");
const request = require("./request");
const simrun = require("./simrun");
const wrapper = require("./wrapper");
const simulator = require("./simulator");

const normalize = remoteurl => {
  const urlObj = URL.parse(remoteurl);
  if (urlObj.query) {
    urlObj.query = queryParser.stringify(queryParser.parse(urlObj.query));
    urlObj.search = "?" + urlObj.query;
  }
  return urlObj.format();
};

const getConnectUrl = channelId => {
  return this.connectUrl && this.connectUrl.replace("{channelId}", channelId);
};

const util = {
  normalize,
  getConnectUrl
};

module.exports = {
  util,
  crypto,
  env,
  hook,
  launcher,
  logger,
  request,
  simrun,
  wrapper,
  simulator
};
