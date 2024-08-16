import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
function UserCard({ profileUser }) {
  const [token, ,user , ,] = useOutletContext();
  const [friendsMiniatures, setFriendsMiniatures] = useState([]);

  useEffect(() => {
    if (profileUser?.user_id) {
      const fetchDataForMiniatures = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
            profileUser.user_id
          }`;
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
  }, [token, profileUser]);

  return (
    <div className={styles.card}>
      <img
        className={styles.profileImage}
        src={profileUser?.avatar_url}
        alt="avatar"
      />
      <div className={styles.profileMain}>
        <h2 className={styles.profileName}>{profileUser?.full_name}</h2>
        <p className={styles.profilePosition}>{profileUser?.profession}</p>
        <p className={styles.profileBody}>{profileUser?.about}</p>
      </div>
      <h2>{`${profileUser?.user_followers_count} friends:`}</h2>
      <div className={styles.profileFriends}>
        {friendsMiniatures.map((friend) => (
          <FriendsMiniature
            key={friend.follower_id}
            followerId={
              user.user_id === friend.follower_id ? '#' : friend.follower_id
            }
            name={friend.follower_name}
            avatarURL={friend.avatar_url}
          />
        ))}
      </div>
    </div>
  );
}
export default UserCard;
