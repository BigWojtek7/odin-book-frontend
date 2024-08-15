import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import requestWithNativeFetch from '../../utils/fetchApi';
function Requests() {
  const [requests, setRequests] = useState([]);
  const [friendsSuggest, setFriendsSuggest] = useState([]);
  const [addFollower, setAddFollower] = useState({});
  const [deleteRequestRes, setDeleteRequestRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  console.log(user);
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForRequests = async () => {
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
      fetchDataForRequests();
    }
    return () => {
      setRequests([]);
    };
  }, [setIsLoading, token, user, addFollower]);

  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForFriendsSuggestion = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
            user.user_id
          }/suggestions`;
          const headers = {
            Authorization: token,
          };
          const friendsData = await getRequestWithNativeFetch(url, headers);
          setFriendsSuggest(friendsData);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDataForFriendsSuggestion();
    }
    return () => {
      setFriendsSuggest([]);
    };
  }, [setIsLoading, token, user]);
  console.log(friendsSuggest);

  const handleAddFollower = (e) => {
    e.preventDefault();
    const followerId = e.target.follower_id.value;
    console.log(followerId);
    setIsLoading(true);
    const fetchDataForAddFollower = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.user_id
        }/followers/${followerId}`;
        const headers = { Authorization: token };
        const addFollowerData = await requestWithNativeFetch(
          url,
          'POST',
          headers
        );
        setAddFollower(addFollowerData);

        if (addFollowerData.success) {
          setAddFollower(addFollowerData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForAddFollower();
  };

  const handleDeleteRequest = (e) => {
    e.preventDefault();
    const requestId = e.target.request_id.value;
    setIsLoading(true);
    const fetchDataForDelete = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/comments/${requestId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRequestRes(deleteData);

        if (deleteData.success) {
          setDeleteRequestRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForDelete();
  };
  return (
    <div className={styles.container}>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Following Requests:</h2>
        {requests.map((request) => (
          <div className={styles.usersCard} key={request.follower_id}>
            <Friend
              followerId={request.follower_id}
              name={request.follower_name}
              friendsNumber={request.user_followers_count}
              avatarURL={request.avatar_url}
            />
            <form className={styles.form} onSubmit={handleAddFollower}>
              <input
                type="hidden"
                name="follower_id"
                value={request.follower_id}
              />
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
            <form className={styles.form} onSubmit={handleDeleteRequest}>
              <input type="hidden" name="request_id" value={request.id} />
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
            />
            <form className={styles.form} onSubmit={handleAddFollower}>
              <input type="hidden" name="follower_id" value={friend.user_id} />
              <SubmitButton
                type="submit"
                name="Confirm"
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  borderRadius: '10px',
                }}
              />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Requests;
