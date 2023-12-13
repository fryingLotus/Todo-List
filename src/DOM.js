
import Task,{ AddTaskItem, TaskProject,RemoveTaskItem} from './Task';
import trash from './assets/trash-2.svg';

import { format } from 'date-fns';





let projects = [];
let currentProject = null;

let filterTaskFlag = false;
let filterType = "";
const changeTabRightButton = document.querySelectorAll('[data-button]');

changeTabRightButton.forEach(button => {
  button.addEventListener('click',() => {
    changeTabRightButton.forEach(btn => {
      btn.style.backgroundColor = '#fecdd3';
    })
    button.style.backgroundColor = '#ff5338';

  })
  
})

const getPriority = document.getElementById('priority');
getPriority.addEventListener('click',() => {
  console.log("Priority")
  filterType = "priority";
  refreshTaskDisplay();
})

const getToday = document.getElementById('today');
getToday.addEventListener('click',() => {
  console.log("Today")
  filterType = "today";
  refreshTaskDisplay();
})

const allTasks = document.getElementById('AllTask');
allTasks.addEventListener('click',() => {
    console.log("none")
  filterType = "none";
  refreshTaskDisplay();
})


export function getProjectValue() {
  const secondContent = document.querySelector('.second-content');
  secondContent.addEventListener('click', handleSecondContentClick);
}

function handleSecondContentClick(event) {
  if (event.target.closest('.left-button-list')) {
    changeButtonToInput();
  }
}

function changeButtonToInput() {
  let leftButtonList = document.querySelector('.left-button-list');
  const originalState = leftButtonList.outerHTML;
  const newButton = `
    <div class="left-button-list-active">
      <input type="text" id="project-input" placeholder="Enter project name">
      <div class="add-project-group">
        <button id="submit-button">Submit</button>
        <button id="cancel-button">Cancel</button>
      </div>
    </div>
  `;

  leftButtonList.outerHTML = newButton;
  leftButtonList = document.querySelector('.left-button-list-active');

  document.querySelector('#submit-button').addEventListener('click', handleProjectSubmit);
  document.querySelector('#cancel-button').addEventListener('click', () => revertButtonState(originalState, leftButtonList));
}

export function handleProjectSubmit() {
  const projectInputValue = document.querySelector('#project-input').value;
  const projectList = document.getElementById('projects-list');
  if (projectInputValue === "")
  {
    alert("No empty project name!");
    return;
  } else {

    const projectExist = projects.some(project => project.name === projectInputValue);
    if (projectExist){
      alert("Project Already Exist with the same title");
      return;
    }
    const newProject = new TaskProject(projectInputValue);
    projects.push(newProject);
    currentProject = newProject;
    saveProject();
  }
  let projectButton = document.createElement('BUTTON');
  projectButton.classList.add('project-button');
  let deleteProjectButton = document.createElement('BUTTON');
  let img = document.createElement('img');
  img.src = trash;
  deleteProjectButton.append(img);

  deleteProjectButton.addEventListener('click',(event) => {
    event.stopPropagation();

    const projectIndex = projects.findIndex(p => p.name === projectInputValue);
    if (projectIndex > -1)
    {
      projects.splice(projectIndex,1);
    }

    projectButton.remove();
  })

  let pButton = document.createElement('p');
  pButton.classList.add('pButton');
  pButton.textContent = projectInputValue;
  projectButton.append(pButton,deleteProjectButton);
  projectList.append(projectButton);




  const taskName = document.querySelector('.task-name');
  taskName.textContent = currentProject.name;

  let projectAllbutton = document.querySelectorAll('.project-button');
  projectAllbutton.forEach(button => {
    button.addEventListener('click',() => {
      projectAllbutton.forEach(function(btn) {
        btn.style.backgroundColor = '#fecdd3';
      })
      button.style.backgroundColor = '#ff5338';
      const project = projects.find(p => p.name === button.textContent);
      if (project) {
        currentProject = project;

       
        refreshTaskDisplay();

        // Update the task name to match the project name
        taskName.textContent = currentProject.name;

        console.log(`Current Project: ${currentProject.name}`);
        console.log('Tasks:', currentProject.tasks);
      }
    })
  })
}
function revertButtonState(originalState, leftButtonList) {
  leftButtonList.outerHTML = originalState;
  leftButtonList = document.querySelector('.left-button-list');
}
const form = document.querySelector(".formStyle");

export function ButtonTask() // This function will just open the modal 
{
  const addTaskInput = document.querySelector(".right-button");
  const modal = document.querySelector("#modal");

  addTaskInput.addEventListener('click',() => {
    openModal(modal);
  })
  

}


