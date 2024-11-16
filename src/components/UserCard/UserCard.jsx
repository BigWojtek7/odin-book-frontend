import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import useAuth from '../../contexts/Auth/useAuth';
import useFriends from '../../hooks/useFriends';
function UserCard({ profileUser }) {
  const { user } = useAuth();

  const { friends } = useFriends(profileUser?.user_id);
  // const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   if (profileUser?.user_id) {
  //     const fetchDataForFriends = async () => {
  //       try {
  //         const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
  //           profileUser.user_id
  //         }`;
  //         const headers = {
  //           Authorization: token,
  //         };
  //         const friendsData = await getRequestWithNativeFetch(url, headers);
  //         setFriends(friendsData);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchDataForFriends();
  //   }
  //   return () => {
  //     setFriends([]);
  //   };
  // }, [token, profileUser]);

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
        {friends?.map((friend) => (
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
