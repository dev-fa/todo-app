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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ \"./src/js/modules/ui.js\");\n/* harmony import */ var _modules_themeLS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/themeLS */ \"./src/js/modules/themeLS.js\");\n/* harmony import */ var _modules_todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/todo */ \"./src/js/modules/todo.js\");\n\n\n\n\n(function main() {\n  const ui = new _modules_ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const themeLS = new _modules_themeLS__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  const todo = new _modules_todo__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n  document.getElementById('theme-toggle').addEventListener('click', () => {\n    ui.useThemeSwitch();\n  });\n\n  window.onload = () => {\n    themeLS.loadThemeStorage();\n    themeLS.loadToggle();\n    ui.setBackgroundImage();\n    ui.setWidgetBottom();\n    todo.load();\n  };\n\n  window.addEventListener('resize', () => {\n    ui.setBackgroundImage();\n    ui.setWidgetBottom();\n    todo.checkWidgetBottom();\n  });\n\n  // Check if theme is changed\n  const targetNode = document.documentElement;\n  const observer = new MutationObserver((mutations) => {\n    mutations.forEach((mutation) => {\n      if (\n        mutation.type === 'attributes' &&\n        mutation.attributeName === 'class' &&\n        mutation.target === targetNode\n      ) {\n        ui.setBackgroundImage();\n      }\n    });\n  });\n  const config = { attributes: true, childList: false, subtree: false };\n  observer.observe(targetNode, config);\n})();\n\n\n//# sourceURL=webpack://todo-app/./src/js/index.js?");

/***/ }),

/***/ "./src/js/modules/themeLS.js":
/*!***********************************!*\
  !*** ./src/js/modules/themeLS.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ThemeLocalStorage)\n/* harmony export */ });\n/* eslint-disable class-methods-use-this */\nclass ThemeLocalStorage {\n  loadThemeStorage() {\n    ThemeLocalStorage.setTheme();\n  }\n\n  loadToggle() {\n    ThemeLocalStorage.setToggle();\n  }\n\n  storeTheme(theme) {\n    localStorage.setItem('theme', theme);\n  }\n\n  storeToggle(toggleObj) {\n    localStorage.setItem('toggle', toggleObj);\n  }\n\n  static setTheme() {\n    const activeTheme = localStorage.getItem('theme');\n    document.documentElement.className = activeTheme;\n  }\n\n  static setToggle() {\n    const toggleBtn = document.getElementById('theme-toggle');\n    const toggleObjStr = localStorage.getItem('toggle');\n    const toggleObj = JSON.parse(toggleObjStr);\n    toggleBtn.src = toggleObj.src;\n    toggleBtn.setAttribute('alt', toggleObj.alt);\n    toggleBtn.dataset.theme = toggleObj.theme;\n  }\n}\n\n\n//# sourceURL=webpack://todo-app/./src/js/modules/themeLS.js?");

/***/ }),

