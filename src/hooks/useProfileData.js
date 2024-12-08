import { useEffect, useState } from 'react';
import useAuth from '../contexts/Auth/useAuth';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const useProfileData = (followerid) => {
  const { token, user } = useAuth();
  const [profileUser, setProfileUser] = useState({});

  const isFollowerProfile = followerid !== 'profile';

  useEffect(() => {
    const fetchDataForProfile = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${followerid}/profile`;
        const userData = await requestWithNativeFetch(url, {
          headers: { Authorization: token },
        });
        setProfileUser(userData);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };

    if (token && isFollowerProfile) {
      fetchDataForProfile();
    } else {
      setProfileUser(user);
    }
  }, [token, followerid, isFollowerProfile, user]);

  return { profileUser, isFollowerProfile };
};

export default useProfileData;
