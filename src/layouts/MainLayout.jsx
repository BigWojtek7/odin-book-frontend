import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';

import styles from './MainLayout.module.css'

function MainLayout() {
  return (
    <div className="content">
      <Header />
      <Loader />
      <Modal />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
