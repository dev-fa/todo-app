import UI from './modules/ui';
import ThemeLocalStorage from './modules/themeLS';
import Todo from './modules/todo';

(function main() {
  const ui = new UI();
  const themeLS = new ThemeLocalStorage();
  const todo = new Todo();

  document.getElementById('theme-toggle').addEventListener('click', () => {
    ui.useThemeSwitch();
  });

  window.onload = () => {
    themeLS.loadThemeStorage();
    themeLS.loadToggle();
    ui.setBackgroundImage();
    ui.setWidgetBottom();
    todo.load();
  };

  window.addEventListener('resize', () => {
    ui.setBackgroundImage();
    ui.setWidgetBottom();
    todo.checkWidgetBottom();
  });

  // Check if theme is changed
  const targetNode = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        mutation.target === targetNode
      ) {
        ui.setBackgroundImage();
      }
    });
  });
  const config = { attributes: true, childList: false, subtree: false };
  observer.observe(targetNode, config);
})();
