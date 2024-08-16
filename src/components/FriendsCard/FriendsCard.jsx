import styles from './FriendCard.module.css';
import Friend from './Friend';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import CancelButton from '../Form/Buttons/cancelButton';
import requestWithNativeFetch from '../../utils/fetchApi';
function FriendsCard({unFollowReq, setUnFollowReq}) {
  const [friends, setFriends] = useState([]);
  // const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, ,setIsLoading] = useOutletContext();

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
  }, [token, user, unFollowReq]);

  const handleUnFollow = (e) => {
    e.preventDefault();
    const followerid = e.target.follower_id.value;
    setIsLoading(true);
    const fetchDataForUnfollow = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.user_id
        }/followers/${followerid}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setUnFollowReq(deleteData);

        // if (deleteData.success) {
        //   setUnfollowReq(deleteData);
        // }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForUnfollow();
  };

  return (
    <div className={styles.container}>
      <h2>Friends:</h2>
      {friends.map((follower) => (
        <div key={follower.follower_id} className={styles.friendBar}>
          <Friend
            followerId={follower.follower_id}
            name={follower.follower_name}
            friendsNumber={follower.user_followers_count}
            avatarURL={follower.avatar_url}
            style={{
              padding: '0.5em 0.5em 0 0.5em',
            }}
          />
          <form className={styles.form} onSubmit={handleUnFollow}>
            <input
              type="hidden"
              name="follower_id"
              value={follower.follower_id}
            />
            <CancelButton
              type="submit"
              name="Unfollow"
              style={{
                // 'writing-mode': 'vertical-rl',
                fontSize: '0.6rem',
                borderRadius: '0 0 10px 10px',
                width: '100%',
              }}
            />
          </form>
        </div>
      ))}
    </div>
  );
}
export default FriendsCard;
