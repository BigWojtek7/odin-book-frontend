import Friend from '../../FriendsCard/Friend';
import RequestForm from '../RequestForm/RequestForm';
import styles from './UserSuggestion.module.css';
function UserSuggestion({ title, friendsSuggest, handleSentRequest }) {
  return (
    <div className={styles.sideCard}>
      <h2 className={styles.sideHeading}>{title}</h2>
      {friendsSuggest.map((friend) => (
        <div className={styles.usersCard} key={friend.user_id}>
          <Friend
            followerId={friend.user_id}
            name={friend.full_name}
            friendsNumber={friend.user_followers_count}
            avatarURL={friend.avatar_url}
            style={{
              padding: '0.5em 0.5em 0 0.5em',
            }}
          />
          <RequestForm
            onSubmit={() => handleSentRequest(friend.user_id)}
            buttonText="Send follow request"
            buttonBorderRadius="0 0 10px 10px"
          />
        </div>
      ))}
    </div>
  );
}
export default UserSuggestion;
