import { saveToLocalStorage, getFromLocalStorage } from './localStorage.js';
import { toast } from './toast.js';
import { modalYesNo, modalChangeValue } from './modal.js';
import { debounce } from './debounce.js';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const initData = [
  {
    id: uuid(),
    name: 'Quét nhà',
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: uuid(),
    name: 'Đi chơi',
    isImportant: true,
    isCompleted: true,
    isDeleted: false,
  },
  {
    id: uuid(),
    name: 'Dắt chó đi dạo',
    isImportant: false,
    isCompleted: true,
    isDeleted: false,
  },
  {
    id: uuid(),
    name: 'Coding',
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
  },
];

const filterItems = [
  { id: 'all', label: 'All', icon: '/inbox.png' },
  { id: 'important', label: 'Important', icon: '/flag.png' },
  { id: 'not-completed', label: 'Not completed', icon: '/not-completed.png' },
  { id: 'completed', label: 'Completed', icon: '/check.png' },
  { id: 'deleted', label: 'Delete', icon: '/delete.png' },
];

// if (
//   !getFromLocalStorage('todoList') ||
//   getFromLocalStorage('todoList').length === 0
// ) {
//   saveToLocalStorage('todoList', initData);
// }

let todoList = getFromLocalStorage('todoList') || [];
const todoListElm = document.querySelector('.todo-list');
const inputTodo = document.querySelector('.input-todo');
const btnAddTodo = document.querySelector('.btn-add-todo');
const filterElm = document.querySelector('.filter');
const searchInput = document.querySelector('.search-input');

renderTodoList(todoList);
renderFilter(filterItems, todoList);
btnAddTodo.addEventListener('click', (event) => {
  event.preventDefault();
  addNewTodo(todoList);
});

function renderFilter(filterItems, todoList, selectedFilterId = 'all') {
  const countByFilters = todoList.reduce(
    (acc, item) => {
      let newAcc = { ...acc };
      if (item.isCompleted && !item.isDeleted)
        newAcc = { ...newAcc, completed: newAcc.completed + 1 };
      if (!item.isCompleted && !item.isDeleted)
        newAcc = { ...newAcc, 'not-completed': newAcc['not-completed'] + 1 };
      if (item.isImportant && !item.isDeleted)
        newAcc = { ...newAcc, important: newAcc.important + 1 };
      if (item.isDeleted) newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
      return newAcc;
    },
    {
      'all': todoList.length,
      'important': 0,
      'completed': 0,
      'deleted': 0,
      'not-completed': 0,
    }
  );

  let htmls = filterItems.map((filterItem) => {
    return `<div data-filter-id=${filterItem.id}
              class="filter-item px-[20px] py-[10px] rounded-[12px] flex justify-between h-[100px] items-center cursor-pointer transition-all duration-200 bg-[#e6e6e6] ${
                selectedFilterId === filterItem.id ? 'active' : 'bg-[#e6e6e6]'
              }"
            >
              <div class="select-none pointer-events-none">
                <div class="mb-3 w-[17px] h-[17px]"><img class="w-full h-full" src="../images${
                  filterItem.icon
                }" alt="" /></div>
                <p class="font-bold text-[16px] ${
                  selectedFilterId === filterItem.id
                    ? 'text-white'
                    : 'text-black'
                }">${filterItem.label}</p>
              </div>
              <p class="text-[24px] font-semibold leading-[1.33] ${
                selectedFilterId === filterItem.id ? 'text-white' : 'text-black'
              }">
                ${countByFilters[filterItem.id]}
              </p>
            </div>`;
  });
  filterElm.innerHTML = htmls.join('');

  const btnFilters = document.querySelectorAll('.filter-item');
  btnFilters.forEach((btnFilter) => {
    btnFilter.addEventListener('click', (event) => {
      const selectedFilterId = event.target.dataset.filterId;
      const searchText = searchInput.value.trim();

      renderTodoList(todoList, selectedFilterId, searchText);
      renderFilter(filterItems, todoList, selectedFilterId);
    });
  });

  searchInput.addEventListener(
    'input',
    debounce((event) => {
      const searchText = searchInput.value.trim();
      renderTodoList(todoList, selectedFilterId, searchText);
    }, 500)
  );
}

