const getStoredTasks = () => {
    const stored = localStorage.getItem('tasks2026');
    return stored ? JSON.parse(stored) : [
        { id: 't_1', text: 'Build Premium Interactions', category: 'Work', completed: true, createdAt: typeof Temporal !== 'undefined' ? Temporal.Now.plainDateISO().toString() : new Date().toISOString() }
    ];
};

let tasks = getStoredTasks();

const saveTasks = () => {
    localStorage.setItem('tasks2026', JSON.stringify(tasks));
};

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskCategory = document.getElementById('taskCategory');
const taskListContainer = document.getElementById('taskListContainer');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');
const searchInput = document.getElementById('searchInput');
const clearAllBtn = document.getElementById('clearAllBtn');
const editModal = document.getElementById('editTaskModal');
const editForm = document.getElementById('editTaskForm');
const editInput = document.getElementById('editTaskInput');
const editTaskId = document.getElementById('editTaskId');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const themeCheckbox = document.getElementById('themeCheckbox');

const savedTheme = localStorage.getItem('theme2026') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeCheckbox.checked = savedTheme === 'dark';

themeCheckbox.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme2026', newTheme);
});

const getIcon = (type) => {
    if (type === 'edit') return `<svg class="premium-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="draw-path" d="M12 20h9"></path><path class="draw-path" d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
    if (type === 'delete') return `<svg class="premium-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline class="draw-path" points="3 6 5 6 21 6"></polyline><path class="draw-path" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line class="draw-path" x1="10" y1="11" x2="10" y2="17"></line><line class="draw-path" x1="14" y1="11" x2="14" y2="17"></line></svg>`;
    if (type === 'check') return `<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline class="check-path" points="20 6 9 17 4 12"></polyline></svg>`;
    return '';
};

const createTaskElement = (task) => {
    const card = document.createElement('article');
    card.className = 'task-card premium-surface';
    card.setAttribute('data-id', task.id);
    card.dataset.status = task.completed ? 'completed' : 'pending';
    card.dataset.category = task.category;
    card.style.viewTransitionName = `card-${task.id}`;

    const header = document.createElement('div');
    header.className = 'task-card-header';

    const label = document.createElement('label');
    label.className = 'premium-checkbox-wrapper';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox sr-only';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Mark task as complete');
    
    const visual = document.createElement('div');
    visual.className = 'checkbox-visual';
    visual.innerHTML = getIcon('check');
    
    label.append(checkbox, visual);

    const actions = document.createElement('div');
    actions.className = 'task-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon action-edit';
    editBtn.setAttribute('aria-label', 'Edit Task');
    editBtn.innerHTML = getIcon('edit');
    
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon action-delete';
    delBtn.setAttribute('aria-label', 'Delete Task');
    delBtn.innerHTML = getIcon('delete');
    
    actions.append(editBtn, delBtn);
    header.append(label, actions);

    const textElem = document.createElement('p');
    textElem.className = 'task-text';
    
    const textNode = document.createTextNode(task.text);
    textElem.appendChild(textNode);
    
    const catBadge = document.createElement('span');
    catBadge.className = 'badge';
    catBadge.style.fontSize = '0.7em';
    catBadge.style.marginLeft = '8px';
    catBadge.style.opacity = '0.6';
    catBadge.appendChild(document.createTextNode(`[${task.category}]`));
    textElem.appendChild(catBadge);

    card.append(header, textElem);
    return card;
};

const renderTasks = (filterQuery = '') => {
    if (!document.startViewTransition) {
        updateDOM(filterQuery);
        return;
    }
    document.startViewTransition(() => {
        updateDOM(filterQuery);
    });
};

const updateDOM = (filterQuery) => {
    const fragment = document.createDocumentFragment();
    let completed = 0;
    
    const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(filterQuery.toLowerCase()));
    
    const groupedByCategory = Object.groupBy ? Object.groupBy(filteredTasks, t => t.category) : {};
    
    filteredTasks.forEach(task => {
        if (task.completed) completed++;
        const card = createTaskElement(task);
        fragment.appendChild(card);
    });
    
    taskListContainer.innerHTML = '';
    taskListContainer.appendChild(fragment);
    
    completedCountEl.textContent = completed;
    totalCountEl.textContent = filteredTasks.length;
    
    saveTasks();
};

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });
}

