import { Link, useLocation  } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar() {
  const {pathname} = useLocation();
  console.log(pathname === '/' && `${styles.active}`)
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={pathname === '/' ? styles.active : undefined}><Link to='/'>Home</Link></li>
        <li className={pathname === '/sign-up' ? styles.active : undefined}><Link to='sign-up'>SignUp</Link></li>
        <li className={pathname === '/login' ? styles.active: undefined}><Link to='login'>Login</Link></li>
        <li><Link to='/home'>Posts</Link></li>
        <li><Link to='/home'>Requests</Link></li>
        <li><Link to='/home'>Profile</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar