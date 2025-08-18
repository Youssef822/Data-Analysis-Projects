document.addEventListener("DOMContentLoaded", () => {
    let tasks = [];

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const filterSelect = document.getElementById("filter");

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });
    filterSelect.addEventListener("change", () => renderTasks(filterSelect.value));

    function addTask() {
        let taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        if (taskText.length > 50) {
            alert("Task is too long!");
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks(filterSelect.value);
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "incomplete" && task.completed) return;

            let li = document.createElement("li");
            if (task.completed) li.classList.add("completed");

            let taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;

            let buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("task-buttons");

            let completeBtn = document.createElement("button");
            completeBtn.textContent = "✔";
            completeBtn.onclick = () => {
                task.completed = !task.completed;
                renderTasks(filterSelect.value);
            };

            let editBtn = document.createElement("button");
            editBtn.textContent = "✎";
            editBtn.onclick = () => {
                if (taskSpan.isContentEditable) {
                    task.text = taskSpan.textContent.trim();
                    taskSpan.contentEditable = false;
                    editBtn.textContent = "✎";
                } else {
                    taskSpan.contentEditable = true;
                    taskSpan.focus();
                    editBtn.textContent = "💾";
                }
            };

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑";
            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                renderTasks(filterSelect.value);
            };

            buttonsDiv.append(completeBtn, editBtn, deleteBtn);
            li.append(taskSpan, buttonsDiv);
            taskList.appendChild(li);
        });
    }
});
