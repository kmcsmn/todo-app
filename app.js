// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos); // wait for the everything to load up
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', checkMark);
todoFilter.addEventListener('click', filterTodo);

// FUNCTIONS
function addTodo(event) {
  event.preventDefault();

  // CREATE A TODO ITEM
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li
  const newTodo = document.createElement('li');
  // add the value from todoInput
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('new-todo');
  todoDiv.appendChild(newTodo);

  // add todo to local storage
  saveLocalTodos(todoInput.value);

  // CHECK MARK BUTTON
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('completed-btn');
  completeBtn.innerHTML = '<i class="fas fa-check"></li>';
  todoDiv.appendChild(completeBtn);

  // DELETE OR TRASH BUTTON
  const trashBtn = document.createElement('button');
  trashBtn.classList.add('trash-btn');
  trashBtn.innerHTML = '<i class="fas fa-trash"></li>';
  todoDiv.appendChild(trashBtn);

  // APPEND TODODIV ON THE UL ELEMENT (todoList)
  todoList.appendChild(todoDiv);

  // CLEAR TODO INPUT VALUE
  todoInput.value = '';
}

function deleteCheck(event) {
  const item = event.target;
  // check whether the target has trash class
  if (item.classList[0] === 'trash-btn') {
    // delete the parent element of the clicked item which is the whole todoDiv
    const todo = item.parentElement;

    // adding class for animation
    todo.classList.add('fall');
    removeToLocal(todo);
    // wait for transition to end before removing the item
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
}

function checkMark(event) {
  const item = event.target;
  if (item.classList[0] === 'completed-btn') {
    const todo = item.parentElement;

    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check whether theres already an item on todos
  let todos;

  // if it nothing exist, then create an empty array
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // if something already exists then get those items (array) from localstorage
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // push the todo item from todos
  todos.push(todo);
  // set the todos back to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
  // basically, parse converts a json string into js object
  // and stringify convert js objects into json string
}

// get the items from local storage
function getTodos() {
  // let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // loop through todos array
  todos.forEach(function (todo) {
    // CREATE A TODO ITEM
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('li');
    // add the value from localstorage (todo)
    newTodo.innerText = todo;
    newTodo.classList.add('new-todo');
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('completed-btn');
    completeBtn.innerHTML = '<i class="fas fa-check"></li>';
    todoDiv.appendChild(completeBtn);

    // DELETE OR TRASH BUTTON
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></li>';
    todoDiv.appendChild(trashBtn);

    // APPEND TODODIV ON THE UL ELEMENT (todoList)
    todoList.appendChild(todoDiv);
  });
}

// remove todo to local storage
function removeToLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // get the index of an item that we want to delete
  // and remove the item from the array using splice
  let todoIndex = todo.children[0].innerHTML;
  console.log(todo.children[0].innerHTML);
  todos.splice(todos.indexOf(todoIndex, 1));
  localStorage.setItem('todos', JSON.stringify(todos));
}
