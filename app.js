const getStoredTasks = () => {
    const stored = localStorage.getItem('tasks2026');
    return stored ? JSON.parse(stored) : [
        { id: 't_1', text: 'Build Premium Interactions', category: 'Work', completed: true, createdAt: typeof Temporal !== 'undefined' ? Temporal.Now.plainDateISO().toString() : new Date().toISOString() }
    ];
};

let tasks = getStoredTasks();
let activeCategory = 'all';

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
const filterChipsContainer = document.getElementById('filterChipsContainer');
const editModal = document.getElementById('editTaskModal');
const editForm = document.getElementById('editTaskForm');
const editInput = document.getElementById('editTaskInput');
const editTaskId = document.getElementById('editTaskId');
const editTaskCategory = document.getElementById('editTaskCategory');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const themeCheckbox = document.getElementById('themeCheckbox');

const savedTheme = localStorage.getItem('theme2026') || 'dark';
document.documentElement.dataset.theme = savedTheme;
document.documentElement.setAttribute('data-theme', savedTheme);
document.documentElement.classList.add(`${savedTheme}-theme`);
themeCheckbox.checked = savedTheme === 'dark';

themeCheckbox.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    document.documentElement.dataset.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    if (document.documentElement.classList.contains('light-theme') || document.documentElement.classList.contains('dark-theme')) {
        document.documentElement.classList.remove('light-theme', 'dark-theme');
    }
    document.documentElement.classList.add(`${newTheme}-theme`);
    localStorage.setItem('theme2026', newTheme);
});

const getIcon = (type) => {
    if (type === 'edit') return `<svg class="premium-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="draw-path" d="M12 20h9"></path><path class="draw-path" d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
    if (type === 'delete') return `<svg class="premium-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline class="draw-path" points="3 6 5 6 21 6"></polyline><path class="draw-path" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line class="draw-path" x1="10" y1="11" x2="10" y2="17"></line><line class="draw-path" x1="14" y1="11" x2="14" y2="17"></line></svg>`;
    if (type === 'check') return `<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline class="check-path" points="20 6 9 17 4 12"></polyline></svg>`;
    return '';
};

const createTaskElement = (task) => {
    const card = document.createElement('article');
    card.className = 'task-card premium-surface';
    card.setAttribute('data-id', task.id);
    card.dataset.status = task.completed ? 'completed' : 'pending';
    card.dataset.category = task.category || 'General';

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

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'task-card-header';
    
    const textElem = document.createElement('p');
    textElem.className = 'task-text';
    textElem.appendChild(document.createTextNode(task.text));

    const metaWrapper = document.createElement('div');
    metaWrapper.className = 'task-card-meta';

    const categoryBadge = document.createElement('span');
    const catClass = (task.category || 'General').toLowerCase();
    categoryBadge.className = `badge badge-${catClass}`;
    categoryBadge.textContent = task.category || 'General';

    metaWrapper.append(categoryBadge);
    contentWrapper.append(textElem, metaWrapper);

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
    
    actions.append(delBtn);
    actions.prepend(editBtn);

    card.append(label, contentWrapper, actions);

    return card;
};

const getFilteredTasks = () => {
    const filterQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    return tasks.filter(t => {
        const matchesQuery = t.text.toLowerCase().includes(filterQuery);
        const matchesCategory = activeCategory === 'all' || (t.category && t.category.toLowerCase() === activeCategory.toLowerCase());
        return matchesQuery && matchesCategory;
    });
};

const updateStats = () => {
    const filteredTasks = getFilteredTasks();
    let completed = 0;
    filteredTasks.forEach(task => { if (task.completed) completed++; });
    completedCountEl.textContent = completed;
    totalCountEl.textContent = filteredTasks.length;
    saveTasks();
};

const renderTasks = () => {
    const filteredTasks = getFilteredTasks();
    const fragment = document.createDocumentFragment();
    
    if (filteredTasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        
        const icon = document.createElement('div');
        icon.className = 'empty-state-icon';
        icon.textContent = '✨';
        
        const title = document.createElement('h3');
        title.className = 'empty-state-title';
        title.textContent = tasks.length === 0 ? 'No tasks yet' : 'No matching tasks found';
        
        const desc = document.createElement('p');
        desc.className = 'empty-state-desc';
        desc.textContent = tasks.length === 0 ? 'Add a new task above to get started!' : 'Try adjusting your search or category filter.';
        
        emptyState.append(icon, title, desc);
        fragment.appendChild(emptyState);
    } else {
        filteredTasks.forEach(task => {
            fragment.appendChild(createTaskElement(task));
        });
    }
    
    const applyUpdate = () => {
        taskListContainer.replaceChildren(fragment);
        updateStats();
    };

    if (document.startViewTransition) {
        try {
            const transition = document.startViewTransition(applyUpdate);
            if (transition && transition.finished) {
                transition.finished.catch(() => {});
            }
        } catch {
            applyUpdate();
        }
    } else {
        applyUpdate();
    }
};

if (searchInput) {
    searchInput.addEventListener('input', () => renderTasks());
}

if (filterChipsContainer) {
    filterChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        
        filterChipsContainer.querySelectorAll('.filter-chip').forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-selected', 'false');
        });
        
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        activeCategory = chip.dataset.category || 'all';
        renderTasks();
    });
}

