import Friend from '../../FriendsCard/Friend';
import RequestForm from '../RequestForm/RequestForm';
import styles from '../RequestsSharedCSS.module.css';

function RequestsSent({ title, requestsSent, handleDeleteRequest }) {
  return (
    <div className={styles.sideCard}>
      <h2 className={styles.sideHeading}>{title}</h2>
      {requestsSent.map((request) => (
        <div className={styles.usersCard} key={request.follower_id}>
          <Friend
            followerId={request.follower_id}
            name={request.follower_name}
            friendsNumber={request.user_followers_count}
            avatarURL={request.avatar_url}
            style={{
              padding: '0.5em 0.5em 0 0.5em',
            }}
          />
          <RequestForm
            onSubmit={() => handleDeleteRequest('sent', request.follower_id)}
            buttonText="Cancel follow request"
            buttonBorderRadius="0 0 10px 10px"
            isCancel
          />
        </div>
      ))}
    </div>
  );
}
export default RequestsSent;
