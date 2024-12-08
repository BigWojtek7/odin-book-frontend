import styles from './FriendsCard.module.css';
import Friend from './Friend';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import useAuth from '../../contexts/Auth/useAuth';
import useFriends from '../../hooks/useFriends';
import useNotification from '../../contexts/Notification/useNotification';
import useModal from '../../contexts/Modal/useModal';
import useLoader from '../../contexts/Loader/useLoader';
import Button from '../Form/Button/Button';

function FriendsCard({ onDeletePostsByFollower }) {
  const { friends, setFriends } = useFriends();
  const { token, user } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const confirmDeleteFriend = (followerId, followerName) => {
    openModal(`Do you really want to delete ${followerName}?`, () =>
      deleteFriend(followerId, followerName)
    );
  };

  const deleteFriend = async (followerId, followerName) => {
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'delete',
      };
      const deleteFriendData = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/followers/${
          user.user_id
        }/${followerId}`,
        options
      );
      if (deleteFriendData.success) {
        updateFriendsState(followerId);
        onDeletePostsByFollower(followerId);
        addNotification(`${followerName} has been deleted`, 'delete');
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
      closeModal();
    }
  };

  const updateFriendsState = (followerId) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.follower_id !== followerId)
    );
  };
  return (
    <>
      {friends?.length === 0 ? (
        <p>Add friends first to see their posts...</p>
      ) : (
        <div className={styles.container}>
          <h2>Friends:</h2>
          {friends?.map((follower) => (
            <div key={follower.follower_id} className={styles.friendBar}>
              <Friend
                followerId={follower.follower_id}
                name={follower.follower_name}
                friendsNumber={follower.user_followers_count}
                avatarURL={follower.avatar_url}
                style={{ padding: '0.5em 0.5em 0 0.5em' }}
              />
              <Button
                cancelButton
                type="button"
                onClick={() =>
                  confirmDeleteFriend(
                    follower.follower_id,
                    follower.follower_name
                  )
                }
                style={{
                  fontSize: '0.6rem',
                  borderRadius: '0 0 10px 10px',
                  width: '100%',
                }}
              >
                Unfollow
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default FriendsCard;
