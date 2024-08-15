import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

import Icon from '@mdi/react';
import {
  mdiLogin,
  mdiAccountPlus,
  mdiHome,
  mdiAccount,
  mdiAccountGroup,
  mdiCogs,
  mdiLogout,
} from '@mdi/js';

function Navbar({ token, setToken }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');

    alert('You are signed out');
  };

  return (
    <nav>
      <ul className={styles.navList}>
        {token ? (
          <>
            <li className={pathname === '/' ? styles.active : undefined}>
              <Link to="/">
                <Icon path={mdiHome} size={1.4} />
                Home
              </Link>
            </li>
            <li
              className={
                pathname === '/profile' || pathname === '/profile/'
                  ? styles.active
                  : undefined
              }
            >
              <Link to="profile">
                <Icon path={mdiAccount} size={1.4} />
                Profile
              </Link>
            </li>
            <li
              className={pathname === '/requests' ? styles.active : undefined}
            >
              <Link to="/requests">
                <Icon path={mdiAccountGroup} size={1.4} />
                Requests
              </Link>
            </li>
            <li
              className={pathname === '/settings' ? styles.active : undefined}
            >
              <Link to="/settings">
                <Icon path={mdiCogs} size={1.4} />
                Settings
              </Link>
            </li>
            <li>
              <a href="#" className={styles.logout} onClick={handleLogout}>
                <Icon path={mdiLogout} size={1.4} />
                Log Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li className={pathname === '/sign-up' ? styles.active : undefined}>
              <Link to="sign-up">
                <Icon path={mdiAccountPlus} size={1.4} />
                SignUp
              </Link>
            </li>
            <li className={pathname === '/login' ? styles.active : undefined}>
              <Link to="login">
                <Icon path={mdiLogin} size={1.4} />
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
