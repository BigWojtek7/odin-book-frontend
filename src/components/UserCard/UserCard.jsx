import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
import useAuth from '../../contexts/Auth/useAuth';
import useFriends from '../../hooks/useFriends';
function UserCard({ profileUser }) {
  const { user } = useAuth();

  const { friends } = useFriends(profileUser?.user_id);

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
      <h2>
        {profileUser?.user_followers_count}{' '}
        {profileUser?.user_followers_count === 1 ? 'friend' : 'friends'}
      </h2>
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
