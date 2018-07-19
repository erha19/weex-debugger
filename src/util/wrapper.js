const queryParser = require('querystring');
const url = require('url');
const path = require('path');
const fse = require('fs-extra');
const normalize = (remoteurl) => {
  const urlObj = url.parse(remoteurl);
  if (urlObj.query) {
    urlObj.query = queryParser.stringify(queryParser.parse(urlObj.query));
    urlObj.search = '?' + urlObj.query;
  }
  return urlObj.format();
};
const bundleWrapper = (code, sourceUrl) => {
  const injectedGlobals = [
    // ES
    'Promise',
    // W3C
    'window', 'weex', 'service', 'Rax', 'services', 'global', 'screen', 'document', 'navigator', 'location', 'fetch', 'Headers', 'Response', 'Request', 'URL', 'URLSearchParams', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'alert',
    // ModuleJS
    'define', 'require',
    // Weex
    'bootstrap', 'register', 'render', '__d', '__r', '__DEV__', '__weex_define__', '__weex_require__', '__weex_viewmodel__', '__weex_document__', '__weex_bootstrap__', '__weex_options__', '__weex_data__', '__weex_downgrade__', '__weex_require_module__', 'Vue'
  ];
  const bundlewrapper = 'function __weex_bundle_entry__(' + injectedGlobals.join(',') + '){';
  const rearRegexp = /\/\/#\s*sourceMappingURL(?!.*?\s+.)|$/;
  const match = /^\/\/\s?{\s?"framework"\s?:\s?"(\w+)"\s?}/.exec(code);
  let anno = '';
  if (match) {
    anno = '$$frameworkFlag["' + (sourceUrl || '@') + '"]="' + match[1] + '"\n';
  }
  return anno + bundlewrapper + code.replace(rearRegexp, '}\n$&');
};
const apiWrapper = (code) => {
  const apiWrapper = `function __weex_api_entry__(global){
  for(var prop in global) {
    if (global.hasOwnProperty(prop))
    this[prop] = global[prop]
  }
  ${code}
}`;
  return apiWrapper;
};
const transformUrlToLocalUrl = (sourceURl) => {
  const rHttpHeader = /^(https?|taobao|qap):\/\/(?!.*your_current_ip)/i;
  let bundleUrl;
  if (rHttpHeader.test(sourceURl)) {
    const query = queryParser.parse(Url.parse(sourceURl).query);
    if (query['_wx_tpl']) {
      bundleUrl = normalize(query['_wx_tpl']).replace(rHttpHeader, '');
    } else {
      bundleUrl = normalize(sourceURl).replace(rHttpHeader, '');
    }
  } else {
    bundleUrl = sourceURl.replace(/^(https?|taobao|qap):\/\/(.*your_current_ip):(\d+)\//i, 'file://');
  }
  if (bundleUrl.charAt(bundleUrl.length - 1) === '?') {
    bundleUrl = bundleUrl.substring(0, bundleUrl.length - 1);
  }
  if (bundleUrl.charAt(bundleUrl.length - 1) === '?') {
    bundleUrl = bundleUrl.substring(0, bundleUrl.length - 1);
  }
  return '/source/' + bundleUrl;
};


const generateWorkerEntry = (env) => {
  const worker = fse.readFileSync(path.join(__dirname, 'worker.js'));
  let environment = `// mock timer
var __cachedSetTimeout__ = this.setTimeout;
Object.defineProperty(this, 'setTimeout', {
  get: function () {
    return __cachedSetTimeout__;
  },
  set: function () {}
});
var __cachedSetInterval__ = this.setInterval;
Object.defineProperty(this, 'setInterval', {
  get: function () {
    return __cachedSetInterval__;
  },
  set: function () {}
});
var __cachedClearTimeout__ = this.clearTimeout;
Object.defineProperty(this, 'clearTimeout', {
  get: function () {
    return __cachedClearTimeout__;
  },
  set: function () {}
});
var __cachedClearInterval__ = this.clearInterval;
Object.defineProperty(this, 'clearInterval', {
  get: function () {
    return __cachedClearInterval__;
  },
  set: function () {}
});

// weex environment
`;
  if(env.jsframework) {
    environment += `importScripts('${env.jsframework}');\n`
    // environment += `importScripts('/lib/runtime/js-framework.js');\n`
  }
  if(env.importScripts && env.importScripts.length > 0) {
    env.importScripts.forEach(script => {
      environment += `importScripts('${script}');\n`
    })
  }
  return  `
${environment}
${worker}
  `
}

const pickDomain = (str) => {
  if (/file:\/\/\//.test(str)) {
    return 'local'
  } 
  if (/http(s)?/.test(str)) {
    return url.parse(str).hostname
  }
}

module.exports = {
  bundleWrapper,
  apiWrapper,
  transformUrlToLocalUrl,
  generateWorkerEntry,
  pickDomain
};
