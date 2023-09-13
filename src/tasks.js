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

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
      dom.getTasks('all');
    }
  }

  return {
    addTask,
    deleteTask,
  };
})();

export default tasks;
