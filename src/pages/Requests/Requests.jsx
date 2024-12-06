import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import Button from '../../components/Form/Button/Button';

import useRequests from '../../hooks/useRequests';

function Requests() {
  const {
    requestsReceived,
    requestsSent,
    friendsSuggest,
    handleAddFollower,
    handleSentRequest,
    handleDeleteRequest,
  } = useRequests();

  return (
    <>
      <div className={styles.requests}>
        <div className={styles.sideCard}>
          <h2 className={styles.sideHeading}>Sent Requests:</h2>
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
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteRequest('sent', request.follower_id);
                }}
              >
                <Button
                  Button
                  type="submit"
                  style={{
                    width: '100%',
                    fontSize: '0.6rem',
                    borderRadius: '0 0 10px 10px',
                  }}
                >
                  Cancel follow request
                </Button>
              </form>
            </div>
          ))}
        </div>
        <div className={styles.sideCard}>
          <h2 className={styles.sideHeading}>Received Requests:</h2>
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
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddFollower(request.follower_id);
                  }}
                >
                  <Button
                    type="submit"
                    name="Confirm"
                    style={{
                      width: '100%',
                      fontSize: '0.6rem',
                      borderRadius: '0 0 0 10px',
                    }}
                  >
                    Confirm
                  </Button>
                </form>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDeleteRequest('received', request.follower_id);
                  }}
                >
                  <Button
                    cancelButton
                    type="submit"
                    style={{
                      width: '100%',
                      fontSize: '0.6rem',
                      borderRadius: '0 0 10px 0',
                    }}
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sideCard}>
          <h2 className={styles.sideHeading}>Users you may know:</h2>
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
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSentRequest(friend.user_id);
                }}
              >
                <Button
                  type="submit"
                  style={{
                    width: '100%',
                    fontSize: '0.6rem',
                    borderRadius: '0 0 10px 10px',
                  }}
                >
                  Send follow request
                </Button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Requests;