if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
        if(confirm("Clear all tasks?")) {
            tasks = [];
            renderTasks();
        }
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!taskInput.checkValidity() || (taskCategory && !taskCategory.value)) {
        taskForm.reportValidity();
        return;
    }
    
    console.log("Property (live value):", taskInput.value);
    console.log("Attribute (static value):", taskInput.getAttribute("value"));
    
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
        taskForm.reset();
        renderTasks();
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
            const checkbox = card.querySelector('.task-checkbox');
            if (checkbox) checkbox.checked = task.completed;
            card.dataset.status = task.completed ? 'completed' : 'pending';
            if (task.completed) {
                card.setAttribute('data-completed', 'true');
            } else if (card.hasAttribute('data-completed')) {
                card.removeAttribute('data-completed');
            }
            updateStats();
        }
    } else if (e.target.closest('.action-delete')) {
        tasks = tasks.filter(t => t.id !== id);
        const applyUpdate = () => {
            card.remove();
            updateStats();
            if (tasks.length === 0) renderTasks();
        };
        if (document.startViewTransition) {
            try {
                const transition = document.startViewTransition(applyUpdate);
                if (transition && transition.finished) {
                    transition.finished.catch(() => {});
                }
            } catch {
                applyUpdate();
            }
        } else {
            applyUpdate();
        }
    } else if (e.target.closest('.action-edit')) {
        const task = tasks.find(t => t.id === id);
        if (task) openEditModal(task);
    }
});

const restoreInert = () => {
    document.querySelector('.app-main').inert = false;
    document.querySelector('.app-header').inert = false;
};

const openEditModal = (task) => {
    editTaskId.value = task.id;
    editTaskInput.value = task.text;
    if (editTaskCategory && task.category) {
        editTaskCategory.value = task.category;
    }
    editModal.showModal();
    document.querySelector('.app-main').inert = true;
    document.querySelector('.app-header').inert = true;
};

const closeEditModal = () => {
    return new Promise((resolve) => {
        editModal.classList.add('closing');
        setTimeout(() => {
            editModal.close();
            editModal.classList.remove('closing');
            restoreInert();
            resolve();
        }, 300);
    });
};

editModal.addEventListener('cancel', () => {
    restoreInert();
});

editModal.addEventListener('close', () => {
    restoreInert();
});

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
    const category = editTaskCategory ? editTaskCategory.value : 'General';
    
    if (text) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.text = text;
            task.category = category;
            const oldCard = document.querySelector(`.task-card[data-id="${id}"]`);
            if (oldCard) {
                const newCard = createTaskElement(task);
                const placeholder = document.createElement('span');
                placeholder.hidden = true;
                oldCard.before(placeholder);
                placeholder.after(newCard);
                oldCard.replaceWith(newCard);
                placeholder.remove();
            }
            updateStats();
        }
        closeEditModal();
    }
});

const eventTraceLog = document.getElementById('eventTraceLog');

const logTrace = (phase, elementDesc) => {
    if (!eventTraceLog) return;
    const entry = document.createElement('div');
    entry.className = `log-entry phase-${phase}`;
    entry.appendChild(document.createTextNode(`[${phase.toUpperCase()}] Event on ${elementDesc}`));
    
    if (eventTraceLog.querySelector('.log-empty')) {
        eventTraceLog.innerHTML = '';
    }
    
    eventTraceLog.append(entry);
    eventTraceLog.scrollTop = eventTraceLog.scrollHeight;
    
    while (eventTraceLog.children.length > 15) {
        eventTraceLog.firstChild.remove();
    }
};

const grandparent = document.getElementById('grandparentElem');
const parent = document.getElementById('parentElem');
const child = document.getElementById('childElem');

if (grandparent && parent && child) {
    grandparent.addEventListener('click', () => { logTrace('capture', 'Grandparent'); console.log('Grandparent'); }, true);
    parent.addEventListener('click', () => { logTrace('capture', 'Parent'); console.log('Parent'); }, true);
    child.addEventListener('click', () => { logTrace('capture', 'Child'); console.log('Child'); }, true);

    child.addEventListener('click', () => { logTrace('bubble', 'Child'); console.log('Child'); });
    parent.addEventListener('click', () => { logTrace('bubble', 'Parent'); console.log('Parent'); });
    grandparent.addEventListener('click', () => { logTrace('bubble', 'Grandparent'); console.log('Grandparent'); });
}

const initScrollDampener = () => {
    const el = document.querySelector('.app-main');
    if (!el) return;

    let targetY = el.scrollTop;
    let currentY = el.scrollTop;
    let isRunning = false;

    const tick = () => {
        currentY += (targetY - currentY) * 0.14;
        el.scrollTop = Math.round(currentY);

        if (Math.abs(targetY - currentY) > 0.5) {
            requestAnimationFrame(tick);
        } else {
            el.scrollTop = targetY;
            currentY = targetY;
            isRunning = false;
        }
    };

    window.addEventListener('wheel', (e) => {
        if (editModal && editModal.open) return;
        if (e.target && e.target.closest && e.target.closest('.trace-log')) return;

        e.preventDefault();

        if (!isRunning) {
            currentY = el.scrollTop;
            targetY = el.scrollTop;
        }

        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 36;

        const clampedDelta = Math.sign(delta) * Math.min(Math.abs(delta), 100) * 0.65;
        const maxScroll = el.scrollHeight - el.clientHeight;
        targetY = Math.max(0, Math.min(maxScroll, targetY + clampedDelta));

        if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(tick);
        }
    }, { passive: false });
};

initScrollDampener();
renderTasks();
