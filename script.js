document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            taskText.addEventListener('dblclick', () => {
                taskText.classList.add('editing');
                taskText.contentEditable = true;
                taskText.focus();
            });
            taskText.addEventListener('blur', () => {
                taskText.classList.remove('editing');
                taskText.contentEditable = false;
                task.text = taskText.textContent.trim();
                saveTasks();
            });
            taskText.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    taskText.blur();
                }
            });

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                taskText.classList.add('editing');
                taskText.contentEditable = true;
                taskText.focus();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    renderTasks();
});