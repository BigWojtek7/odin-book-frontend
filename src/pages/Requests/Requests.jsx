import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
function Requests() {
  const [requests, setRequests] = useState([]);
  // const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  console.log(user);
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForMessages = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
            user.user_id
          }/requests`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setRequests(friendsData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setRequests([]);
    };
  }, [setIsLoading, token, user]);
  console.log(requests);
  return (
    <div className={styles.container}>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Following Requests:</h2>
        <div className={styles.usersCard}>
          {requests.map((request) => (
            <>
              <Friend
                name={request.follower_name}
                friendsNumber={request.user_followers_count}
                avatarURL={request.avatar_url}
                key={request.id}
              />
              <form className={styles.form}>
                <input type="hidden" name="confirm_friend" value={'34657'} />
                <SubmitButton
                  type="submit"
                  name="Confirm"
                  style={{
                    fontSize: '1rem',
                    marginLeft: '0.5em',
                    borderRadius: '10px',
                  }}
                />
              </form>
              <form className={styles.form}>
                <input type="hidden" name="delete_request" value="34657" />
                <CancelButton
                  type="submit"
                  name="Delete"
                  style={{
                    fontSize: '1rem',
                    marginLeft: '0.5em',
                    borderRadius: '10px',
                  }}
                />
              </form>
            </>
          ))}
        </div>
      </div>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Users you may know:</h2>
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>{' '}
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Requests;
