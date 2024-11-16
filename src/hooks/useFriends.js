import { useEffect, useState } from 'react';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';

function useFriends(userId) {
  const [friends, setFriends] = useState([]);
  const { token, user } = useAuth();

  console.log(userId)
  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    const id = userId || user?.user_id;
    if (id) {
      const fetchFriends = async () => {
        try {
          loaderStart();
          const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${id}`;
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
  }, [token, userId, user, loaderStart, loaderStop]);

  return { friends, setFriends };
}

export default useFriends;
