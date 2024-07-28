import styles from './App.module.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.sidebar}></nav>
      <main className={styles.mainDiv}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
