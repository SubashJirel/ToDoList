import dom from './dom';
const projects = (() => {
  let projectsList = [];

  // GET DEFAULT PROJECTS AND TASKS FROM LOCAL STORAGE
  if (localStorage.getItem('projects') === null) {
    projectsList = [
      {
        title: 'default Project',
        tasks: [
          {
            title: 'This is a sample task',
            description: 'some short description',
            date: '2000-01-01',
            priority: 'low',
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
      {
        title: 'Workout',
        tasks: [
          {
            title: 'Do regular home workout',
            description: 'Just do it',
            date: '2023-01-01',
            priority: 'high',
            projectIndex: 1,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
    ];
  } else {
    const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
    projectsList = projectsFromStorage;
  }

  class Project {
    constructor(title) {
      this.title = title;
      this.tasks = [];
    }
  }

  function addProject(title) {
    const project = new Project(title);
    projectsList.push(project);
    //after you have added project you have to render later
    dom.showProjects();
  }

  function deleteProject(index) {
    if (index > -1) {
      projectsList.splice(index, 1);
    }
    //after you have deleted project from the projectList you have to render later
    dom.showProjects();
  }

  return {
    projectsList,
    addProject,
    deleteProject,
  };
})();

export default projects;
