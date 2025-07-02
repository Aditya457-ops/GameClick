import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './reduxSetup/Store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Feed from './page/Feed.jsx'
import Profile from './page/Profile.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/feed",
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
