import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.active}><Link to='/'>Home</Link></li>
        <li><Link to='sign-up'>SignUp</Link></li>
        <li><Link to='login'>Login</Link></li>
        <li><Link to='/home'>Posts</Link></li>
        <li><Link to='/home'>Requests</Link></li>
        <li><Link to='/home'>Profile</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar