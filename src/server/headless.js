const puppeteer = require('puppeteer');
let page;
let browser = null;

exports.launchHeadless = async (host, remotePort) => {
  if (!browser) {
    browser = await puppeteer.launch({
      args: [`--remote-debugging-port=${remotePort}`, `--disable-gpu`]
    });
  }
  if (!page) {
    page = await browser.newPage();
  }
  await page.goto(`http://${host}/runtime.html`);
};
exports.closeHeadless = () => {
  browser && browser.close();
  browser = null;
};
