import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
function UserCard() {
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  const [friendsMiniatures, setFriendsMiniatures] = useState([]);
  // const [deleteRes, setDeleteRes] = useState({});
  console.log(user);
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForMessages = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
            user.user_id
          }/followers`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setFriendsMiniatures(friendsData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setFriendsMiniatures([]);
    };
  }, [setIsLoading, token, user]);
  console.log(friendsMiniatures)
  return (
    <div className={styles.card}>
      <img
        className={styles.profileImage}
        src={user.avatar_url}
        alt="avatar"
      />
      <div className={styles.profileMain}>
        <h2 className={styles.profileName}>{user.full_name}</h2>
        <p className={styles.profilePosition}>{user.profession}</p>
        <p className={styles.profileBody}>{user.about}</p>
      </div>
      <h2>{`${user.user_followers_count} friends:`}</h2>
      <div className={styles.profileFriends}>
        {friendsMiniatures.map(friend => (
          <FriendsMiniature key={friend.id} name={friend.follower_name} avatarURL={friend.avatar_url}/>
        ))}
      </div>
    </div>
  );
}
export default UserCard;
