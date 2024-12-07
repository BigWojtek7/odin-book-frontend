import styles from './Requests.module.css';

import useRequests from '../../hooks/useRequests';
import RequestsReceived from '../../components/Requests/RequestsReceived/RequestsReceived';
import RequestsSent from '../../components/Requests/RequestsSent/RequestsSent';
import UserSuggestion from '../../components/Requests/UsersSuggestion/UserSuggestion';

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
        <RequestsSent
          title="Sent Requests:"
          requestsSent={requestsSent}
          handleDeleteRequest={handleDeleteRequest}
        />
        <RequestsReceived
          requestsReceived={requestsReceived}
          handleAddFollower={handleAddFollower}
          handleDeleteRequest={handleDeleteRequest}
          title="Received Requests:"
        />
        <UserSuggestion
          title="Users you may know:"
          friendsSuggest={friendsSuggest}
          handleSentRequest={handleSentRequest}
        />
      </div>
    </>
  );
}
export default Requests;
