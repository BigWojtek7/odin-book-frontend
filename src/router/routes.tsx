import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Profile from '../pages/Profile/Profile';
import Requests from '../pages/Requests/Requests';
import Settings from '../pages/Settings/Settings';
import PrivateRoute from './PrivateRoute';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: 'profile?/:followerid', element: <Profile /> },
          { path: 'requests', element: <Requests /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
];

export default routes;