function renderTodoList(todoList, filterId = 'all', searchText = '') {
  const filterTodos = todoList.filter((todoItem) => {
    if (!todoItem.name.toLowerCase().includes(searchText.toLowerCase()))
      return false;
    switch (filterId) {
      case 'all':
        return true;
      case 'completed':
        return todoItem.isCompleted && !todoItem.isDeleted;
      case 'not-completed':
        return !todoItem.isCompleted && !todoItem.isDeleted;
      case 'important':
        return todoItem.isImportant && !todoItem.isDeleted;
      case 'deleted':
        return todoItem.isDeleted;

      default:
        return true;
    }
  });

  let htmls = filterTodos.map((todoItem) => {
    return `<div data-todo-id=${todoItem.id} draggable=true
      class="todo-item p-2 ${
        todoItem.isCompleted && !todoItem.isDeleted
          ? 'bg-green-200'
          : todoItem.isDeleted
          ? 'bg-slate-300'
          : 'bg-white'
      } rounded-lg shadow-md flex justify-between"
        >
        <div class="flex items-start leading-[1.43] gap-x-2">
              <div>
              <input class='cursor-pointer ${
                todoItem.isDeleted ? 'pointer-events-none' : ''
              } btn-complete' type="checkbox" ${
      todoItem.isCompleted ? 'checked' : ''
    }/>
              </div>
            <p class="todo-text select-none pointer-events-none text-[16px] text-[#616161] font-normal ${
              todoItem.isDeleted && 'line-through'
            }">${todoItem.name}</p>
          </div>
          <div class="flex gap-x-2">
            <p class="btn-star cursor-pointer ${
              todoItem.isDeleted ? 'pointer-events-none' : ''
            } justify-self-end">
              ${`<i class="fa-${
                todoItem.isImportant ? 'solid' : 'regular'
              } fa-star ${todoItem.isImportant ? 'text-yellow-400' : ''}"></i>`}
            </p>
            <p class="btn-delete-todo ${
              todoItem.isDeleted ? 'pointer-events-none' : ''
            } cursor-pointer"><i class="fa-solid fa-trash"></i></p>
            </div>
            </div>`;
  });
  todoListElm.innerHTML = htmls.join('');

  const btnDeleteTodos = document.querySelectorAll('.btn-delete-todo');
  const btnStars = document.querySelectorAll('.btn-star');
  const btnCompletes = document.querySelectorAll('.btn-complete');

  btnDeleteTodos.forEach((btnDeleteTodo) => {
    btnDeleteTodo.addEventListener('click', (event) => {
      event.stopPropagation();
      const todoId = event.target.closest('.todo-item')?.dataset.todoId;

      if (!todoId) return;

      modalYesNo({
        title: 'Delete to do',
        message: 'Are you sure you want to proceed?',
        actions: [
          {
            label: 'Cancel',
            type: 'secondary',
          },
          {
            label: 'Confirm',
            type: 'primary',
            callback: () => deleteTodo(todoId, todoList),
          },
        ],
      });
    });
  });

  btnStars.forEach((btnStar) => {
    btnStar.addEventListener('click', (event) => {
      event.stopPropagation();
      const todoId = event.target.closest('.todo-item')?.dataset.todoId;

      if (!todoId) return;

      todoList = todoList.map((todoItem) => {
        if (todoItem.id === todoId) {
          return {
            ...todoItem,
            isImportant: !todoItem.isImportant,
          };
        }
        return todoItem;
      });

      const activeFilterItem = document.querySelector('.filter-item.active');
      const filterId = activeFilterItem.dataset.filterId;
      renderTodoList(todoList, filterId);
      renderFilter(filterItems, todoList, filterId);
      saveToLocalStorage('todoList', todoList);
    });
  });

  btnCompletes.forEach((btnComplete) => {
    btnComplete.addEventListener('click', (event) => {
      event.stopPropagation();
      const todoId = event.target.closest('.todo-item')?.dataset.todoId;
      todoList = todoList.map((todoItem) => {
        if (todoItem.id === todoId) {
          todoItem.isCompleted = !todoItem.isCompleted;
        }
        return todoItem;
      });
      const activeFilterItem = document.querySelector('.filter-item.active');
      const filterId = activeFilterItem.dataset.filterId;
      renderTodoList(todoList, filterId);
      renderFilter(filterItems, todoList, filterId);
      saveToLocalStorage('todoList', todoList);
    });
  });

  const todoItemElms = todoListElm.querySelectorAll('.todo-item');

  todoItemElms.forEach((todoItemElm) => {
    todoItemElm.addEventListener('click', (event) => {
      event.stopPropagation();
      const todoText = event.target.querySelector('.todo-text')?.textContent;
      const todoItem = todoList.find(
        (todoItem) => todoItem.id === todoItemElm.dataset.todoId
      );
      if (!todoItem.isDeleted) {
        modalChangeValue({
          title: 'Update todo',
          inputHtml: `
        <input id='input' type="text" class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all ease-linear duration-300' name="name" value="${todoText}" />
    `,
          actions: [
            {
              label: 'Cancel',
              type: 'secondary',
            },
            {
              label: 'Save',
              type: 'primary',
              callback: (inputValue) => {
                const todoId = todoItemElm.dataset.todoId;
                updateTodo(todoId, inputValue.name);
              },
            },
          ],
        });
      }
    });
  });

  todoItemElms.forEach((todoItem) => {
    todoItem.addEventListener('dragstart', (event) => {
      event.target.classList.add('is-dragging');
    });

    todoItem.addEventListener('dragend', (event) => {
      event.target.classList.remove('is-dragging');

      const todoItemElms = document.querySelectorAll('.todo-item');
      const todoIds = [...todoItemElms].map((item) =>
        item.getAttribute('data-todo-id')
      );

      const sortedData = todoList.sort((a, b) => {
        return todoIds.indexOf(a.id) - todoIds.indexOf(b.id);
      });
      saveToLocalStorage('todoList', sortedData);
    });
  });

  todoListElm.addEventListener('dragover', (event) => {
    event.preventDefault();
    const bottomTodoItem = insertAboveTodoItem(todoListElm, event.clientY);
    const curTodoItem = document.querySelector('.is-dragging');
    if (!bottomTodoItem) {
      todoListElm.appendChild(curTodoItem);
    } else {
      todoListElm.insertBefore(curTodoItem, bottomTodoItem);
    }
  });
}

function insertAboveTodoItem(zone, mouseY) {
  const todoItems = zone.querySelectorAll('.todo-item:not(.is-dragging)');
  let closestTodoItem = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  todoItems.forEach((todoItem) => {
    const { top } = todoItem.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTodoItem = todoItem;
    }
  });
  return closestTodoItem;
}

function addNewTodo(todoList, filterId) {
  const newTodo = inputTodo.value;

  if (newTodo.trim().length === 0) {
    toast({
      title: 'Add to do',
      message: `New to do can not be an empty string !`,
      type: 'info',
      duration: 3000,
    });
    return;
  }

  const newTodoItem = {
    id: uuid(),
    name: inputTodo.value,
    isImportant: false,
    isCompleted: false,
    isDeleted: false,
  };
  todoList.push(newTodoItem);
  saveToLocalStorage('todoList', todoList);
  renderTodoList(todoList, filterId);
  renderFilter(filterItems, todoList, filterId);
  toast({
    title: 'Add to do',
    message: `Added new to do ${inputTodo.value} !`,
    type: 'success',
    duration: 3000,
  });
  inputTodo.value = '';
}

function updateTodo(id, todoText) {
  todoList = todoList.map((todoItem) => {
    if (todoItem.id === id) {
      todoItem.name = todoText;
    }
    return todoItem;
  });
  const activeFilterItem = document.querySelector('.filter-item.active');
  const filterId = activeFilterItem.dataset.filterId;
  renderTodoList(todoList, filterId);
  saveToLocalStorage('todoList', todoList);
  toast({
    title: 'Update to do',
    message: `Update to do successfully !`,
    type: 'success',
    duration: 3000,
  });
}

function deleteTodo(id, todoList) {
  const deletedTodo = todoList.find((todoItem) => todoItem.id === id);
  todoList = todoList.map((todoItem) => {
    if (todoItem.id === id) {
      todoItem.isDeleted = true;
      return todoItem;
    }
    return todoItem;
  });
  const activeFilterItem = document.querySelector('.filter-item.active');
  const filterId = activeFilterItem.dataset.filterId;
  renderTodoList(todoList, filterId);
  renderFilter(filterItems, todoList, filterId);
  saveToLocalStorage('todoList', todoList);
  toast({
    title: 'Delete to do',
    message: `Deleted to do ${deletedTodo?.name} !`,
    type: 'success',
    duration: 3000,
  });
}
