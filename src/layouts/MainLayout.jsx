import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';

import styles from './MainLayout.module.css'

function MainLayout() {
  return (
    <div className="content">
      <Loader />
      <Modal />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
