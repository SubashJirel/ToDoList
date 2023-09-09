import projects from './projects';

const dom = (() => {
  function showProjects() {
    // SAVE PROJECTS TO LOCAL STORAGE
    localStorage.setItem('projects', JSON.stringify(projects.projectsList));
    const projectCollectionDiv = document.querySelector('.project-collection');

    //add Project button in left panel
    const addProject = document.querySelector('#add-project');

    for (let i = 0; i < projects.projectsList.length; i++) {
      const projectLink = document.createElement('a');
      const projectIconAndTextDiv = document.createElement('div');
      const projectIcon = document.createElement('span');
      projectIcon.classList.add('material-symbols-outlined');
      projectIcon.innerText = 'lists';
      const projectText = document.createElement('p');
      const projecTrashIconDiv = document.createElement('div');
      const projectTrashIcon = document.createElement('span');
      projectTrashIcon.classList.add('material-symbols-outlined');
      projectTrashIcon.innerText = 'delete';

      // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS
      projectIconAndTextDiv.classList.add(
        'project-icon-and-text-div',
        'project',
        'select'
      );
      projectIconAndTextDiv.setAttribute('data-link-index', i);
      projecTrashIconDiv.classList.add(
        'project-trash-icons-div',
        'project',
        'select'
      );
      projecTrashIconDiv.setAttribute('data-link-index', i);

      // PROJECT LINK
      projectLink.classList.add('link', 'project-link', 'project', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-link-index', i);

      projectIcon.setAttribute('data-link-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
      projectText.textContent = projects.projectsList[i].title;
      projectText.setAttribute('data-link-index', i);

      projectTrashIcon.setAttribute('data-link-index', i);

      // APPENDS
      projectIconAndTextDiv.appendChild(projectIcon);
      projectIconAndTextDiv.appendChild(projectText);
      projecTrashIconDiv.appendChild(projectTrashIcon);
      // projectIconAndTextDiv.appendChild(projectTrashIcon);
      projectLink.appendChild(projectIconAndTextDiv);
      projectLink.appendChild(projecTrashIconDiv);
      console.log('this is project link from dom', projectLink);
      console.log(
        'this is the div where link is going to be stored',
        projectCollectionDiv
      );
      projectCollectionDiv.insertBefore(projectLink, addProject);
    }
    // manipulateModal('close');
  }

  return {
    showProjects,
  };
})();

export default dom;