export function handleFormSubmit(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const getTitle = document.getElementById('taskTitle').value;
    const getDate = document.getElementById('taskDate').value;
    const getPriority = document.getElementById('priorityList').value;
    
    if (currentProject)
    {
      const taskExists = currentProject.tasks.some(task => task.title === getTitle);
      if (taskExists){
        alert("No same title!");
        return;
      }
      let addTaskItem = new AddTaskItem(currentProject);
    
      addTaskItem.addTask(getTitle,getDate,getPriority);
      saveProject();
      refreshTaskDisplay();
      checkList();
      
    }

  });
}
handleFormSubmit(form);


export function checkList()
{
  let checkBoxes = document.querySelectorAll('.checkBox');

  checkBoxes.forEach(checkBox => {
    let checkBoxFlag = true;
    checkBox.addEventListener('click',() => {
      if (checkBoxFlag === true)
      {
        checkBox.classList.add('checkBox-active');
        checkBoxFlag = false;
      } else {
        checkBox.classList.remove('checkBox-active');
        checkBoxFlag = true;
      }
    })
  })
  // checkBoxes.addEventListener("click",() =>
  // {
  //   if (checkBoxFlag === true){
  //   checkBoxes.classList.add('checkBox-active');
  //   checkBoxFlag = false;
  //   } else {
  //     checkBoxes.classList.remove('checkBox-active');
  //     checkBoxFlag = true;
  //   }
  // });
}



let project = new TaskProject('Gaming');

let newTask = new AddTaskItem(project);
newTask.addTask("Hello","2020-12-08","High");
let newTask2 = new AddTaskItem(project);
newTask2.addTask("World","2020-9-04","Low");
currentProject = project;
refreshTaskDisplay();
// GET DATE

const projectListContainer = document.getElementById('projects-list');

// Function to render projects and tasks
function renderProjectsAndTasks() {
  projectListContainer.innerHTML = ''; // Clear existing content

  // Loop through each project and display its tasks
  projects.forEach(project => {
    const projectButton = document.createElement('button');
    projectButton.classList.add('project-button');
    projectButton.textContent = project.name;

    // Add event listener to switch current project and display tasks
    projectButton.addEventListener('click', () => {
      currentProject = project;
      refreshTaskDisplay(); // Update the displayed tasks for the selected project
      // Update UI to reflect the selected project (if needed)
      const taskName = document.querySelector('.task-name');
      taskName.textContent = currentProject.name;
    });

    projectListContainer.appendChild(projectButton);
  });

  // Display tasks of the current project
  refreshTaskDisplay();
}



function refreshTaskDisplay() {
  console.log('curren t project:',currentProject)
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';
  // const getPriorty = document.getElementById('priority');
  let taskToDisplay = currentProject.tasks;
  // if (filterTaskFlag)
  // {
  //   taskToDisplay = currentProject.getHighPriorityTasks();
  
  // }

  if (filterType == "priority")
  {
        taskToDisplay = currentProject.getHighPriorityTasks();
  } else if (filterType == "today")
  {
      taskToDisplay = currentProject.getTodayDate();
  } else if (filterType == "none")
  {
    taskToDisplay = currentProject.tasks;
  }
  if (currentProject){
  taskToDisplay.forEach((task,index)=> {
    const taskElement = document.createElement('div');
    taskElement.classList.add('card');
   
    const taskHTML = `
      <input type="button" class="checkBox">
      <h3>${task.title}</h3>
      <h3>${task.dueDate}</h3>
      <h3>${task.priority}</h3>
    `;
  
    taskElement.innerHTML = taskHTML;
    
    let deleteButton = document.createElement("BUTTON");
    deleteButton.classList.add("deleteButton")
    let img = document.createElement('img');
    img.src = trash;
    deleteButton.append(img);
   
    deleteButton.addEventListener('click', () => {
      let removeTaskItem = new RemoveTaskItem(currentProject);
      removeTaskItem.RemoveTask(index);
      refreshTaskDisplay();
    });

    taskElement.append(deleteButton);
    
    taskList.append(taskElement);
  });
}
}

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

export function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

export function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

export function saveProject()
{
  let myProjectStorage = JSON.stringify(projects);
  localStorage.setItem('projects', myProjectStorage);
  console.log("Projects saved:", myProjectStorage);

}
export function parseProject() {
  let displayProject = localStorage.getItem("projects");
  let arrayProject = JSON.parse(displayProject);
  if (arrayProject !== null) {
    projects = arrayProject.map(TaskProject.fromPlainObject);
    currentProject = projects[0]; // or set it based on some saved state
  } else {
    console.log("No projects found in local storage!");
  }
  refreshTaskDisplay();

}
//storage


window.onload = function() {
  checkList();
  parseProject(); // Retrieve projects from localStorage
  renderProjectsAndTasks(); // Display projects and tasks
};