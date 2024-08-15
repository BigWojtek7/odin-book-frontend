import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
function UserCard({user}) {
  const [token, , , ,] = useOutletContext();
  const [friendsMiniatures, setFriendsMiniatures] = useState([]);

  useEffect(() => {
    if (user?.user_id) {
      const fetchDataForMiniatures = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
            user.user_id
          }/followers`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setFriendsMiniatures(friendsData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMiniatures();
    }
    return () => {
      setFriendsMiniatures([]);
    };
  }, [token, user]);
  
  return (
    <div className={styles.card}>
      <img className={styles.profileImage} src={user.avatar_url} alt="avatar" />
      <div className={styles.profileMain}>
        <h2 className={styles.profileName}>{user.full_name}</h2>
        <p className={styles.profilePosition}>{user.profession}</p>
        <p className={styles.profileBody}>{user.about}</p>
      </div>
      <h2>{`${user.user_followers_count} friends:`}</h2>
      <div className={styles.profileFriends}>
        {friendsMiniatures.map((friend) => (
          <FriendsMiniature
            key={friend.follower_id}
            name={friend.follower_name}
            avatarURL={friend.avatar_url}
          />
        ))}
      </div>
    </div>
  );
}
export default UserCard;
