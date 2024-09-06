import styles from './FriendCard.module.css';
import Friend from './Friend';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import CancelButton from '../Form/Buttons/cancelButton';
import requestWithNativeFetch from '../../utils/fetchApi';
import Modal from '../Modal/Modal';
function FriendsCard({ unFollowReq, setUnFollowReq }) {
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [follower, setFollower] = useState();

  // const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, , setIsLoading] = useOutletContext();

  useEffect(() => {
    if (user?.user_id) {
      const fetchDataForFriend = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
            user.user_id
          }`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setFriends(friendsData);
          console.log(friendsData);
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

  const handleUnFollow = (followerid) => {
    setIsLoading(true);
    const fetchDataForUnfollow = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
          user.user_id
        }/${followerid}`;
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
        setShowModal(false);
      }
    };
    fetchDataForUnfollow();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFollower({
      follower_id: e.target.follower_id.value,
      follower_name: e.target.follower_name.value,
    });
  };

  return (
    <>
      {friends.length === 0 ? (
        <p>Add friends first to see their posts...</p>
      ) : (
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
              <form className={styles.form} onSubmit={handleDelete}>
                <input
                  type="hidden"
                  name="follower_id"
                  value={follower.follower_id}
                />
                <input
                  type="hidden"
                  name="follower_name"
                  value={follower.follower_name}
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
          <Modal
            isShow={showModal}
            onRequestSubmit={() => handleUnFollow(follower.follower_id)}
            onRequestClose={() => setShowModal((prev) => !prev)}
          >
            Are you sure to unfollow <strong>{follower?.follower_name}</strong>
          </Modal>
        </div>
      )}
    </>
  );
}
export default FriendsCard;
