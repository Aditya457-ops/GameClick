import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './reduxSetup/Store.js';
import App from './App.jsx';
import Feed from './page/Feed.jsx';
import Profile from './page/Profile.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import MainLayout from './MainLayout.jsx'; // 🔥 Layout wrapper

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // shared layout
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'feed',
        element: (
          <ProtectedRoutes>
            <Feed />
          </ProtectedRoutes>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
