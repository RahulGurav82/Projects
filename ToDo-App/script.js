document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskValue = taskInput.value.trim();
  
  if (taskValue === '') {
    alert('Please enter a task');
    return;
  }
  
  const taskList = document.getElementById('taskList');
  
  // Create task item
  const taskItem = document.createElement('li');
  taskItem.className = 'task';
  
  const taskText = document.createElement('span');
  taskText.textContent = taskValue;
  
  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const newTask = prompt('Edit your task:', taskText.textContent);
    if (newTask) {
      taskText.textContent = newTask;
    }
  });
  
  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
  });
  
  // Append elements
  taskItem.appendChild(taskText);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
  
  // Clear input
  taskInput.value = '';
}