import CreateUserPage from '@/pages/CreateUserPage';
import Home from '@/pages/Home';
import RootLayout from '@/pages/RootLayout';
import UpdateUser from '@/pages/UpdateUser';
import { createBrowserRouter, Link } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <div>
            <Link
              className='block text-center text-3xl font-bold text-black'
              to='/user'
            >
              User List
            </Link>
          </div>
        )
      },
      {
        path: '/user',
        element: <Home />
      },
      {
        path: '/user/create',
        element: <CreateUserPage />
      },
      {
        path: '/user/:id',
        element: <UpdateUser />
      }
    ]
  }
]);
