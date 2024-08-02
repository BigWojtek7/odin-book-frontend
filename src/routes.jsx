import App from './App';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile'
import Requests from './pages/Requests/Requests';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'profile', element: <Profile /> },
      { path: 'requests', element: <Requests /> },
    ],
  },
];

export default routes;
