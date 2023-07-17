import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/watch/:videoId',
        element: <Watch />,
      },
    ],
  },
]);

export default router;
