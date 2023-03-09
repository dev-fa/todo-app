/* eslint-disable class-methods-use-this */
import ThemeLocalStorage from './themeLS';

const themeLS = new ThemeLocalStorage();

export default class UI {
  useThemeSwitch() {
    const toggle = document.getElementById('theme-toggle');
    const { theme } = toggle.dataset;

    if (theme === 'dark') {
      toggle.src = './assets/icon-sun.svg';
      toggle.dataset.theme = 'light';
      toggle.setAttribute('alt', 'Toggle Light Mode');

      themeLS.storeTheme('dark');
      themeLS.loadThemeStorage();

      const toggleObj = {
        src: './assets/icon-sun.svg',
        theme: 'light',
        alt: 'Toggle Light Mode',
      };
      const toggleObjStr = JSON.stringify(toggleObj);
      themeLS.storeToggle(toggleObjStr);
      themeLS.loadToggle();
    } else if (theme === 'light') {
      toggle.src = './assets/icon-moon.svg';
      toggle.dataset.theme = 'dark';
      toggle.setAttribute('alt', 'Toggle Dark Mode');

      themeLS.storeTheme('light');
      themeLS.loadThemeStorage();

      const toggleObj = {
        src: './assets/icon-moon.svg',
        theme: 'dark',
        alt: 'Toggle Dark Mode',
      };
      const toggleObjStr = JSON.stringify(toggleObj);
      themeLS.storeToggle(toggleObjStr);
      themeLS.loadToggle();
    }
  }

  setBackgroundImage() {
    const main = document.querySelector('main');
    if (document.documentElement.className === 'light') {
      if (window.innerWidth <= 700) {
        // Mobile
        main.style.backgroundImage = 'url(./assets/bg-mobile-light.jpg)';
        main.style.backgroundRepeat = 'no-repeat';
        main.style.backgroundSize = '100% auto';
      } else {
        // Desktop
        main.style.backgroundImage = 'url(./assets/bg-desktop-light.jpg)';
        main.style.backgroundRepeat = 'no-repeat';
        main.style.backgroundSize = '100% auto';
      }
    } else if (document.documentElement.className === 'dark') {
      if (window.innerWidth <= 700) {
        // Mobile
        main.style.backgroundImage = 'url(./assets/bg-mobile-dark.jpg)';
        main.style.backgroundRepeat = 'no-repeat';
        main.style.backgroundSize = '100% auto';
      } else {
        // Desktop
        main.style.backgroundImage = 'url(./assets/bg-desktop-dark.jpg)';
        main.style.backgroundRepeat = 'no-repeat';
        main.style.backgroundSize = '100% auto';
      }
    }
  }
}
