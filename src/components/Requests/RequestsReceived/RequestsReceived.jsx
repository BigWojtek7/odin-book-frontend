import Friend from '../../FriendsCard/Friend';
import RequestForm from '../RequestForm/RequestForm';
import styles from '../RequestsComponents.module.css';

function RequestsReceived({
  title,
  requestsReceived,
  handleAddFollower,
  handleDeleteRequest,
}) {
  return (
    <div className={styles.sideCard}>
      <h2 className={styles.sideHeading}>{title}</h2>
      {requestsReceived.map((request) => (
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
          <div className={styles.buttons}>
            <RequestForm
              onSubmit={() => handleAddFollower(request.follower_id)}
              buttonText="Confirm"
            />
            <RequestForm
              isCancel
              buttonBorderRadius = '0 0 10px 0'
              onSubmit={() =>
                handleDeleteRequest('received', request.follower_id)
              }
              buttonText="Delete"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default RequestsReceived;
