document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const task = { text: taskText, completed: false };
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTasks();
    taskInput.value = "";
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const taskText = prompt("Edit your task:", tasks[index].text);
    
    if (taskText !== null && taskText.trim() !== "") {
        tasks[index].text = taskText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = getTasks();
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";
        taskItem.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button onclick="removeTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function loadTasks() {
    renderTasks();
}
