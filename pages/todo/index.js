// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const taskId = new Date().getTime();
    const taskList = document.querySelector('#taskList');
  
    const form = document.querySelector('#taskForm');
    const formData = new FormData(form);
  
    const taskTitle = formData.get('title');
    const taskDescription = formData.get('description');
  
    const li = document.createElement('li');
  
    li.id = `task_${taskId}`;
    li.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
    `;
  
    taskList.appendChild(li);
  
    // Salvar tarefas no localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
    localStorage.setItem(taskKey, JSON.stringify(tasks));
  
    form.reset();
  }
  
  function openEditDialog(taskId) {
    const editDialog = document.getElementById("editDialog");
    const task = document.getElementById(`task_${taskId}`);
    const taskTitle = task.querySelector("h2").textContent;
    const taskDescription = task.querySelector("p").textContent;
  
    // Preencher os campos do formulário de edição
    editDialog.querySelector("#title").value = taskTitle;
    editDialog.querySelector("#description").value = taskDescription;
  
   
    editDialog.dataset.taskId = taskId;
  

    editDialog.showModal();
  }
  
  function cancelEditDialog() {
    const editDialog = document.getElementById("editDialog");
    editDialog.close();
}