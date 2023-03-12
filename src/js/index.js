import UI from './modules/ui';
import ThemeLocalStorage from './modules/themeLS';

const ui = new UI();
const themeLS = new ThemeLocalStorage();

document.getElementById('theme-toggle').addEventListener('click', () => {
  ui.useThemeSwitch();
});

window.onload = () => {
  themeLS.loadThemeStorage();
  themeLS.loadToggle();
  ui.setBackgroundImage();
  ui.makeTodoDraggable();
};

window.addEventListener('resize', () => {
  ui.setBackgroundImage();
  ui.setWidgetBottom();
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
