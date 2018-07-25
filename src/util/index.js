const URL = require("url");
const queryParser = require("querystring");
const crypto = require("./crypto");
const env = require("./env");
const hook = require("./hook");
const launcher = require("./launcher");
const logger = require("./logger");
const request = require("./request");
const simrun = require("./simrun");
const wrapper = require("./wrapper");
const simulator = require("./simulator");
let connectUrl;

const normalize = remoteurl => {
  const urlObj = URL.parse(remoteurl);
  if (urlObj.query) {
    urlObj.query = queryParser.stringify(queryParser.parse(urlObj.query));
    urlObj.search = "?" + urlObj.query;
  }
  return urlObj.format();
};

const getConnectUrl = channelId => {
  return connectUrl.replace("{channelId}", channelId);
};

const setConnectUrl = url => {
  connectUrl = url;
}

const util = {
  normalize,
  getConnectUrl,
  setConnectUrl
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
