import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/CancelButton';

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
                <input
                  type="hidden"
                  name="request_receiver_id"
                  value={request.follower_id}
                />
                <CancelButton
                  type="submit"
                  style={{
                    width: '100%',
                    fontSize: '0.6rem',
                    borderRadius: '0 0 10px 10px',
                  }}
                >
                  Cancel follow request
                </CancelButton>
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
                  <input
                    type="hidden"
                    name="follower_id"
                    value={request.follower_id}
                  />
                  <SubmitButton
                    type="submit"
                    name="Confirm"
                    style={{
                      width: '100%',
                      fontSize: '0.6rem',
                      borderRadius: '0 0 0 10px',
                    }}
                  >
                    Confirm
                  </SubmitButton>
                </form>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDeleteRequest('received', request.follower_id);
                  }}
                >
                  <input type="hidden" name="request_id" value={request.id} />
                  <CancelButton
                    type="submit"
                    style={{
                      width: '100%',
                      fontSize: '0.6rem',
                      borderRadius: '0 0 10px 0',
                    }}
                  >
                    Delete
                  </CancelButton>
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
                <input
                  type="hidden"
                  name="request_receiver_id"
                  value={friend.user_id}
                />
                <SubmitButton
                  type="submit"
                  style={{
                    width: '100%',
                    fontSize: '0.6rem',
                    borderRadius: '0 0 10px 10px',
                  }}
                >
                  Send follow request
                </SubmitButton>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Requests;