/***/ "./src/js/modules/todo.js":
/*!********************************!*\
  !*** ./src/js/modules/todo.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./src/js/modules/ui.js\");\n\n\nconst ui = new _ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n/* eslint-disable class-methods-use-this */\nclass Todo {\n  static newTodoForm = document.querySelector('[data-new-todo-form]');\n\n  static newTodoInput = document.querySelector('[data-new-todo-input');\n\n  static todoContainer = document.getElementById('todo-main');\n\n  static todoList = [\n    { text: 'Opened the app for the first time', completed: true, id: '0' },\n    { text: 'Make your first todo', completed: false, id: '1' },\n    { text: 'Complete your first todo', completed: false, id: '2' },\n    { text: 'Delete your first todo', completed: false, id: '3' },\n    { text: \"Drag your todo's around\", completed: false, id: '4' },\n    { text: 'Star the projects github repository!', completed: false, id: '5' },\n  ];\n\n  // Initial page load function\n  load() {\n    Todo.renderAll();\n    Todo.setCounter();\n    Todo.setTodo();\n    Todo.setCheckButton();\n    Todo.setDeleteButton();\n    Todo.setClearCompleted();\n    ui.makeTodoDraggable();\n  }\n\n  // Re-add event listener\n  checkWidgetBottom() {\n    Todo.setClearCompleted();\n  }\n\n  // Add event listeners\n\n  static setTodo() {\n    Todo.newTodoForm.addEventListener('submit', (e) => {\n      e.preventDefault();\n      if (\n        !(Todo.newTodoInput.value == null || Todo.newTodoInput.value === '')\n      ) {\n        Todo.addNewTask(Todo.newTodoInput.value);\n        // eslint-disable-next-line no-unused-expressions\n        Todo.newTodoInput.value = null;\n        Todo.renderAll();\n        Todo.setCounter();\n        ui.makeTodoDraggable();\n      }\n    });\n  }\n\n  static setCheckButton() {\n    Todo.todoContainer.addEventListener('click', (e) => {\n      if (\n        e.target.className === 'btn-todo' ||\n        e.target.className === 'btn-todo--checked'\n      ) {\n        const button = e.target;\n        Todo.checkTodo(button);\n      }\n    });\n  }\n\n  static setDeleteButton() {\n    Todo.todoContainer.addEventListener('click', (e) => {\n      if (e.target.className === 'btn-delete') {\n        const todoBox = e.target.parentElement;\n        const todoBoxId = todoBox.dataset.id;\n        Todo.deleteTodo(todoBoxId);\n        Todo.renderAll();\n        Todo.setCounter();\n        ui.makeTodoDraggable();\n      }\n    });\n  }\n\n  static setClearCompleted() {\n    const clearCompletedButton = document.getElementById('clear-completed');\n    clearCompletedButton.addEventListener('click', () => {\n      Todo.deleteCompleted();\n      Todo.renderAll();\n      Todo.setCounter();\n      ui.makeTodoDraggable();\n    });\n  }\n\n  // Utility functions\n\n  static clearElement(element) {\n    while (element.firstChild) {\n      element.removeChild(element.firstChild);\n    }\n  }\n\n  static generateId() {\n    return Date.now().toString();\n  }\n\n  // Todo widget functions\n\n  static addNewTask(todoName) {\n    const id = Todo.generateId();\n    Todo.todoList.push({ text: todoName, completed: false, id });\n  }\n\n  static renderAll() {\n    Todo.clearElement(Todo.todoContainer);\n    Todo.todoList.forEach((todo) => {\n      const newTodo = document.createElement('div');\n      newTodo.classList.add('todo-box', 'draggable');\n      newTodo.setAttribute('draggable', 'true');\n      newTodo.setAttribute('data-id', todo.id);\n      if (todo.completed) {\n        newTodo.innerHTML = `\n          <div class=\"todo-box__main\">\n          <p class=\"todo-box__text--disabled\">${todo.text}</p>\n          <div class=\"btn-todo-wrapper\">\n              <button type=\"button\" aria-label=\"Mark as incomplete\" class=\"btn-todo--checked\">\n                <img src=\"./assets/icon-check.svg\" alt=\"checked\">\n              </button>\n          </div>\n          </div>\n          <img src=\"./assets/icon-cross.svg\" alt=\"Delete todo\" class=\"btn-delete\">\n        `;\n        Todo.todoContainer.appendChild(newTodo);\n      } else {\n        newTodo.innerHTML = `\n            <div class=\"todo-box__main\">\n            <p class=\"todo-box__text\">${todo.text}</p>\n            <div class=\"btn-todo-wrapper\">\n                <button type=\"button\" aria-label=\"Mark as complete\" class=\"btn-todo\"></button>\n            </div>\n            </div>\n            <img src=\"./assets/icon-cross.svg\" alt=\"Delete todo\" class=\"btn-delete\">\n        `;\n        Todo.todoContainer.appendChild(newTodo);\n      }\n    });\n  }\n\n  static setCounter() {\n    const total = document.getElementById('todo-total');\n\n    const totalValue = Todo.todoList.reduce((accumulator, todo) => {\n      if (!todo.completed) {\n        // eslint-disable-next-line no-param-reassign\n        accumulator += 1;\n        return accumulator;\n      }\n      return accumulator;\n    }, 0);\n\n    total.textContent = totalValue;\n  }\n\n  static checkTodo(button) {\n    const todoBox = button.parentElement.parentElement.parentElement;\n    const buttonContainer = button.parentElement.parentElement;\n    const todoText = buttonContainer.querySelector('p');\n\n    if (button.className === 'btn-todo') {\n      button.classList.remove('btn-todo');\n      button.classList.add('btn-todo--checked');\n      const checkMark = document.createElement('img');\n      checkMark.src = './assets/icon-check.svg';\n      checkMark.setAttribute('alt', 'checked');\n      button.appendChild(checkMark);\n      todoText.classList.remove('todo-box__text');\n      todoText.classList.add('todo-box__text--disabled');\n      Todo.setCompletion(todoBox.dataset.id, true);\n    } else {\n      button.classList.remove('btn-todo--checked');\n      button.classList.add('btn-todo');\n      const checkMark = button.querySelector('img');\n      button.removeChild(checkMark);\n      todoText.classList.remove('todo-box__text--disabled');\n      todoText.classList.add('todo-box__text');\n      Todo.setCompletion(todoBox.dataset.id, false);\n    }\n  }\n\n  static setCompletion(id, checked) {\n    Todo.todoList.forEach((todoObj) => {\n      if (todoObj.id === id) {\n        // eslint-disable-next-line no-param-reassign\n        todoObj.completed = checked;\n      }\n    });\n    Todo.setCounter();\n  }\n\n  static deleteTodo(id) {\n    Todo.todoList = Todo.todoList.filter((todo) => todo.id !== id);\n  }\n\n  static deleteCompleted() {\n    Todo.todoList = Todo.todoList.filter((todo) => !todo.completed);\n  }\n}\n\n\n//# sourceURL=webpack://todo-app/./src/js/modules/todo.js?");

/***/ }),

