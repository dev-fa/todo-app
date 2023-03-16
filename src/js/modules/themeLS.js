/* eslint-disable class-methods-use-this */
export default class ThemeLocalStorage {
  loadThemeStorage() {
    ThemeLocalStorage.setTheme();
  }

  loadToggle() {
    ThemeLocalStorage.setToggle();
  }

  storeTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  storeToggle(toggleObj) {
    localStorage.setItem('toggle', toggleObj);
  }

  static setTheme() {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
      const activeTheme = localStorage.getItem('theme');
      document.documentElement.className = activeTheme;
    } else {
      const activeTheme = localStorage.getItem('theme');
      document.documentElement.className = activeTheme;
    }
  }

  static setToggle() {
    if (localStorage.getItem('toggle') !== null) {
      const toggleBtn = document.getElementById('theme-toggle');
      const toggleObjStr = localStorage.getItem('toggle');
      const toggleObj = JSON.parse(toggleObjStr);
      toggleBtn.src = toggleObj.src;
      toggleBtn.setAttribute('alt', toggleObj.alt);
      toggleBtn.dataset.theme = toggleObj.theme;
    }
  }
}
