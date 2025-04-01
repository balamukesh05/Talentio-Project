// Sample task data structure
let tasks = [];

// Dark mode toggle
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;
const container = document.querySelector('.container');

toggleDarkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    toggleDarkModeButton.classList.toggle('dark-mode');
});

// Add a new task
function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;

    if (title === '' || description === '') {
        alert("Title and Description are required.");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        category,
        priority,
        completed: false
    };

    tasks.push(task);
    updateTaskList();
    clearInputs();
}

// Update the task list UI
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear existing list

    // Get filtered and sorted tasks
    const filteredTasks = filterTasks();
    const sortedTasks = sortTasks(filteredTasks);

    // Create task items dynamically
    sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.draggable = true;
        taskItem.setAttribute('data-id', task.id);
        taskItem.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${task.id})" ${task.completed ? 'checked' : ''}>
            <strong>${task.title}</strong> - ${task.description} 
            <span>Due: ${task.dueDate} | Priority: ${task.priority}</span>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskItem.addEventListener('dragstart', handleDragStart);
        taskItem.addEventListener('dragover', handleDragOver);
        taskItem.addEventListener('drop', handleDrop);
        taskList.appendChild(taskItem);
    });
}

// Toggle task completion
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    updateTaskList();
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateTaskList();
}

// Filter tasks based on status
function filterTasks() {
    const status = document.getElementById('filterStatus').value;
    if (status === 'All') {
        return tasks;
    }
    return tasks.filter(task => task.completed === (status === 'Completed'));
}

// Sort tasks by due date or priority
function sortTasks(filteredTasks = tasks) {
    const sortBy = document.getElementById('sortTasks').value;
    if (sortBy === 'Priority') {
        return filteredTasks.sort((a, b) => {
            const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    return filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Drag-and-drop functionality
let draggedTask = null;

function handleDragStart(event) {
    draggedTask = event.target;
    draggedTask.classList.add('dragging');
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const taskId = draggedTask.getAttribute('data-id');
    const targetTask = event.target.closest('.task-item');
    if (targetTask && targetTask !== draggedTask) {
        const targetId = targetTask.getAttribute('data-id');
        swapTasks(taskId, targetId);
        draggedTask.classList.remove('dragging');
    }
}

function swapTasks(id1, id2) {
    const index1 = tasks.findIndex(task => task.id == id1);
    const index2 = tasks.findIndex(task => task.id == id2);
    if (index1 !== -1 && index2 !== -1) {
        const temp = tasks[index1];
        tasks[index1] = tasks[index2];
        tasks[index2] = temp;
        updateTaskList();
    }
}

// Clear input fields after task addition
function clearInputs() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskCategory').value = 'Work';
    document.getElementById('taskPriority').value = 'Low';
}

// Initialize task list on page load
updateTaskList();
