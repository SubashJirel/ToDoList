import { blankProjectLoad } from './blank-project-load';

export const initialDomManipulation = () => {
  const contentDiv = document.querySelector('.content');
  contentDiv.appendChild(createHead());
  contentDiv.appendChild(createMain());

  const mainDiv = document.querySelector('#main');
  mainDiv.appendChild(createSubHeading(blankProjectLoad().projectTitle));
};

function createHead() {
  const heading = document.createElement('h1');
  heading.textContent = 'Todo List';
  return heading;
}

function createMain() {
  const main = document.createElement('div');
  main.classList.add('main');
  main.setAttribute('id', 'main');
  return main;
}

function createSubHeading(text) {
  const subHeading = document.createElement('h3');
  subHeading.textContent = text;
  return subHeading;
}
