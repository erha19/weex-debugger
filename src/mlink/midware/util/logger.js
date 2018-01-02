/**
 * Created by exolution on 17/3/27.
 */

let _logLevel = -1;
exports.setLogLevel = function (logLevel) {
  _logLevel = logLevel;
};
exports.LogLevel = {};

['error', 'warn', 'info', 'log', 'debug'].forEach((level, i) => {
  exports[level] = function (...args) {
    if (_logLevel >= i) {
      console[level].apply(console, args);
    }
  };
  exports.LogLevel[level.toUpperCase()] = i;
});
