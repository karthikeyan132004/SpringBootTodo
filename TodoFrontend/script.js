// ---------------- Shared Config ----------------
const SERVER_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

// ---------------- Login ----------------
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");
        return data;
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "todos.html";
    })
    .catch(error => alert(error.message));
}

// ---------------- Register ----------------
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
    })
    .catch(error => alert(error.message));
}

// ---------------- Todos ----------------
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", () => {
        updateTodoStatus({ ...todo, isCompleted: checkbox.checked });
    });

    const span = document.createElement("span");
    span.textContent = `${todo.title} - ${todo.description}`;
    if (todo.isCompleted) {
        span.style.textDecoration = "line-through";
        span.style.color = "#aaa";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    card.appendChild(checkbox);
    card.appendChild(span);
    card.appendChild(deleteBtn);

    return card;
}

function loadTodos() {
    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    fetch(`${SERVER_URL}/api/v1/todo`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to load todos");
        }
        return response.json();
    })
    .then(todos => {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        if (!todos || todos.length === 0) {
            todoList.innerHTML = `<p id="empty-message">No Todos Yet. Add one below.</p>`;
        } else {
            todos.forEach(todo => todoList.appendChild(createTodoCard(todo)));
        }
    })
    .catch(error => {
        alert(error.message);
        document.getElementById("todo-list").innerHTML = `<p style="color:red">Failed to load todos</p>`;
    });
}

function addTodo() {
    const input = document.getElementById("new-todo");
    const title = input.value.trim();
    if (!title) return;

    // Add description (can be same as title or a separate input field)
    const description = title; // simple fix for now

    fetch(`${SERVER_URL}/api/v1/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, isCompleted: false }) // include description
    })
    .then(async response => {
        const newTodo = await response.json();
        if (!response.ok) throw new Error(newTodo.message || "Failed to add todo");
        return newTodo;
    })
    .then(() => {
        input.value = "";
        loadTodos();
    })
    .catch(error => alert(error.message));
}



function updateTodoStatus(todo) {
    fetch(`${SERVER_URL}/api/v1/todo`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
    .then(async response => {
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || "Failed to update todo");
        }
        return response.json().catch(() => ({}));
    })
    .then(() => loadTodos())
    .catch(error => alert(error.message));
}

function deleteTodo(id) {
    fetch(`${SERVER_URL}/api/v1/todo/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(() => loadTodos()) // DELETE has no body
    .catch(error => alert(error.message));
}

// ---------------- Page Initialization ----------------
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("todo-list")) loadTodos();
});
