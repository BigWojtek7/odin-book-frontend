import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

import Icon from '@mdi/react';
import {
  mdiLogin,
  mdiAccountPlus,
  mdiHome,
  mdiAccount,
  mdiAccountGroup,
  mdiCogs,
} from '@mdi/js';

function Navbar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={pathname === '/' ? styles.active : undefined}>
          <Link to="/">
            <Icon path={mdiHome} size={1.4} />
            Home
          </Link>
        </li>
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
        <li className={pathname === '/profile' ? styles.active : undefined}>
          <Link to="profile">
            <Icon path={mdiAccount} size={1.4} />
            Profile
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <Icon path={mdiAccountGroup} size={1.4} />
            Requests
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <Icon path={mdiCogs} size={1.4} />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
