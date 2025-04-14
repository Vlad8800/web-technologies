// script.js
const createTaskItem = (task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="edit-btn">Редагувати</button>
        <button class="delete-btn">Видалити</button>
    `;
    if (task.completed) li.classList.add('completed');
    return li;
};

const renderTasks = (tasks) => {
    const list = document.querySelector('.task-list');
    list.innerHTML = '';
    tasks.forEach(task => list.appendChild(createTaskItem(task)));
};

const loadTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

let tasks = loadTasks();

document.querySelector('.add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = e.target.task.value.trim();
    if (!text) return;

    const task = {
        id: Date.now().toString(),
        text,
        completed: false,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
    };

    tasks = [...tasks, task];
    saveTasks(tasks);
    renderTasks(tasks);
    e.target.reset();
});

document.querySelector('.task-list').addEventListener('click', (e) => {
    const id = e.target.parentElement.dataset.id;
    const taskItem = e.target.parentElement;

    if (e.target.tagName === 'SPAN') {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed, updated: new Date().toISOString() } : task
        );
        saveTasks(tasks);
        renderTasks(tasks);
    }

    if (e.target.classList.contains('delete-btn')) {
        taskItem.style.animation = 'fadeOut 0.3s ease-out';
        taskItem.addEventListener('animationend', () => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks(tasks);
            renderTasks(tasks);
        }, { once: true });
    }

    if (e.target.classList.contains('edit-btn')) {
        const task = tasks.find(t => t.id === id);
        const span = taskItem.querySelector('span');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        taskItem.replaceChild(input, span);

        input.focus();
        input.addEventListener('blur', () => {
            const newText = input.value.trim();
            if (newText) {
                tasks = tasks.map(t => 
                    t.id === id ? { ...t, text: newText, updated: new Date().toISOString() } : t
                );
                saveTasks(tasks);
                renderTasks(tasks);
            }
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') input.blur();
        });
    }
});

const sortBy = (tasks, key) => [...tasks].sort((a, b) => {
    if (key === 'completed') return a[key] - b[key];
    return new Date(a[key]) - new Date(b[key]);
});

document.querySelector('.sort-created').addEventListener('click', () => 
    renderTasks(sortBy(tasks, 'created')));
document.querySelector('.sort-completed').addEventListener('click', () => 
    renderTasks(sortBy(tasks, 'completed')));
document.querySelector('.sort-updated').addEventListener('click', () => 
    renderTasks(sortBy(tasks, 'updated')));
document.querySelector('.reset-sort').addEventListener('click', () => 
    renderTasks(tasks));

// Ініціалізація
renderTasks(tasks);