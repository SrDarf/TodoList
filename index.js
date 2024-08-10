// Seleção de elementos
const addButton = document.querySelector('.add-todo-button');
const todoContainer = document.querySelector('.todo-list-container');
const modal = document.querySelector('.todo-modal');
const createButton = document.getElementById('create-todo');
const cancelButton = document.getElementById('cancel-todo');
const toast = document.getElementById('toast');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const colorInput = document.getElementById('todo-color');
const colorPreview = document.querySelector('.color');

let currentTodoItem = null;

// Adiciona os trem no localstorage
function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoContainer.appendChild(todoItem);
    });
}

// Cria um item no html
function createTodoItem(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.style.setProperty('--item-color', todo.color);
    

    todoItem.innerHTML = `
        <section onclick="toggleDescription(this)">
            <h2 class="todo-title">${todo.name}</h2>
            <p class="todo-description">${todo.description}</p>
            <p class="todo-datetime">${todo.datetime}</p>
            <button class="delete-btn">\u00d7</button>
        </section>
    `;

    // Apaga item do html
    todoItem.querySelector('.delete-btn').addEventListener('click', () => {
        currentTodoItem = todoItem;
        toast.classList.add('show-toast');
    });

    return todoItem;
}

// Salva os items no localstorage 2
function saveTodo(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove item do Localstorage (nao do html)
function removeTodo(todoElement) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoName = todoElement.querySelector('.todo-title').textContent;
    todos = todos.filter(todo => todo.name !== todoName);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Isso nem funciona mas vou deixar aqui
function toggleDescription(element) {
    element.classList.toggle('expanded');
}

// Events.stuff
window.onload = () => {
    toast.classList.remove('show-toast');
    loadTodos();
};

addButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

createButton.addEventListener('click', () => {
    const todoName = document.getElementById('todo-name').value;
    const todoDescription = document.getElementById('todo-description').value;
    const todoColor = document.getElementById('todo-color').value;
    const todoDatetime = new Date().toLocaleString();

    if (todoName) {
        const todo = {
            name: todoName,
            description: todoDescription,
            color: todoColor,
            datetime: todoDatetime
        };

        const todoItem = createTodoItem(todo);
        todoContainer.appendChild(todoItem);
        modal.style.display = 'none';

        saveTodo(todo);
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

confirmDeleteButton.addEventListener('click', () => {
    if (currentTodoItem) {
        todoContainer.removeChild(currentTodoItem);
        removeTodo(currentTodoItem);
        currentTodoItem = null;
        toast.classList.remove('show-toast');
    }
});

cancelDeleteButton.addEventListener('click', () => {
    toast.classList.remove('show-toast');
    currentTodoItem = null;
});

colorInput.addEventListener('input', () => {
    const selectedColor = colorInput.value;
    colorPreview.style.color = selectedColor;
});


const noTodosMessage = document.querySelector('.no-todos-message');


function checkTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    if (todos.length === 0) {
        noTodosMessage.style.display = 'block';
    } else {
        noTodosMessage.style.display = 'none';
    }
}


setInterval(checkTodos, 1000);

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoContainer.appendChild(todoItem);
    });

  
    checkTodos();
}


