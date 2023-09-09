import projects from './projects';
import { format, parseISO, differenceInDays } from 'date-fns';

const dom = (() => {
  const tasksList = document.querySelector('.tasks-list');
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

  function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    // console.log(
    //   'the menuTitle, projectIndexStart, projectIndexEnd from showTasks is shown as:',
    //   menuTitle,
    //   projectIndexStart,
    //   projectIndexEnd
    // );
    // console.log(
    //   'todayDate using parse Iso in showtasks method in dom.js file',
    //   parseISO(todayDate) // Sat Sep 09 2023 00:00:00 GMT+0545 (Nepal Time)
    // );

    tasksList.textContent = '';
    // GENERATE TASKS LIST
    for (let i = projectIndexStart; i < projectIndexEnd; i++) {
      //looping through each project if the selection is all
      for (let j = 0; j < projects.projectsList[i].tasks.length; j++) {
        const taskDiv = document.createElement('div');
        const taskIconAndTextDiv = document.createElement('div');

        const taskText = document.createElement('p');
        const taskInfo = document.createElement('div');
        const taskDate = document.createElement('p');
        const taskTrashIcon = document.createElement('span');
        const taskInfoIcon = document.createElement('span');

        // #1 IF CLICKED ON MENU LINK 'TODAY'
        if (menuTitle === 'today') {
          if (projects.projectsList[i].tasks[j].date !== todayDate) {
            continue; // If client has clicked today button and task isn't for today - skip the task
          }

          //#2 IF CLICKED ON MENU LINK 'WEEK'
        } else if (menuTitle === 'week') {
          const dateOfToday = parseISO(todayDate);
          const dateOfTask = parseISO(projects.projectsList[i].tasks[j].date);

          if (
            !(
              differenceInDays(dateOfTask, dateOfToday) <= 7 &&
              differenceInDays(dateOfTask, dateOfToday) >= 0
            )
          ) {
            continue; // If client has clicked week button and task isn't for week - skip the task
          }

          // IF CLICKED ON MENU LINK 'COMPLETED'
        } else if (
          menuTitle === 'completed' &&
          projects.projectsList[i].tasks[j].completed !== true
        ) {
          continue; // If task isn't completed yet - skip it
        }

        // TASK PRIORITY, TEXT AND ITS DIV
        taskDiv.classList.add('task-div', 'hover-element');
        taskIconAndTextDiv.classList.add('flex');
        taskDiv.setAttribute('data-project-index', i);
        taskDiv.setAttribute('data-task-index', j);

        taskText.classList.add('task-text');
        taskText.textContent = projects.projectsList[i].tasks[j].title;
        taskText.setAttribute('data-project-index', i);
        taskText.setAttribute('data-task-index', j);

        // TASK INFO DIV
        taskInfo.classList.add('flex');

        // TASKS DUE DATE
        taskDate.classList.add('due-date', 'padding-right');
        if (projects.projectsList[i].tasks[j].date !== undefined) {
          taskDate.textContent = projects.projectsList[i].tasks[j].date;
        } else {
          taskDate.textContent = '';
        }

        // TASK DELETE ICON

        taskTrashIcon.classList.add(
          'material-symbols-outlined',
          'delete-task',
          'block'
        );
        taskTrashIcon.innerText = 'delete';
        taskTrashIcon.setAttribute('data-project-index', i);
        taskTrashIcon.setAttribute('data-task-index', j);

        // TASK INFO ICON
        taskInfoIcon.classList.add(
          'material-symbols-outlined',
          'delete-task',
          'block'
        );
        taskInfoIcon.innerText = 'circle';
        taskInfoIcon.setAttribute('data-project-index', i);
        taskInfoIcon.setAttribute('data-task-index', j);

        // APPENDS
        taskIconAndTextDiv.appendChild(taskInfoIcon);
        taskIconAndTextDiv.appendChild(taskText);
        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskTrashIcon);
        taskDiv.appendChild(taskIconAndTextDiv);
        taskDiv.appendChild(taskInfo);
        tasksList.appendChild(taskDiv);

        // TASK COMPLETION
        if (projects.projectsList[i].tasks[j].completed === false) {
          taskText.classList.remove('task-done-text');
        } else {
          taskText.classList.add('task-done-text');
        }
      }
    }
    // manipulateModal('close');
  }

  function getTasks(menuTitle, projectIndex) {
    let projectIndexStart;
    let projectIndexEnd;

    // SAVE PROJECTS WITH TASKS TO LOCAL STORAGE
    // console.log(
    //   'This is from dom ko gettasks function, below is the result of JSON.stringify(projects.projectsList)',
    //   JSON.stringify(projects.projectsList)
    // );
    localStorage.setItem('projects', JSON.stringify(projects.projectsList));

    // IF CLICKED ON PROJECT LINK
    if (menuTitle === 'project') {
      projectIndexStart = projectIndex;
      projectIndexEnd = projectIndex + 1; // arko index bhanko arko project ho tei bhayer +1 gareko

      // IF CLICKED ON MENU LINK
    } else {
      projectIndexStart = 0;
      projectIndexEnd = projects.projectsList.length; // menuTitle all chai index.js bata aucha aile
    }
    showTasks(menuTitle, projectIndexStart, projectIndexEnd);
  }

  return {
    showProjects,
    getTasks,
  };
})();

export default dom;
