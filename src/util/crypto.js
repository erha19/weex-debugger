const crypto = require('crypto');
const JavaScriptObfuscator = require('javascript-obfuscator');

exports.md5 = function (str) {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

exports.obfuscate = function (code) {
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: true
  });
  return obfuscationResult.getObfuscatedCode();
};
