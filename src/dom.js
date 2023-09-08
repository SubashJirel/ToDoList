import projects from './projects';

const dom = () => {
  function showProjects() {
    // SAVE PROJECTS TO LOCAL STORAGE
    localStorage.setItem('projects', JSON.stringify(projects.projectsList));

    for (let i = 0; i < projects.projectsList.length; i++) {
      const projectCollectionDiv = document.querySelector(
        '.project-collection'
      );
      const projectLink = document.createElement('a');
      const projectIconAndTextDiv = document.createElement('div');
      const projectIcon = document.createElement('span');
      projectIcon.classList.add('material-symbols-outlined');
      projectIcon.innerText = 'lists';
      const projectText = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectTrashIcon = document.createElement('i');

      // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS
      projectIconAndTextDiv.classList.add(
        'project-icon-and-text-div',
        'project',
        'select'
      );
      projectIconAndTextDiv.setAttribute('data-link-index', i);
      projectIconsDiv.classList.add(
        'project-default-icons-div',
        'project',
        'select'
      );
      projectIconsDiv.setAttribute('data-link-index', i);

      // PROJECT LINK
      projectLink.classList.add('link', 'project-link', 'project', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-link-index', i);

      // PROJECT ICON
      projectIcon.classList.add(
        'fal',
        'fa-fw',
        'project-icon',
        'project',
        'select',
        'padding-right'
      );
      projectIcon.setAttribute('data-link-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
      projectText.textContent = projects.projectsList[i].title;
      projectText.setAttribute('data-link-index', i);

      projectTrashIcon.classList.add(
        'fal',
        'fa-trash-alt',
        'project',
        'project-icon',
        'delete-project',
        'select',
        'scale-element'
      );
      projectTrashIcon.setAttribute('data-link-index', i);

      // APPENDS
      projectIconsDiv.appendChild(projectTrashIcon);
      projectIconAndTextDiv.appendChild(projectIcon);
      projectIconAndTextDiv.appendChild(projectText);
      projectLink.appendChild(projectIconAndTextDiv);
      projectLink.appendChild(projectIconsDiv);
      projectCollectionDiv.appendChild(projectLink);
    }
    // manipulateModal('close');
  }

  return {
    showProjects,
  };
};

export default dom;
