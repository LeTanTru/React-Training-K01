import { banIcon, checkIcon, deleteIcon, flagIcon, inboxIcon } from '@/assets';

export const initData = [
  {
    id: crypto.randomUUID(),
    name: 'Quét nhà',
    isImportant: true,
    isCompleted: false,
    isDeleted: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Đi chơi',
    isImportant: true,
    isCompleted: true,
    isDeleted: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Dắt chó đi dạo',
    isImportant: false,
    isCompleted: true,
    isDeleted: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Coding',
    isImportant: true,
    isCompleted: false,
    isDeleted: false
  }
];

export const filterItems = [
  { id: 'all', label: 'All', icon: inboxIcon },
  { id: 'important', label: 'Important', icon: flagIcon },
  { id: 'not-completed', label: 'Not Completed', icon: banIcon },
  { id: 'completed', label: 'Completed', icon: checkIcon },
  { id: 'deleted', label: 'Delete', icon: deleteIcon }
];
