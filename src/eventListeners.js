import dom from './dom';
import projects from './projects';
const form = document.querySelector('#project-form');
const addProjectBtn = document.querySelector('#add-project');
const projectSubmitBtn = document.querySelector('.project-submit-button');
const projectCancelBtn = document.querySelector('.cancel-button');

export function createEventListener() {
  addProjectBtn.addEventListener('click', showAddProjectForm);
  projectSubmitBtn.addEventListener('click', submitProject);
  projectCancelBtn.addEventListener('click', cancelForm);
}
function showAddProjectForm() {
  form.classList.remove('hidden');
  addProjectBtn.classList.add('hidden');
}
function submitProject(e) {
  e.preventDefault();
  const projectTitle = document.querySelector('#projectInput').value;
  projects.addProject(projectTitle);
  addProjectBtn.classList.remove('hidden');
  form.classList.add('hidden');
}

function cancelForm() {
  form.classList.add('hidden');
  addProjectBtn.classList.remove('hidden');
}
