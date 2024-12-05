import { useEffect, useState } from 'react';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';
import useNotification from '../contexts/Notification/useNotification';
import useModal from '../contexts/Modal/useModal';

function useRequests() {
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [friendsSuggest, setFriendsSuggest] = useState([]);

  const { token, user } = useAuth();

  const { start: loaderStart, stop: loaderStop } = useLoader();
  const { addNotification } = useNotification();
  const { openModal, closeModal } = useModal();

  // Fetch sent requests
  useEffect(() => {
    let ignore = false;
    const fetchSentRequests = async () => {
      try {
        loaderStart();
        if (user?.user_id) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/requests/${
            user.user_id
          }/sent`;
          const options = {
            headers: { Authorization: token },
          };
          const data = await requestWithNativeFetch(url, options);
          if (!ignore && data.success) setRequestsSent(data.requests);
        }
      } catch (error) {
        console.error('Error fetching sent requests:', error);
      } finally {
        loaderStop();
      }
    };

    fetchSentRequests();
    return () => {
      ignore = true;
    };
  }, [token, user, loaderStart, loaderStop]);

  // Fetch received requests
  useEffect(() => {
    let ignore = false;
    const fetchReceivedRequests = async () => {
      try {
        loaderStart();
        if (user?.user_id) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/requests/${
            user.user_id
          }/received`;
          const options = {
            headers: { Authorization: token },
          };
          const data = await requestWithNativeFetch(url, options);
          if (!ignore && data.success) setRequestsReceived(data.requests);
        }
      } catch (error) {
        console.error('Error fetching received requests:', error);
      } finally {
        loaderStop();
      }
    };

    fetchReceivedRequests();
    return () => {
      ignore = true;
    };
  }, [token, user, loaderStart, loaderStop]);

  // Fetch friends suggestions
  useEffect(() => {
    let ignore = false;
    const fetchFriendsSuggestions = async () => {
      try {
        loaderStart();
        if (user?.user_id) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
            user.user_id
          }/suggestions`;
          const options = {
            headers: { Authorization: token },
          };
          const data = await requestWithNativeFetch(url, options);
          if (!ignore && data.success) setFriendsSuggest(data.friends);
        }
      } catch (error) {
        console.error('Error fetching friends suggestions:', error);
      } finally {
        loaderStop();
      }
    };
    fetchFriendsSuggestions();
    return () => {
      ignore = true;
    };
  }, [token, user, loaderStart, loaderStop]);

  const handleAddFollower = async (followerId) => {
    try {
      loaderStart();
      const url = `${import.meta.env.VITE_BACKEND_URL}/followers/${
        user.user_id
      }/${followerId}`;
      const options = {
        method: 'POST',
        headers: { Authorization: token },
      };
      const data = await requestWithNativeFetch(url, options);
      if (data.success) {
        setRequestsReceived((prev) =>
          prev.filter((req) => req.follower_id !== followerId)
        );
        setFriendsSuggest((prev) =>
          prev.filter((suggestion) => suggestion.user_id !== followerId)
        );
        addNotification('New friend has been added', 'success');
      }
      return data;
    } catch (error) {
      console.error('Error in handleAddFollower:', error);
      return { success: false, msg: 'Failed to add follower' };
    } finally {
      loaderStop();
    }
  };

  const handleSentRequest = async (requestReceiverId) => {
    try {
      loaderStart();
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/requests/${requestReceiverId}/${user.user_id}`;
      const options = {
        method: 'POST',
        headers: { Authorization: token },
      };
      const requestData = await requestWithNativeFetch(url, options);
      if (requestData.success) {
        setRequestsSent((prevRequests) => [
          {
            avatar_url: requestData.data.avatar_url,
            follower_id: requestData.data.follower_id,
            follower_name: requestData.data.follower_name,
            user_followers_count: requestData.data.user_followers_count,
          },
          ...prevRequests,
        ]);
        setFriendsSuggest((prev) =>
          prev.filter((suggestion) => suggestion.user_id !== requestReceiverId)
        );
        addNotification('New request has been sent', 'success');
      }
      return requestData;
    } catch (error) {
      console.error('Error in handleSentRequest:', error);
      return { success: false, msg: 'Failed to send request' };
    } finally {
      loaderStop();
    }
  };

  const handleDeleteRequest = (type, followerId) => {
    openModal('Do you really want to delete this request?', async () => {
      try {
        loaderStart();
        let url;
        switch (type) {
          case 'sent':
            url = `${import.meta.env.VITE_BACKEND_URL}/requests/${
              user.user_id
            }/sent/${followerId}`;
            break;
          case 'received':
            url = `${import.meta.env.VITE_BACKEND_URL}/requests/${
              user.user_id
            }/received/${followerId}`;
            break;
          default:
            console.error('Unknown type:', type);
            return { success: false, msg: 'Invalid request type' };
        }

        const options = {
          method: 'DELETE',
          headers: { Authorization: token },
        };

        const data = await requestWithNativeFetch(url, options);
        if (data.success) {
          if (type === 'sent') {
            setRequestsSent((prev) =>
              prev.filter((req) => req.follower_id !== followerId)
            );
          } else if (type === 'received') {
            setRequestsReceived((prev) =>
              prev.filter((req) => req.follower_id !== followerId)
            );
          }
          addNotification('Request has been deleted', 'delete');
        }
        return data;
      } catch (error) {
        console.error('Error in handleDeleteRequest:', error);
        return { success: false, msg: 'Failed to delete request' };
      } finally {
        loaderStop();
        closeModal();
      }
    });
  };

  return {
    requestsReceived,
    requestsSent,
    friendsSuggest,
    handleAddFollower,
    handleSentRequest,
    handleDeleteRequest,
  };
}

export default useRequests;
