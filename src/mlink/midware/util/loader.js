/**
 * Created by exolution on 17/2/27.
 */
const fs = require('fs');
const path = require('path');
const Router = require('../src/router');
const Hub = require('../src/hub');
module.exports = function loader (dir, config = {}) {
  require(path.join(dir, config.linkPath || 'link.js'));
  const handlerPath = path.join(dir, config.handlerPath || 'handlers');
  fs.readdirSync(handlerPath).forEach((file) => {
    require(path.join(handlerPath, file));
  });
  Router.check();
  Hub.check();
};
