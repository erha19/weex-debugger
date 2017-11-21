// { "framework": "Vue" }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []
	
	/* styles */
	__vue_styles__.push(__webpack_require__(1)
	)
	
	/* script */
	__vue_exports__ = __webpack_require__(2)
	
	/* template */
	var __vue_template__ = __webpack_require__(3)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/kw/github/weex-debugger/test/index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-10ef6a18"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}
	
	module.exports = __vue_exports__
	module.exports.el = 'true'
	new Vue(module.exports)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = {
	  "panel": {
	    "width": 600,
	    "height": 250,
	    "marginLeft": 75,
	    "marginTop": 35,
	    "marginBottom": 35,
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "borderWidth": 2,
	    "borderStyle": "solid",
	    "borderColor": "rgb(162,217,192)",
	    "backgroundColor": "rgba(162,217,192,0.2)"
	  },
	  "text": {
	    "fontSize": 50,
	    "textAlign": "center",
	    "color": "#41B883"
	  }
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var modal = weex.requireModule('modal');
	var LOADMORE_COUNT = 4;
	exports.default = {
	  data: function data() {
	    return {
	      lists: [1, 2, 3, 4, 5]
	    };
	  },
	
	  methods: {
	    fetch: function fetch(event) {
	      var _this = this;
	
	      modal.toast({ message: 'loadmore', duration: 1 });
	      setTimeout(function () {
	        var length = _this.lists.length;
	        for (var i = length; i < length + LOADMORE_COUNT; ++i) {
	          _this.lists.push(i + 1);
	        }
	      }, 800);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('list', {
	    staticClass: ["list"],
	    attrs: {
	      "loadmoreoffset": "10"
	    },
	    on: {
	      "loadmore": _vm.fetch
	    }
	  }, _vm._l((_vm.lists), function(num) {
	    return _c('cell', {
	      staticClass: ["cell"],
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_c('div', {
	      staticClass: ["panel"]
	    }, [_c('text', {
	      staticClass: ["text"]
	    }, [_vm._v(_vm._s(num))])])])
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzAzZWEzN2U5YzExYTQzMDIzNDg/Iiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXgudnVlPyIsIndlYnBhY2s6Ly8vLi90ZXN0L2luZGV4LnZ1ZT8uL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zdHlsZS1sb2FkZXIuanMhLi9+L3dlZXgtYnVpbGRlci9+L3dlZXgtdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTM2ZDBmYWJhIS4vfi93ZWV4LWJ1aWxkZXIvfi93ZWV4LXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC52dWU/Li9+L3dlZXgtYnVpbGRlci9+L3dlZXgtdnVlLWxvYWRlci9saWIvc2NyaXB0LWxvYWRlci5qcyEuL34vd2VleC1idWlsZGVyL34vYmFiZWwtbG9hZGVyL2xpYiEuL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXNjcmlwdCZpbmRleD0wIiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXgudnVlPy4vfi93ZWV4LWJ1aWxkZXIvfi93ZWV4LXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi0zNmQwZmFiYSEuL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsbURBQW1ELElBQUk7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQSw2QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7OztBQ3RDQSxpQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNILEVBQUM7QUFDRCwyQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMwM2VhMzdlOWMxMWE0MzAyMzQ4IiwidmFyIF9fdnVlX2V4cG9ydHNfXywgX192dWVfb3B0aW9uc19fXG52YXIgX192dWVfc3R5bGVzX18gPSBbXVxuXG4vKiBzdHlsZXMgKi9cbl9fdnVlX3N0eWxlc19fLnB1c2gocmVxdWlyZShcIiEhd2VleC12dWUtbG9hZGVyL2xpYi9zdHlsZS1sb2FkZXIhd2VleC12dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlcj9pZD1kYXRhLXYtMzZkMGZhYmEhd2VleC12dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIpXG4pXG5cbi8qIHNjcmlwdCAqL1xuX192dWVfZXhwb3J0c19fID0gcmVxdWlyZShcIiEhd2VleC12dWUtbG9hZGVyL2xpYi9zY3JpcHQtbG9hZGVyIWJhYmVsLWxvYWRlciF3ZWV4LXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9pbmRleC52dWVcIilcblxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhd2VleC12dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtMzZkMGZhYmEhd2VleC12dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9pbmRleC52dWVcIilcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXyB8fCB7fVxuaWYgKFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwib2JqZWN0XCIgfHxcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCJcbikge1xuaWYgKE9iamVjdC5rZXlzKF9fdnVlX2V4cG9ydHNfXykuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCIgfSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuX192dWVfb3B0aW9uc19fLl9fZmlsZSA9IFwiL1VzZXJzL2t3L2dpdGh1Yi93ZWV4LWRlYnVnZ2VyL3Rlc3QvaW5kZXgudnVlXCJcbl9fdnVlX29wdGlvbnNfXy5yZW5kZXIgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnJlbmRlclxuX192dWVfb3B0aW9uc19fLnN0YXRpY1JlbmRlckZucyA9IF9fdnVlX3RlbXBsYXRlX18uc3RhdGljUmVuZGVyRm5zXG5fX3Z1ZV9vcHRpb25zX18uX3Njb3BlSWQgPSBcImRhdGEtdi0xMGVmNmExOFwiXG5fX3Z1ZV9vcHRpb25zX18uc3R5bGUgPSBfX3Z1ZV9vcHRpb25zX18uc3R5bGUgfHwge31cbl9fdnVlX3N0eWxlc19fLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICBmb3IgKHZhciBuYW1lIGluIG1vZHVsZSkge1xuICAgIF9fdnVlX29wdGlvbnNfXy5zdHlsZVtuYW1lXSA9IG1vZHVsZVtuYW1lXVxuICB9XG59KVxuaWYgKHR5cGVvZiBfX3JlZ2lzdGVyX3N0YXRpY19zdHlsZXNfXyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIF9fcmVnaXN0ZXJfc3RhdGljX3N0eWxlc19fKF9fdnVlX29wdGlvbnNfXy5fc2NvcGVJZCwgX192dWVfc3R5bGVzX18pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gX192dWVfZXhwb3J0c19fXG5tb2R1bGUuZXhwb3J0cy5lbCA9ICd0cnVlJ1xubmV3IFZ1ZShtb2R1bGUuZXhwb3J0cylcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVzdC9pbmRleC52dWU/ZW50cnk9dHJ1ZVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJwYW5lbFwiOiB7XG4gICAgXCJ3aWR0aFwiOiA2MDAsXG4gICAgXCJoZWlnaHRcIjogMjUwLFxuICAgIFwibWFyZ2luTGVmdFwiOiA3NSxcbiAgICBcIm1hcmdpblRvcFwiOiAzNSxcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiAzNSxcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJib3JkZXJXaWR0aFwiOiAyLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyQ29sb3JcIjogXCJyZ2IoMTYyLDIxNywxOTIpXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDE2MiwyMTcsMTkyLDAuMilcIlxuICB9LFxuICBcInRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogNTAsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzQxQjg4M1wiXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zdHlsZS1sb2FkZXIuanMhLi9+L3dlZXgtYnVpbGRlci9+L3dlZXgtdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTM2ZDBmYWJhIS4vfi93ZWV4LWJ1aWxkZXIvfi93ZWV4LXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG5cbnZhciBtb2RhbCA9IHdlZXgucmVxdWlyZU1vZHVsZSgnbW9kYWwnKTtcbnZhciBMT0FETU9SRV9DT1VOVCA9IDQ7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpc3RzOiBbMSwgMiwgMywgNCwgNV1cbiAgICB9O1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIG1vZGFsLnRvYXN0KHsgbWVzc2FnZTogJ2xvYWRtb3JlJywgZHVyYXRpb246IDEgfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IF90aGlzLmxpc3RzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGxlbmd0aDsgaSA8IGxlbmd0aCArIExPQURNT1JFX0NPVU5UOyArK2kpIHtcbiAgICAgICAgICBfdGhpcy5saXN0cy5wdXNoKGkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfSwgODAwKTtcbiAgICB9XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zY3JpcHQtbG9hZGVyLmpzIS4vfi93ZWV4LWJ1aWxkZXIvfi9iYWJlbC1sb2FkZXIvbGliIS4vfi93ZWV4LWJ1aWxkZXIvfi93ZWV4LXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c2NyaXB0JmluZGV4PTAhLi90ZXN0L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2xpc3QnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFtcImxpc3RcIl0sXG4gICAgYXR0cnM6IHtcbiAgICAgIFwibG9hZG1vcmVvZmZzZXRcIjogXCIxMFwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJsb2FkbW9yZVwiOiBfdm0uZmV0Y2hcbiAgICB9XG4gIH0sIF92bS5fbCgoX3ZtLmxpc3RzKSwgZnVuY3Rpb24obnVtKSB7XG4gICAgcmV0dXJuIF9jKCdjZWxsJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFtcImNlbGxcIl0sXG4gICAgICBhcHBlbmRBc1RyZWU6IHRydWUsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcImFwcGVuZFwiOiBcInRyZWVcIlxuICAgICAgfVxuICAgIH0sIFtfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFtcInBhbmVsXCJdXG4gICAgfSwgW19jKCd0ZXh0Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFtcInRleHRcIl1cbiAgICB9LCBbX3ZtLl92KF92bS5fcyhudW0pKV0pXSldKVxuICB9KSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93ZWV4LWJ1aWxkZXIvfi93ZWV4LXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi0zNmQwZmFiYSEuL34vd2VleC1idWlsZGVyL34vd2VleC12dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXN0L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9