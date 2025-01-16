import FilterPanel from '@/components/FilterPanel';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import TodoList from '@/components/TodoList';
import { initData } from '@/constants/constants';
import useDebounce from '@/hooks/useDebounce';
import useLocalStorage from '@/hooks/useLocalStorage';
import { modalChangeValue } from '@/utils/modal';
import { toast } from '@/utils/toast';
import { useRef, useState } from 'react';

const App = () => {
  const [storedData, setStoredData] = useLocalStorage('todoList', initData);
  const [todoList, setTodoList] = useState(storedData);
  const [selectedFilterId, setSelectedFilterId] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [draggedItemId, setDraggedItemId] = useState(null);

  const debouncedSearchText = useDebounce(searchText, 300);

  const inputRef = useRef(null);

  const handleAddTodo = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      setTodoList([
        ...todoList,
        {
          id: crypto.randomUUID(),
          name: event.target.value,
          isImportant: false,
          isCompleted: false
        }
      ]);
      inputRef.current.value = '';
    }
    setStoredData(todoList);
  };
  const filterTodos = todoList.filter((todoItem) => {
    if (
      !todoItem.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
    )
      return false;
    switch (selectedFilterId) {
      case 'all':
        return true;
      case 'completed':
        return todoItem.isCompleted && !todoItem.isDeleted;
      case 'not-completed':
        return !todoItem.isCompleted && !todoItem.isDeleted;
      case 'important':
        return todoItem.isImportant && !todoItem.isDeleted;
      case 'deleted':
        return todoItem.isDeleted;

      default:
        return true;
    }
  });
  const countByFilters = todoList.reduce(
    (acc, item) => {
      let newAcc = { ...acc };
      if (item.isCompleted && !item.isDeleted)
        newAcc = { ...newAcc, completed: newAcc.completed + 1 };
      if (!item.isCompleted && !item.isDeleted)
        newAcc = { ...newAcc, 'not-completed': newAcc['not-completed'] + 1 };
      if (item.isImportant && !item.isDeleted)
        newAcc = { ...newAcc, important: newAcc.important + 1 };
      if (item.isDeleted) newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
      return newAcc;
    },
    {
      all: todoList.length,
      important: 0,
      completed: 0,
      deleted: 0,
      'not-completed': 0
    }
  );
  const handleComplete = (todoId) => {
    const todo = todoList.find((item) => item.id === todoId);
    if (!todo) return;
    toast({
      title: todo.isCompleted ? 'Uncompleted' : 'Completed',
      type: todo.isCompleted ? 'info' : 'success',
      message: todo.isCompleted
        ? `Todo ${todo.name} is uncompleted`
        : `Todo ${todo.name} is completed`
    });
    const newTodoList = todoList.map((item) => {
      if (item.id === todoId) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodoList(newTodoList);
    setStoredData(newTodoList);
  };
  const handleMarkImportant = (event, todoId) => {
    event.stopPropagation();
    const todo = todoList.find((item) => item.id === todoId);
    toast({
      title: todo.isImportant
        ? 'Removed from important'
        : 'Marked as important',
      type: todo.isImportant ? 'info' : 'success',
      message: todo.isImportant
        ? `Todo ${todo.name} is not important`
        : `Todo ${todo.name} is important`
    });
    const newTodoList = todoList.map((item) => {
      if (item.id === todoId) {
        return { ...item, isImportant: !item.isImportant };
      }
      return item;
    });
    setTodoList(newTodoList);
    setStoredData(newTodoList);
  };
  const handleDelete = (event, todoId) => {
    event.stopPropagation();
    const todo = todoList.find((item) => item.id === todoId);

    toast({
      title: todo.isDeleted ? 'Restored' : 'Deleted',
      type: todo.isDeleted ? 'info' : 'success',
      message: todo.isDeleted
        ? `Todo ${todo.name} is restored`
        : `Todo ${todo.name} is deleted`
    });

    const newTodoList = todoList.map((item) => {
      if (item.id === todoId) {
        return { ...item, isDeleted: !item.isDeleted };
      }
      return item;
    });
    setTodoList(newTodoList);
    setStoredData(newTodoList);
  };
  const handleUpdate = (todoId) => {
    const todo = todoList.find((item) => item.id === todoId);

    if (todo.isDeleted) return;

    modalChangeValue({
      title: 'Update todo',
      inputHtml: `
        <input id='input' type="text" class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all ease-linear duration-300' name="name" value="${todo.name}" />
    `,
      actions: [
        {
          label: 'Cancel',
          type: 'secondary'
        },
        {
          label: 'Save',
          type: 'primary',
          callback: (inputValue) => {
            const newTodoList = todoList.map((item) => {
              if (item.id === todoId) {
                return { ...item, name: inputValue.name };
              }
              return item;
            });
            setTodoList(newTodoList);
            setStoredData(newTodoList);
            toast({
              title: 'Updated',
              type: 'success',
              message: `Todo ${todo.name} is updated to ${inputValue.name}`
            });
          }
        }
      ]
    });
  };
  const handleDragStart = (event, todoId) => {
    event.target.classList.add('is-dragging');
    setDraggedItemId(todoId);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('is-dragging');
    setDraggedItemId(null);
  };

  const handleDragOver = (event, todoId) => {
    const draggedItemIndex = todoList.findIndex(
      (todo) => todo.id === draggedItemId
    );
    const targetItemIndex = todoList.findIndex((todo) => todo.id === todoId);

    if (draggedItemIndex !== -1 && targetItemIndex !== -1) {
      const updatedTodoList = [...todoList];
      const [draggedItem] = updatedTodoList.splice(draggedItemIndex, 1);
      updatedTodoList.splice(targetItemIndex, 0, draggedItem);
      setTodoList(updatedTodoList);
      setStoredData(updatedTodoList);
    }
  };

  return (
    <>
      <div className='mx-auto max-w-[800px] p-5'>
        <h1 className='text-center text-3xl font-bold text-white'>Todo App</h1>
        <div className='mt-5 flex rounded-lg bg-[#fafafa]'>
          <FilterPanel
            selectedFilterId={selectedFilterId}
            setSelectedFilterId={setSelectedFilterId}
            countByFilters={countByFilters}
            setSearchText={setSearchText}
            searchText={searchText}
          />
          <div className='flex-1 p-[30px]'>
            <input
              className='w-full rounded-lg border-[2px] border-solid border-blue-50 bg-white px-4 py-2 shadow-md transition-all focus:border-blue-200'
              type='text'
              name='add-new-task'
              placeholder='Add new task'
              ref={inputRef}
              onChange={(event) => event.preventDefault()}
              onKeyDown={handleAddTodo}
            />
            <TodoList
              handleComplete={handleComplete}
              filterTodos={filterTodos}
              handleMarkImportant={handleMarkImportant}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
            ></TodoList>
          </div>
        </div>
      </div>
      <Toast />
      <Modal />
    </>
  );
};
export default App;
