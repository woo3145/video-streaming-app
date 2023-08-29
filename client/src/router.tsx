import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Watch from './pages/Watch';

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
        path: '/watch/:videoId',
        element: <Watch />,
      },
    ],
  },
]);

export default router;
