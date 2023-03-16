/* eslint-disable class-methods-use-this */
export default class ThemeLocalStorage {
  /* 'dfatda_' is a local storage key prefix. 
      Its to avoid key variable collisions in local storage. 
      dfatda = (d)ev-(f)(a) (t)o(d)o (a)pp */
  loadThemeStorage() {
    ThemeLocalStorage.setTheme();
  }

  loadToggle() {
    ThemeLocalStorage.setToggle();
  }

  storeTheme(theme) {
    localStorage.setItem('dfatda_theme', theme);
  }

  storeToggle(toggleObj) {
    localStorage.setItem('dfatda_toggle', toggleObj);
  }

  static setTheme() {
    if (localStorage.getItem('dfatda_theme') === null) {
      localStorage.setItem('dfatda_theme', 'light');
      const activeTheme = localStorage.getItem('dfatda_theme');
      document.documentElement.className = activeTheme;
    } else {
      const activeTheme = localStorage.getItem('dfatda_theme');
      document.documentElement.className = activeTheme;
    }
  }

  static setToggle() {
    if (localStorage.getItem('dfatda_toggle') !== null) {
      const toggleBtn = document.getElementById('theme-toggle');
      const toggleObjStr = localStorage.getItem('dfatda_toggle');
      const toggleObj = JSON.parse(toggleObjStr);
      toggleBtn.src = toggleObj.src;
      toggleBtn.setAttribute('alt', toggleObj.alt);
      toggleBtn.dataset.theme = toggleObj.theme;
    }
  }
}
