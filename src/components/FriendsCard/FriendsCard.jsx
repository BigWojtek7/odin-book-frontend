import styles from './FriendCard.module.css';
import Friend from './Friend';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
function FriendsCard() {
  const [friends, setFriends] = useState([]);
  // const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, ,] = useOutletContext();

  useEffect(() => {
    if (user?.user_id) {
      const fetchDataForFriend = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
            user.user_id
          }/followers`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setFriends(friendsData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForFriend();
    }
    return () => {
      setFriends([]);
    };
  }, [token, user]);

  return (
    <div className={styles.container}>
      <h2>Friends:</h2>
      {friends.map((follower) => (
        <Friend
          key={follower.follower_id}
          name={follower.follower_name}
          friendsNumber={follower.user_followers_count}
          avatarURL={follower.avatar_url}
        />
      ))}
    </div>
  );
}
export default FriendsCard;
