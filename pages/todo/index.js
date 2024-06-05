const taskKey = '@tasks';

let selectedTaskId = null;


function addTask(event) {
  event.preventDefault(); 
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = `id-${taskId}`;
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
    <button title="Excluir tarefa" onclick="deleteTask(${taskId})">❌</button>
  `;

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  selectedTaskId = tasks.findIndex((task) => task.id === taskId);
  const task = tasks[selectedTaskId];

  const dialog = document.querySelector('dialog');

  const editTitle = document.querySelector('#editTaskForm #title');
  const editDescription = document.querySelector('#editTaskForm #description');

  editTitle.value = task.title;
  editDescription.value = task.description;

  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
}

function editTask(event) {
  event.preventDefault();

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  if (selectedTaskId !== null) {
    const task = tasks[selectedTaskId];

    const editForm = document.querySelector('#editTaskForm');
    const formData = new FormData(editForm);

    task.title = formData.get('title');
    task.description = formData.get('description');

    // Atualizar a tarefa no localStorage
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    // Atualizar a tarefa na lista de tarefas
    const taskListItem = document.querySelector(`#id-${task.id}`);
    taskListItem.querySelector('h2').textContent = task.title;
    taskListItem.querySelector('p').textContent = task.description;

    closeDialog();
  }
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  tasks = tasks.filter(task => task.id !== taskId);

  // Atualizar o localStorage
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  // Remover a tarefa da lista de tarefas
  const taskListItem = document.querySelector(`#id-${taskId}`);
  if (taskListItem) {
    taskListItem.remove();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
            <button title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
           <button title="Excluir tarefa" onclick="deleteTask(${task.id})">❌</button>
      </li>
    `
    )
    .join('');
});
