import { Link, useLocation  } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar() {
  const {pathname} = useLocation();
  console.log(pathname)
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={pathname === '/' ? styles.active : undefined}><Link to='/'>Home</Link></li>
        <li className={pathname === '/sign-up' ? styles.active : undefined}><Link to='sign-up'>SignUp</Link></li>
        <li className={pathname === '/login' ? styles.active: undefined}><Link to='login'>Login</Link></li>
        <li className={pathname === '/profile' ? styles.active: undefined}><Link to='profile'>Profile</Link></li>
        <li><Link to='/requests'>Requests</Link></li>
        <li><Link to='/settings'>Settings</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar