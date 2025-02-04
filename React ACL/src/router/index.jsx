import { ProtectedRoute } from '@/components';
import {
  AdminPage,
  EditorPage,
  EditUserPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PostDetailPage,
  PostPage,
  RootLayout,
  UsersPage
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/editor',
        element: (
          <ProtectedRoute allowedRoles={['Editor']}>
            <EditorPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/user',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <UsersPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/user/:id',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <EditUserPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/post',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <PostPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/post/:id',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <PostDetailPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/editor/post',
        element: (
          <ProtectedRoute allowedRoles={['Editor']}>
            <PostPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/editor/post/:id',
        element: (
          <ProtectedRoute allowedRoles={['Editor']}>
            <PostDetailPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/',
        element: (
          <ProtectedRoute allowedRoles={['User']}>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/posts',
        element: (
          <ProtectedRoute allowedRoles={['User']}>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/post/:id',
        element: (
          <ProtectedRoute allowedRoles={['User']}>
            <PostDetailPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/',
        element: (
          <ProtectedRoute allowedRoles={['User']}>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

export default router;
