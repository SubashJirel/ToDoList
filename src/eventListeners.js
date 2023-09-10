import dom from './dom';
import projects from './projects';
const form = document.querySelector('#project-form');
const addProjectBtn = document.querySelector('#add-project');
const projectSubmitBtn = document.querySelector('.project-submit-button');
const projectCancelBtn = document.querySelector('.cancel-button');
const projectCollectionDiv = document.querySelector('.project-collection');

export function createEventListener() {
  addProjectBtn.addEventListener('click', showAddProjectForm);
  projectSubmitBtn.addEventListener('click', submitProject);
  projectCancelBtn.addEventListener('click', cancelForm);
  projectCollectionDiv.addEventListener('click', deleteProject);
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

function deleteProject(e) {
  if (e.target.classList.contains('delete-project')) {
    //   alert('clicked in delete project');
    const indexOfClickedProject = parseInt(
      e.target.getAttribute('data-link-index'),
      10
    );
    console.log('clicked project index is ...', indexOfClickedProject);
    projects.deleteProject(indexOfClickedProject);
  }
}
