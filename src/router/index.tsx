import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { getLocalStorage } from '@/utils/StorageValue';

const Laylout = lazy(() => import('@/Layout'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const isUserAuthenticated = () => {
  const user = getLocalStorage('user');
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
    children: [],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default routers;
