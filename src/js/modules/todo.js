import UI from './ui';

const ui = new UI();

/* eslint-disable class-methods-use-this */
export default class Todo {
  static newTodoForm = document.querySelector('[data-new-todo-form]');

  static newTodoInput = document.querySelector('[data-new-todo-input');

  static todoContainer = document.getElementById('todo-main');

  static todoList = [
    { text: 'Opened the app for the first time', completed: true, id: '0' },
    { text: 'Make your first todo', completed: false, id: '1' },
    { text: 'Complete your first todo', completed: false, id: '2' },
    { text: 'Delete your first todo', completed: false, id: '3' },
    { text: "Drag your todo's around", completed: false, id: '4' },
    { text: 'Star the projects github repository!', completed: false, id: '5' },
  ];

  static todoListState = 'all';

  // Initial page load function
  load() {
    Todo.render();
    Todo.setCounter();
    Todo.setTodo();
    Todo.setCheckButton();
    Todo.checkStateButtons();
    Todo.setStatesButton();
    Todo.setDeleteButton();
    Todo.setClearCompleted();
  }

  // Re-add event listener
  checkWidgetBottom() {
    Todo.setClearCompleted();
    Todo.checkStateButtons();
    Todo.setStatesButton();
  }

  // Add event listeners

  static setTodo() {
    Todo.newTodoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (
        !(Todo.newTodoInput.value == null || Todo.newTodoInput.value === '')
      ) {
        Todo.addNewTask(Todo.newTodoInput.value);
        // eslint-disable-next-line no-unused-expressions
        Todo.newTodoInput.value = null;
        Todo.render();
        Todo.setCounter();
      }
    });
  }

  static setCheckButton() {
    Todo.todoContainer.addEventListener('click', (e) => {
      if (
        e.target.className === 'btn-todo' ||
        e.target.className === 'btn-todo--checked'
      ) {
        const button = e.target;
        Todo.checkTodo(button);
        Todo.render();
        Todo.setCounter();
      }
    });
  }

  static checkStateButtons() {
    const all = document.getElementById('all-todos');
    const active = document.getElementById('active-todos');
    const completed = document.getElementById('completed-todos');

    if (Todo.todoListState === 'all') {
      completed.classList.remove(...completed.classList);
      active.classList.remove(...active.classList);
      all.classList.add('todo-box__text--active', 'no-hover');
    } else if (Todo.todoListState === 'active') {
      all.classList.remove(...all.classList);
      completed.classList.remove(...completed.classList);
      active.classList.add('todo-box__text--active', 'no-hover');
    } else if (Todo.todoListState === 'completed') {
      all.classList.remove(...all.classList);
      active.classList.remove(...active.classList);
      completed.classList.add('todo-box__text--active', 'no-hover');
    }
  }

  static setStatesButton() {
    const all = document.getElementById('all-todos');
    const active = document.getElementById('active-todos');
    const completed = document.getElementById('completed-todos');

    all.addEventListener('click', () => {
      Todo.todoListState = 'all';
      Todo.checkStateButtons();
      Todo.render();
      Todo.setCounter();
    });

    active.addEventListener('click', () => {
      Todo.todoListState = 'active';
      Todo.checkStateButtons();
      Todo.render();
      Todo.setCounter();
    });

    completed.addEventListener('click', () => {
      Todo.todoListState = 'completed';
      Todo.checkStateButtons();
      Todo.render();
      Todo.setCounter();
    });
  }

  static setDeleteButton() {
    Todo.todoContainer.addEventListener('click', (e) => {
      if (e.target.className === 'btn-delete') {
        const todoBox = e.target.parentElement;
        const todoBoxId = todoBox.dataset.id;
        Todo.deleteTodo(todoBoxId);
        Todo.render();
        Todo.setCounter();
      }
    });
  }

  static setClearCompleted() {
    const clearCompletedButton = document.getElementById('clear-completed');
    clearCompletedButton.addEventListener('click', () => {
      Todo.deleteCompleted();
      Todo.render();
      Todo.setCounter();
    });
  }

  // Utility functions

  static clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static generateId() {
    return Date.now().toString();
  }

  // Todo widget functions

  static addNewTask(todoName) {
    const id = Todo.generateId();
    Todo.todoList.push({ text: todoName, completed: false, id });
  }

  static renderElement(todo) {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-box', 'draggable');
    newTodo.setAttribute('draggable', 'true');
    newTodo.setAttribute('data-id', todo.id);
    if (todo.completed) {
      newTodo.innerHTML = `
        <div class="todo-box__main">
        <p class="todo-box__text--disabled">${todo.text}</p>
        <div class="btn-todo-wrapper">
            <button type="button" aria-label="Mark as incomplete" class="btn-todo--checked">
              <img src="./assets/icon-check.svg" alt="checked">
            </button>
        </div>
        </div>
        <img src="./assets/icon-cross.svg" alt="Delete todo" class="btn-delete">
      `;
    } else {
      newTodo.innerHTML = `
          <div class="todo-box__main">
          <p class="todo-box__text">${todo.text}</p>
          <div class="btn-todo-wrapper">
              <button type="button" aria-label="Mark as complete" class="btn-todo"></button>
          </div>
          </div>
          <img src="./assets/icon-cross.svg" alt="Delete todo" class="btn-delete">
      `;
    }
    Todo.todoContainer.appendChild(newTodo);
  }

  static render() {
    Todo.clearElement(Todo.todoContainer);
    if (Todo.todoListState === 'all') {
      Todo.todoList.forEach((todo) => {
        Todo.renderElement(todo);
      });
    } else if (Todo.todoListState === 'active') {
      Todo.todoList
        .filter((todo) => todo.completed === false)
        .forEach((todo) => {
          Todo.renderElement(todo);
        });
    } else if (Todo.todoListState === 'completed') {
      Todo.todoList
        .filter((todo) => todo.completed)
        .forEach((todo) => {
          Todo.renderElement(todo);
        });
    }
    ui.makeTodoDraggable();
  }

  static setCounter() {
    const total = document.getElementById('todo-total');

    const totalValue = Todo.todoList.reduce((accumulator, todo) => {
      if (!todo.completed) {
        // eslint-disable-next-line no-param-reassign
        accumulator += 1;
        return accumulator;
      }
      return accumulator;
    }, 0);

    total.textContent = totalValue;
  }

  static checkTodo(button) {
    const todoBox = button.parentElement.parentElement.parentElement;
    const buttonContainer = button.parentElement.parentElement;
    const todoText = buttonContainer.querySelector('p');

    if (button.className === 'btn-todo') {
      button.classList.remove('btn-todo');
      button.classList.add('btn-todo--checked');
      const checkMark = document.createElement('img');
      checkMark.src = './assets/icon-check.svg';
      checkMark.setAttribute('alt', 'checked');
      button.appendChild(checkMark);
      todoText.classList.remove('todo-box__text');
      todoText.classList.add('todo-box__text--disabled');
      Todo.setCompletion(todoBox.dataset.id, true);
    } else {
      button.classList.remove('btn-todo--checked');
      button.classList.add('btn-todo');
      const checkMark = button.querySelector('img');
      button.removeChild(checkMark);
      todoText.classList.remove('todo-box__text--disabled');
      todoText.classList.add('todo-box__text');
      Todo.setCompletion(todoBox.dataset.id, false);
    }
  }

  static setCompletion(id, checked) {
    Todo.todoList.forEach((todoObj) => {
      if (todoObj.id === id) {
        // eslint-disable-next-line no-param-reassign
        todoObj.completed = checked;
      }
    });
    Todo.setCounter();
  }

  static deleteTodo(id) {
    Todo.todoList = Todo.todoList.filter((todo) => todo.id !== id);
  }

  static deleteCompleted() {
    Todo.todoList = Todo.todoList.filter((todo) => !todo.completed);
  }
}
