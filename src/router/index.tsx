import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Laylout = lazy(() => import('@/Layout'));

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Laylout />,
    children: [],
  },
]);

export default routers;
