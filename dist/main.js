/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ \"./src/js/modules/ui.js\");\n/* harmony import */ var _modules_themeLS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/themeLS */ \"./src/js/modules/themeLS.js\");\n\n\n\nconst ui = new _modules_ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst themeLS = new _modules_themeLS__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\ndocument.getElementById('theme-toggle').addEventListener('click', () => {\n  ui.useThemeSwitch();\n});\n\nwindow.onload = () => {\n  themeLS.loadThemeStorage();\n  themeLS.loadToggle();\n  ui.setBackgroundImage();\n};\n\nwindow.addEventListener('resize', () => {\n  ui.setBackgroundImage();\n});\n\n// Check if theme is changed\nconst targetNode = document.documentElement;\nconst observer = new MutationObserver((mutations) => {\n  mutations.forEach((mutation) => {\n    if (\n      mutation.type === 'attributes' &&\n      mutation.attributeName === 'class' &&\n      mutation.target === targetNode\n    ) {\n      ui.setBackgroundImage();\n    }\n  });\n});\nconst config = { attributes: true, childList: false, subtree: false };\nobserver.observe(targetNode, config);\n\n\n//# sourceURL=webpack://todo-app/./src/js/index.js?");

/***/ }),

/***/ "./src/js/modules/themeLS.js":
/*!***********************************!*\
  !*** ./src/js/modules/themeLS.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ThemeLocalStorage)\n/* harmony export */ });\n/* eslint-disable class-methods-use-this */\nclass ThemeLocalStorage {\n  loadThemeStorage() {\n    ThemeLocalStorage.setTheme();\n  }\n\n  loadToggle() {\n    ThemeLocalStorage.setToggle();\n  }\n\n  storeTheme(theme) {\n    localStorage.setItem('theme', theme);\n  }\n\n  storeToggle(toggleObj) {\n    localStorage.setItem('toggle', toggleObj);\n  }\n\n  static setTheme() {\n    const activeTheme = localStorage.getItem('theme');\n    document.documentElement.className = activeTheme;\n  }\n\n  static setToggle() {\n    const toggleBtn = document.getElementById('theme-toggle');\n    const toggleObjStr = localStorage.getItem('toggle');\n    const toggleObj = JSON.parse(toggleObjStr);\n    toggleBtn.src = toggleObj.src;\n    toggleBtn.setAttribute('alt', toggleObj.alt);\n    toggleBtn.dataset.theme = toggleObj.theme;\n  }\n}\n\n\n//# sourceURL=webpack://todo-app/./src/js/modules/themeLS.js?");

/***/ }),

/***/ "./src/js/modules/ui.js":
/*!******************************!*\
  !*** ./src/js/modules/ui.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _themeLS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themeLS */ \"./src/js/modules/themeLS.js\");\n/* eslint-disable class-methods-use-this */\n\n\nconst themeLS = new _themeLS__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nclass UI {\n  useThemeSwitch() {\n    const toggle = document.getElementById('theme-toggle');\n    const { theme } = toggle.dataset;\n\n    if (theme === 'dark') {\n      toggle.src = './assets/icon-sun.svg';\n      toggle.dataset.theme = 'light';\n      toggle.setAttribute('alt', 'Toggle Light Mode');\n\n      themeLS.storeTheme('dark');\n      themeLS.loadThemeStorage();\n\n      const toggleObj = {\n        src: './assets/icon-sun.svg',\n        theme: 'light',\n        alt: 'Toggle Light Mode',\n      };\n      const toggleObjStr = JSON.stringify(toggleObj);\n      themeLS.storeToggle(toggleObjStr);\n      themeLS.loadToggle();\n    } else if (theme === 'light') {\n      toggle.src = './assets/icon-moon.svg';\n      toggle.dataset.theme = 'dark';\n      toggle.setAttribute('alt', 'Toggle Dark Mode');\n\n      themeLS.storeTheme('light');\n      themeLS.loadThemeStorage();\n\n      const toggleObj = {\n        src: './assets/icon-moon.svg',\n        theme: 'dark',\n        alt: 'Toggle Dark Mode',\n      };\n      const toggleObjStr = JSON.stringify(toggleObj);\n      themeLS.storeToggle(toggleObjStr);\n      themeLS.loadToggle();\n    }\n  }\n\n  setBackgroundImage() {\n    const main = document.querySelector('main');\n    if (document.documentElement.className === 'light') {\n      if (window.innerWidth <= 500) {\n        // Mobile\n        main.style.backgroundImage = 'url(./assets/bg-mobile-light.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      } else {\n        // Desktop\n        main.style.backgroundImage = 'url(./assets/bg-desktop-light.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      }\n    } else if (document.documentElement.className === 'dark') {\n      if (window.innerWidth <= 500) {\n        // Mobile\n        main.style.backgroundImage = 'url(./assets/bg-mobile-dark.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      } else {\n        // Desktop\n        main.style.backgroundImage = 'url(./assets/bg-desktop-dark.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://todo-app/./src/js/modules/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;