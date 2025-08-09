const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoList = document.getElementById("todo-list");

let todos = [];

function renderTodos(list = todos) {
  todoList.innerHTML = "";
  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date || "-"}</td>
      <td class="${todo.done ? "status-done" : "status-pending"}">
        ${todo.done ? "Done" : "Pending"}
      </td>
      <td>
        <button class="action-btn" onclick="toggleStatus(${index})">Toggle</button>
        <button class="action-btn" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  const date = todoDate.value;

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  todos.push({
    text,
    date,
    done: false
  });

  todoInput.value = "";
  todoDate.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAllTodos() {
  todos = [];
  renderTodos();
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function filterTodos() {
  const filtered = todos.filter(todo => !todo.done);
  renderTodos(filtered);
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllTodos);
filterBtn.addEventListener("click", filterTodos);

renderTodos();
