import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { getCookie } from '@/utils/StorageValue';

const Laylout = lazy(() => import('@/Layout'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const Login = lazy(() => import('@/pages/Login'));
const UserManagers = lazy(() => import('@/pages/user-manager'));

const isUserAuthenticated = () => {
  const user = getCookie('user');
  if (!user) {
    return redirect('/login');
  }
  return null;
};

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Laylout />,
    loader: isUserAuthenticated,
    errorElement: <p>Error</p>,
    children: [
      {
        path: '/user-manager',
        element: <UserManagers />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default routers;
