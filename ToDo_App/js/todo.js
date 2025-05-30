'use strict';

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function get_todos() {
    try {
        const todos = localStorage.getItem('todo');
        return todos ? JSON.parse(todos) : [];
    } catch (e) {
        console.error('Error loading todos:', e);
        return [];
    }
}

function add() {
    const taskInput = document.getElementById('task');
    const task = taskInput.value.trim();
    
    if (!task) {
        alert("Please enter a task.");
        return false;
    }
    
    try {
        const todos = get_todos();
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));
        taskInput.value = '';
        taskInput.focus();
        show();
    } catch (e) {
        console.error('Error saving todo:', e);
        alert('Could not save the task. Please try again.');
    }
    return false;
}

function show() {
    const todos = get_todos();
    const todoList = document.getElementById('todos');
    
    let html = '<ul>';
    todos.forEach((todo, index) => {
        html += `
            <li>
                ${escapeHtml(todo)}
                <button class="remove" id="${index}" aria-label="Delete task">×</button>
            </li>`;
    });
    html += '</ul>';
    
    todoList.innerHTML = html;
    
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', remove);
    });
}

function remove() {
    const id = parseInt(this.getAttribute('id'));
    try {
        const todos = get_todos();
        todos.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
        show();
    } catch (e) {
        console.error('Error removing todo:', e);
        alert('Could not remove the task. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add').addEventListener('click', add);
    
    document.getElementById('task').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            add();
        }
    });
    
    show();
});