import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from './utils/fetchApiGet';

function App() {
  const [user, setUser] = useState({});

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (token) {
      const fetchDataForUsers = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/user`;
          const headers = {
            Authorization: token,
          };
          const userData = await getRequestWithNativeFetch(url, headers);
          setUser(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForUsers();
    }
    return () => {
      setUser([]);
    };
  }, [token]);
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <main>
        <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
      </main>
    </>
  );
}

export default App;
