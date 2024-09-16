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
  mdiMenu,
} from '@mdi/js';
import { useState } from 'react';

function Navbar({ token, setToken }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');

    alert('You are signed out');
  };

  return (
    <div className={styles.navHeader}>
      <button className={styles.btnToggle}>
        <Icon size={1.4} path={mdiMenu} onClick={() => setIsOpen(!isOpen)} />
      </button>
      <Link to='/'className={styles.logo} >FriendsBook</Link>
      <nav className={`${styles.nav} ${isOpen ? styles.navVisible : ''}`}>
        <ul className={styles.navList}>
          {token ? (
            <>
              <li className={pathname === '/' ? styles.active : undefined}>
                <Link className={styles.navLink} to="/">
                  <Icon path={mdiHome} />
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
                <Link className={styles.navLink} to="profile">
                  <Icon path={mdiAccount} />
                  Profile
                </Link>
              </li>
              <li
                className={pathname === '/requests' ? styles.active : undefined}
              >
                <Link className={styles.navLink} to="/requests">
                  <Icon path={mdiAccountGroup} />
                  Requests
                </Link>
              </li>
              <li
                className={pathname === '/settings' ? styles.active : undefined}
              >
                <Link className={styles.navLink} to="/settings">
                  <Icon path={mdiCogs} />
                  Settings
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className={`${styles.logout} ${styles.navLink}`}
                  onClick={handleLogout}
                >
                  <Icon path={mdiLogout} />
                  Log Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li
                className={pathname === '/sign-up' ? styles.active : undefined}
              >
                <Link className={styles.navLink} to="sign-up">
                  <Icon path={mdiAccountPlus} />
                  SignUp
                </Link>
              </li>
              <li className={pathname === '/login' ? styles.active : undefined}>
                <Link className={styles.navLink} to="login">
                  <Icon path={mdiLogin} />
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
