let toDo = [];

//factory function to create toDo list

const createToDo = (title, descripion, dueDate, priority, checkList) => {
  console.log('called create to do module now');
  console.log({ title, descripion, dueDate, priority, checkList });
  console.log(
    'pushing this above object to the toDo array in create-to-do.js module'
  );
  toDo.push({ title, descripion, dueDate, priority, checkList });
  console.log(toDo);

  return { title, descripion, dueDate, priority, checkList };
};

export default createToDo;
