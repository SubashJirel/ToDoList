// facotory functin to create blank project array list

export const blankProjectLoad = () => {
  console.log(
    'called blankProjectLoad module... creating blank project array now'
  );
  let projectArray = [];
  let projectTitle = 'Default Project';
  projectArray.push({ projectTitle });
  console.log(
    'displaying the project array  where an object with defulat title was pushed'
  );
  console.log(projectArray);
  return { projectArray, projectTitle };
};
