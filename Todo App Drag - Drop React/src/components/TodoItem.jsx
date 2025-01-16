import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import {
  faRefresh,
  faStar as faSolidStar,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoItem = ({
  id,
  name,
  isCompleted,
  isDeleted,
  isImportant,
  handleUpdate,
  handleComplete,
  handleMarkImportant,
  handleDelete,
  handleDragStart,
  handleDragOver,
  handleDragEnd
}) => {
  return (
    <div
      draggable
      onClick={() => handleUpdate(id)}
      onDragStart={(event) => handleDragStart(event, id)}
      onDragOver={(event) => handleDragOver(event, id)}
      onDragEnd={(event) => handleDragEnd(event)}
      className={`flex cursor-pointer justify-between rounded-lg p-2 shadow-md ${
        isCompleted && !isDeleted
          ? 'bg-green-200'
          : isDeleted
            ? 'bg-slate-300'
            : 'bg-white'
      }`}
    >
      <div className='flex items-start gap-x-2 leading-[1.43]'>
        <div
          className={`cursor-pointer ${isDeleted ? 'pointer-events-none' : ''}`}
        >
          <input
            type='checkbox'
            className='cursor-pointer'
            checked={isCompleted}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleComplete(id)}
          />
        </div>
        <p
          className={`text-[16px] font-normal text-[#616161] ${
            isDeleted ? 'line-through' : ''
          }`}
        >
          {name}
        </p>
      </div>
      <div className='flex gap-x-2'>
        <p
          onClick={(event) => handleMarkImportant(event, id)}
          className={`cursor-pointer justify-self-end ${
            isDeleted ? 'pointer-events-none' : ''
          }`}
        >
          <FontAwesomeIcon
            icon={isImportant ? faSolidStar : faRegularStar}
            className={isImportant ? 'text-yellow-400' : ''}
          />
        </p>
        <p
          onClick={(event) => handleDelete(event, id)}
          className='cursor-pointer'
        >
          <FontAwesomeIcon icon={isDeleted ? faRefresh : faTrash} />
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