/***/ "./src/js/modules/ui.js":
/*!******************************!*\
  !*** ./src/js/modules/ui.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _themeLS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themeLS */ \"./src/js/modules/themeLS.js\");\n/* eslint-disable class-methods-use-this */\n\n\nconst themeLS = new _themeLS__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nclass UI {\n  useThemeSwitch() {\n    const toggle = document.getElementById('theme-toggle');\n    const { theme } = toggle.dataset;\n\n    if (theme === 'dark') {\n      toggle.src = './assets/icon-sun.svg';\n      toggle.dataset.theme = 'light';\n      toggle.setAttribute('alt', 'Toggle Light Mode');\n\n      themeLS.storeTheme('dark');\n      themeLS.loadThemeStorage();\n\n      const toggleObj = {\n        src: './assets/icon-sun.svg',\n        theme: 'light',\n        alt: 'Toggle Light Mode',\n      };\n      const toggleObjStr = JSON.stringify(toggleObj);\n      themeLS.storeToggle(toggleObjStr);\n      themeLS.loadToggle();\n    } else if (theme === 'light') {\n      toggle.src = './assets/icon-moon.svg';\n      toggle.dataset.theme = 'dark';\n      toggle.setAttribute('alt', 'Toggle Dark Mode');\n\n      themeLS.storeTheme('light');\n      themeLS.loadThemeStorage();\n\n      const toggleObj = {\n        src: './assets/icon-moon.svg',\n        theme: 'dark',\n        alt: 'Toggle Dark Mode',\n      };\n      const toggleObjStr = JSON.stringify(toggleObj);\n      themeLS.storeToggle(toggleObjStr);\n      themeLS.loadToggle();\n    }\n  }\n\n  setBackgroundImage() {\n    const main = document.querySelector('main');\n    if (document.documentElement.className === 'light') {\n      if (window.innerWidth <= 700) {\n        // Mobile\n        main.style.backgroundImage = 'url(./assets/bg-mobile-light.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      } else {\n        // Desktop\n        main.style.backgroundImage = 'url(./assets/bg-desktop-light.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      }\n    } else if (document.documentElement.className === 'dark') {\n      if (window.innerWidth <= 700) {\n        // Mobile\n        main.style.backgroundImage = 'url(./assets/bg-mobile-dark.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      } else {\n        // Desktop\n        main.style.backgroundImage = 'url(./assets/bg-desktop-dark.jpg)';\n        main.style.backgroundRepeat = 'no-repeat';\n        main.style.backgroundSize = '100% auto';\n      }\n    }\n  }\n\n  setWidgetBottom() {\n    const container = document.querySelector('.todo-widget__middle');\n    if (\n      window.innerWidth > 700 &&\n      container.contains(container.querySelector('.todo-box--states'))\n    ) {\n      // Desktop\n      const last = container.querySelector('.todo-box--last');\n      const states = container.querySelector('.todo-box--states');\n      container.removeChild(states);\n      container.removeChild(last);\n\n      const newBottom = document.createElement('div');\n      newBottom.classList.add('todo-box--last');\n      newBottom.innerHTML = `\n        <p class=\"todo-box__text--functions no-hover\"><span id=\"todo-total\">5</span> items left</p>\n        <div class=\"todo-box__states\">\n          <p id=\"all-todos\" class=\"todo-box__text--active no-hover\">All</p>\n          <p id=\"active-todos\">Active</p>\n          <p id=\"completed-todos\">Completed</p>\n        </div>\n        <p class=\"todo-box__text--functions\" id=\"clear-completed\">Clear Completed</p>\n      `;\n      container.appendChild(newBottom);\n    } else if (\n      window.innerWidth <= 700 &&\n      !container.contains(container.querySelector('.todo-box--states'))\n    ) {\n      // Mobile\n      const oldLast = document.querySelector('.todo-box--last');\n      container.removeChild(oldLast);\n\n      const newLast = document.createElement('div');\n      newLast.classList.add('todo-box--last');\n      newLast.innerHTML = `\n        <p class=\"todo-box__text--functions no-hover\"><span id=\"todo-total\">5</span> items left</p>\n        <p class=\"todo-box__text--functions\" id=\"clear-completed\">Clear Completed</p>\n      `;\n\n      const states = document.createElement('div');\n      states.classList.add('todo-box--states');\n      states.innerHTML = `\n        <p id=\"all-todos\" class=\"todo-box__text--active no-hover\">All</p>\n        <p id=\"active-todos\">Active</p>\n        <p id=\"completed-todos\">Completed</p>\n      `;\n      container.appendChild(newLast);\n      container.appendChild(states);\n    }\n  }\n\n  static getDragAfterElement(container, y) {\n    const draggableElements = [\n      ...container.querySelectorAll('.draggable:not(.dragging)'),\n    ];\n\n    return draggableElements.reduce(\n      (closest, child) => {\n        const box = child.getBoundingClientRect();\n        const offset = y - box.top - box.height / 2;\n        if (offset < 0 && offset > closest.offset) {\n          return { offset, element: child };\n        }\n        return closest;\n      },\n      { offset: Number.NEGATIVE_INFINITY }\n    ).element;\n  }\n\n  makeTodoDraggable() {\n    const draggables = document.querySelectorAll('.draggable');\n    const dragContainer = document.querySelector('[data-drag]');\n\n    draggables.forEach((draggable) => {\n      draggable.addEventListener('dragstart', () => {\n        draggable.classList.add('dragging');\n      });\n\n      draggable.addEventListener('dragend', () => {\n        draggable.classList.remove('dragging');\n      });\n    });\n\n    dragContainer.addEventListener('dragover', (e) => {\n      e.preventDefault();\n      const afterElement = UI.getDragAfterElement(dragContainer, e.clientY);\n      const draggable = document.querySelector('.dragging');\n      if (afterElement == null) {\n        dragContainer.appendChild(draggable);\n      } else {\n        dragContainer.insertBefore(draggable, afterElement);\n      }\n    });\n  }\n}\n\n\n//# sourceURL=webpack://todo-app/./src/js/modules/ui.js?");

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