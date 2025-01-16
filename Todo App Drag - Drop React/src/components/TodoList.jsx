import TodoItem from '@/components/TodoItem';

const TodoList = ({
  filterTodos,
  handleComplete,
  handleMarkImportant,
  handleDelete,
  handleUpdate,
  handleDragStart,
  handleDragEnd,
  handleDragOver
}) => {
  return (
    <div className='mt-2 flex w-full flex-col gap-y-2'>
      {filterTodos.map((todoItem) => (
        <TodoItem
          id={todoItem.id}
          key={todoItem.id}
          name={todoItem.name}
          isImportant={todoItem.isImportant}
          isCompleted={todoItem.isCompleted}
          isDeleted={todoItem.isDeleted}
          handleComplete={handleComplete}
          handleMarkImportant={handleMarkImportant}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
        ></TodoItem>
      ))}
    </div>
  );
};
export default TodoList;
