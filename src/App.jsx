import MainLayout from './layouts/MainLayout';
import AuthProvider from './contexts/Auth/AuthProvider';
import LoaderProvider from './contexts/Loader/LoaderProvider';
import ModalProvider from './contexts/Modal/ModalProvider'
import NotificationProvider from './contexts/Notification/NotificationProvider';

function App() {
  return (
    <>
      <NotificationProvider>
        <ModalProvider>
          <LoaderProvider>
            <AuthProvider>
              <MainLayout />
            </AuthProvider>
          </LoaderProvider>
        </ModalProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
