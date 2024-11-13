import { useEffect, useState } from 'react';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';

function useFriends() {
  const [friends, setFriends] = useState([]);
  const { token, user } = useAuth();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    if (user?.user_id) {
      const fetchFriends = async () => {
        try {
          loaderStart();
          const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
            user.user_id
          }`;
          const friendsData = await requestWithNativeFetch(url, {
            headers: { Authorization: token },
          });
          setFriends(friendsData);
        } catch (err) {
          console.error('Error fetching friends:', err);
        } finally {
          loaderStop();
        }
      };
      fetchFriends();
    }
  }, [token, user, loaderStart, loaderStop]);

  return { friends, setFriends};
}

export default useFriends;
