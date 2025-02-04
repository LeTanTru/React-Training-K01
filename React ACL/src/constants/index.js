import { Bounce } from 'react-toastify';

export const USERS_DATA = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    password: 'password456',
    role: 'Editor'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    username: 'mikej',
    password: 'password789',
    role: 'User'
  },
  {
    id: 4,
    name: 'Emily Davis',
    username: 'emilyd',
    password: 'password101',
    role: 'User'
  },
  {
    id: 5,
    name: 'Sarah Brown',
    username: 'sarahb',
    password: 'password202',
    role: 'Editor'
  },
  {
    id: 6,
    name: 'Chris Wilson',
    username: 'chrisw',
    password: 'password303',
    role: 'Admin'
  },
  {
    id: 7,
    name: 'Anna Taylor',
    username: 'annat',
    password: 'password404',
    role: 'User'
  },
  {
    id: 8,
    name: 'David Miller',
    username: 'davidm',
    password: 'password505',
    role: 'Editor'
  },
  {
    id: 9,
    name: 'Sophia Moore',
    username: 'sophiam',
    password: 'password606',
    role: 'Admin'
  },
  {
    id: 10,
    name: 'James Anderson',
    username: 'jamesa',
    password: 'password707',
    role: 'User'
  }
];

export const ROLE_PERMISSIONS = {
  Admin: ['view', 'delete', 'edit', 'create'],
  Editor: ['view', 'edit'],
  User: ['view']
};

export const toastOption = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce
};
