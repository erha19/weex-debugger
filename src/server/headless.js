const puppeteer = require('puppeteer');
let page;
let browser = null;
const {
  logger
} = require('../util/logger');

exports.launchHeadless = async (host, remotePort) => {
  browser = await puppeteer.launch({
    args: [`--remote-debugging-port=${remotePort}`, `--disable-gpu`]
  });
  logger.verbose(`Headless has been launched`);
  if (!page) {
    page = await browser.newPage();
  }
  await page.goto(`http://${host}/runtime.html`);
  logger.verbose(`Headless page goto http://${host}/runtime.html`);
};
exports.closeHeadless = async () => {
  if (page) {
    await page.goto('about:blank');
  }
  if (browser) {
    await browser.close();
  }
  browser = null;
  logger.verbose(`Cloased headless`);
};
