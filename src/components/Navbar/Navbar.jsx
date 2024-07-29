import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.active}><Link to='/home'>Home</Link></li>
        <li><Link to='/home'>Profile</Link></li>
        <li><Link to='/home'>Friends</Link></li>
        <li><Link to='/home'>Another</Link></li>
        <li><Link to='/home'>Another one</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar