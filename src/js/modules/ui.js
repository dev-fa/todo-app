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

  setWidgetBottom() {
    const container = document.querySelector('.todo-widget__middle');
    if (
      window.innerWidth > 700 &&
      container.contains(container.querySelector('.todo-box--states'))
    ) {
      // Desktop
      const last = container.querySelector('.todo-box--last');
      const states = container.querySelector('.todo-box--states');
      container.removeChild(states);
      container.removeChild(last);

      const newBottom = document.createElement('div');
      newBottom.classList.add('todo-box--last');
      newBottom.innerHTML = `
        <p class="todo-box__text--functions no-hover"><span id="todo-total">5</span> items left</p>
        <div class="todo-box__states">
          <p id="all-todos" class="todo-box__text--active no-hover">All</p>
          <p id="active-todos">Active</p>
          <p id="completed-todos">Completed</p>
        </div>
        <p class="todo-box__text--functions" id="clear-completed">Clear Completed</p>
      `;
      container.appendChild(newBottom);
    } else if (
      window.innerWidth <= 700 &&
      !container.contains(container.querySelector('.todo-box--states'))
    ) {
      // Mobile
      const oldLast = document.querySelector('.todo-box--last');
      container.removeChild(oldLast);

      const newLast = document.createElement('div');
      newLast.classList.add('todo-box--last');
      newLast.innerHTML = `
        <p class="todo-box__text--functions no-hover"><span id="todo-total">5</span> items left</p>
        <p class="todo-box__text--functions" id="clear-completed">Clear Completed</p>
      `;

      const states = document.createElement('div');
      states.classList.add('todo-box--states');
      states.innerHTML = `
        <p id="all-todos" class="todo-box__text--active no-hover">All</p>
        <p id="active-todos">Active</p>
        <p id="completed-todos">Completed</p>
      `;
      container.appendChild(newLast);
      container.appendChild(states);
    }
  }

  static getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)'),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  makeTodoDraggable() {
    const draggables = document.querySelectorAll('.draggable');
    const dragContainer = document.querySelector('[data-drag]');

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });

    dragContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = UI.getDragAfterElement(dragContainer, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        dragContainer.appendChild(draggable);
      } else {
        dragContainer.insertBefore(draggable, afterElement);
      }
    });
  }
}