if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
        if(confirm("Clear all tasks?")) {
            tasks = [];
            Array.from(taskListContainer.children).forEach(child => child.remove());
            renderTasks(searchInput ? searchInput.value : '');
        }
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!taskInput.checkValidity() || (taskCategory && !taskCategory.value)) {
        taskForm.reportValidity();
        return;
    }
    
    const text = taskInput.value.trim();
    if (text) {
        const newTask = {
            id: `t_${Date.now()}`,
            text,
            category: taskCategory ? taskCategory.value : 'General',
            completed: false,
            createdAt: typeof Temporal !== 'undefined' ? Temporal.Now.plainDateISO().toString() : new Date().toISOString()
        };
        tasks.unshift(newTask);
        taskInput.value = '';
        renderTasks(searchInput ? searchInput.value : '');
    }
});

taskListContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.task-card');
    if (!card) return;
    
    const id = card.getAttribute('data-id');
    
    if (e.target.closest('.premium-checkbox-wrapper')) {
        e.preventDefault();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks(searchInput ? searchInput.value : '');
        }
    } else if (e.target.closest('.action-delete')) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks(searchInput ? searchInput.value : '');
    } else if (e.target.closest('.action-edit')) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            openEditModal(task);
        }
    }
});

const openEditModal = (task) => {
    editTaskId.value = task.id;
    editTaskInput.value = task.text;
    editModal.showModal();
    document.querySelector('.app-main').inert = true;
    document.querySelector('.app-header').inert = true;
};

const closeEditModal = () => {
    const { promise, resolve } = Promise.withResolvers ? Promise.withResolvers() : { promise: Promise.resolve(), resolve: () => {} };
    editModal.classList.add('closing');
    setTimeout(() => {
        editModal.close();
        editModal.classList.remove('closing');
        document.querySelector('.app-main').inert = false;
        document.querySelector('.app-header').inert = false;
        resolve();
    }, 300);
    return promise;
};

closeModalBtn.addEventListener('click', closeEditModal);
cancelEditBtn.addEventListener('click', closeEditModal);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editInput.checkValidity()) {
        editForm.reportValidity();
        return;
    }
    
    const text = editInput.value.trim();
    const id = editTaskId.value;
    
    if (text) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.text = text;
            renderTasks(searchInput ? searchInput.value : '');
        }
        closeEditModal();
    }
});

const playgroundHost = document.querySelector('event-playground');
if (playgroundHost && playgroundHost.shadowRoot) {
    const sr = playgroundHost.shadowRoot;
    const eventTraceLog = sr.getElementById('eventTraceLog');
    
    const logTrace = (phase, elementDesc) => {
        if (!eventTraceLog) return;
        const entry = document.createElement('div');
        entry.className = `log-entry phase-${phase}`;
        entry.appendChild(document.createTextNode(`[${phase.toUpperCase()}] Event on ${elementDesc}`));
        
        if (eventTraceLog.querySelector('.log-empty')) {
            eventTraceLog.innerHTML = '';
        }
        
        eventTraceLog.appendChild(entry);
        eventTraceLog.scrollTop = eventTraceLog.scrollHeight;
        
        while (eventTraceLog.children.length > 15) {
            eventTraceLog.firstChild.remove();
        }
    };

    const grandparent = sr.getElementById('grandparentElem');
    const parent = sr.getElementById('parentElem');
    const child = sr.getElementById('childElem');

    if (grandparent && parent && child) {
        grandparent.addEventListener('click', () => logTrace('capture', 'Grandparent'), true);
        parent.addEventListener('click', () => logTrace('capture', 'Parent'), true);
        child.addEventListener('click', () => logTrace('capture', 'Child Button'), true);

        grandparent.addEventListener('click', () => logTrace('bubble', 'Grandparent'));
        parent.addEventListener('click', () => logTrace('bubble', 'Parent'));
        child.addEventListener('click', () => logTrace('bubble', 'Child Button'));
    }
}

renderTasks();
