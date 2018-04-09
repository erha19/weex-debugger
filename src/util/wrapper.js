const bundleWrapper = (code, sourceUrl) => {
  const injectedGlobals = [
    // ES
    'Promise',
    // W3C
    'window',
    'weex',
    'service',
    'Rax',
    'services',
    'global',
    'screen',
    'document',
    'navigator',
    'location',
    'fetch',
    'Headers',
    'Response',
    'Request',
    'URL',
    'URLSearchParams',
    'setTimeout',
    'clearTimeout',
    'setInterval',
    'clearInterval',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'alert',
    // ModuleJS
    'define',
    'require',
    // Weex
    'bootstrap',
    'register',
    'render',
    '__d',
    '__r',
    '__DEV__',
    '__weex_define__',
    '__weex_require__',
    '__weex_viewmodel__',
    '__weex_document__',
    '__weex_bootstrap__',
    '__weex_options__',
    '__weex_data__',
    '__weex_downgrade__',
    '__weex_require_module__',
    'Vue'

  ];
  const bundlewrapper = 'function __weex_bundle_entry__(' + injectedGlobals.join(',') + '){';
  const rearRegexp = /\/\/#\s*sourceMappingURL(?!.*?\s+.)|$/;
  const match = /^\s*(\/\/.+)\n/.exec(code);
  let anno = '';
  if (match) {
    anno = '$$frameworkFlag["' + (sourceUrl || '@') + '"]="' + match[1].replace(/"/g, '\\"') + '";';
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

module.exports = {
  bundleWrapper,
  apiWrapper
};
