import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    constructor(title, description, date, projectIndex, taskIndex) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.projectIndex = projectIndex;
      this.taskIndex = taskIndex;
      this.completed = false;
    }
  }

  function addTask(title, description, date, projectIndex, taskIndex) {
    const task = new Task(title, description, date, projectIndex, taskIndex);

    projects.projectsList[projectIndex].tasks.push(task);
    dom.getTasks('project', projectIndex);
  }

  function deleteTask(menuTitle, projectIndex, taskIndex) {
    if (projectIndex > -1) {
      projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
      // dom.getTasks(menuTitle, projectIndex);
      dom.getTasks(menuTitle, projectIndex);
    }
  }

  function toggleTaskCompletion(menuTitle, projectIndex, taskIndex) {
    console.log(projects.projectsList[projectIndex].tasks[taskIndex].completed);

    if (
      projects.projectsList[projectIndex].tasks[taskIndex].completed === false
    ) {
      projects.projectsList[projectIndex].tasks[taskIndex].completed = true;
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].completed = false;
    }

    dom.getTasks(menuTitle, projectIndex);
  }

  return {
    addTask,
    deleteTask,
    toggleTaskCompletion,
  };
})();

export default tasks;
