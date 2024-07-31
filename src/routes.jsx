import App from './App';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Posts from './pages/Posts/Posts';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'posts', element: <Posts /> },
    ],
  },
];

export default routes;
