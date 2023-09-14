import dom from './dom';
import projects from './projects';
import tasks from './tasks';
const form = document.querySelector('#project-form');
const addProjectBtn = document.querySelector('#add-project');
const projectSubmitBtn = document.querySelector('.project-submit-button');
const projectCancelBtn = document.querySelector('.cancel-button');
const projectCollectionDiv = document.querySelector('.project-collection');
const homeDiv = document.querySelector('#home');
const addTaskBtn = document.querySelector('#add-list');
const addTaskForm = document.querySelector('#list-form');
const h1HeadTitle = document.querySelector('#main-head-title');
const rightPanelDiv = document.querySelector('#right-panel');
const leftPanelDiv = document.querySelector('#left-panel');

//left 3 static event listeners
const allTasks = document.querySelector('#all-tasks');
const today = document.querySelector('today');
const thisWeek = document.querySelector('#this-week');

export function createEventListener() {
  addProjectBtn.addEventListener('click', showAddProjectForm);
  projectSubmitBtn.addEventListener('click', submitProject);
  projectCancelBtn.addEventListener('click', cancelForm);
  projectCollectionDiv.addEventListener('click', showOrDeleteProject);
  homeDiv.addEventListener('click', changeTitle);
  addTaskBtn.addEventListener('click', showForm);
  addTaskForm.addEventListener('click', taskFormSubmissionOrCancellation);
  rightPanelDiv.addEventListener('click', tasksDeletionOrToggleCompleted);
  document.addEventListener('DOMContentLoaded', function () {
    leftPanelDiv.addEventListener('click', changeBackgroundColorLeftDivs);
  });
}
function changeTitle(e) {
  if (e.target.classList.contains('home-title')) {
    let selectedIndex = parseInt(e.target.getAttribute('data-home-index'));
    dom.showMainTitle(selectedIndex);
    addTaskBtn.classList.add('hidden');

    //now show the specific tasks in the right panel
    // console.log(e.target.id);
    const menuTitle = e.target.id;
    const projectIndex = e.target.getAttribute('data-home-index');
    dom.getTasks(menuTitle, projectIndex);
  }
}

function showAddProjectForm() {
  form.classList.remove('hidden');
  addProjectBtn.classList.add('hidden');
}
function submitProject(e) {
  e.preventDefault();
  const projectTitle = document.querySelector('#projectInput').value;
  if (projectTitle === '') {
    alert('Please enter project title');
    return;
  }
  projects.addProject(projectTitle);
  addProjectBtn.classList.remove('hidden');
  document.querySelector('#projectInput').value = '';
  form.classList.add('hidden');
}

function cancelForm() {
  form.classList.add('hidden');
  document.querySelector('#projectInput').value = '';
  addProjectBtn.classList.remove('hidden');
}

function showOrDeleteProject(e) {
  if (e.target.classList.contains('delete-project')) {
    //   alert('clicked in delete project');
    const indexOfClickedProject = parseInt(
      e.target.getAttribute('data-link-index'),
      10
    );
    console.log('clicked project index is ...', indexOfClickedProject);
    projects.deleteProject(indexOfClickedProject);
  } else {
    let clickedIndex = e.target.getAttribute('data-link-index');
    dom.showProjectTitle(clickedIndex);
    dom.getTasks('project', clickedIndex);
  }
}
function showForm() {
  addTaskForm.classList.remove('hidden');
}
function taskFormSubmissionOrCancellation(event) {
  const { target } = event; // object destruring
  if (target.classList.contains('cancel-button')) {
    addTaskForm.classList.add('hidden');
  } else if (target.classList.contains('task-submit-button')) {
    event.preventDefault();
    const projecName = h1HeadTitle.textContent;
    const projectIndex = projects.projectsList.findIndex((project) => {
      return project.title === projecName;
    });
    const nextTaskIndex = projects.projectsList[projectIndex].tasks.length;
    // console.log('worked and the project index is', projectIndex);
    // console.log('worked and the task index is', nextTaskIndex);
    const { taskTitle, taskDetail, taskDate } = formDataRetrieve();
    console.log(taskTitle, taskDetail, taskDate);
    if (taskTitle.length < 1) {
      alert('Please Enter the title of the task.');
    } else {
      addTaskForm.classList.add('hidden');
      formDataClear();
    }

    tasks.addTask(taskTitle, taskDetail, taskDate, projectIndex, nextTaskIndex);
    // addTaskForm.reset()
    // dom.getTasks('project', projectIndex);
  } else {
    return;
  }
}

function formDataRetrieve() {
  const taskTitle = document.querySelector('#listInput').value;
  const taskDetail = document.querySelector('#listInputDetail').value;
  const taskDate = document.querySelector('#listInputDate').value;
  return {
    taskTitle,
    taskDetail,
    taskDate,
  };
}
function formDataClear() {
  document.querySelector('#listInput').value = '';
  document.querySelector('#listInputDetail').value = '';
  document.querySelector('#listInputDate').value = '';
}
function tasksDeletionOrToggleCompleted(event) {
  const { target } = event;

  if (target.classList.contains('delete-task')) {
    const projectIndex = target.getAttribute('data-project-index');
    const taskIndex = target.getAttribute('data-task-index');
    const menuTitle = checkMenuTitle(h1HeadTitle.textContent);
    tasks.deleteTask(menuTitle, projectIndex, taskIndex);
  } else if (target.classList.contains('toggle-complete')) {
    const projectIndex = target.getAttribute('data-project-index');
    const taskIndex = target.getAttribute('data-task-index');
    const menuTitle = checkMenuTitle(h1HeadTitle.textContent);
    tasks.toggleTaskCompletion(menuTitle, projectIndex, taskIndex);
  }
}
function checkMenuTitle(menuTitle) {
  if (menuTitle == 'All Tasks') {
    return 'all';
  } else if (menuTitle == 'Today') {
    return 'today';
  } else if (menuTitle == 'This Week') {
    return 'week';
  } else {
    return 'project';
  }
}

function changeBackgroundColorLeftDivs(event) {
  const homeDivs = document.querySelectorAll('.home-title');
  const projectDivs = document.querySelectorAll('.project-link');
  const arrayOfLeftDivs = [...homeDivs, ...projectDivs];
  function changeNotSelectedDivColor() {
    arrayOfLeftDivs.forEach((div) => {
      if (div.classList.contains('active')) {
        div.classList.remove('active');
      }
    });
  }
  if (event.target.closest('.home-title')) {
    changeNotSelectedDivColor();
    event.target.closest('.home-title').classList.add('active');
  } else if (event.target.closest('.project-link')) {
    changeNotSelectedDivColor();
    event.target.closest('.project-link').classList.add('active');
  } else {
    event.stopPropagation();
  }
}
