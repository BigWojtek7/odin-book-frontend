import { useEffect, useState } from 'react';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const useComments = (url, shouldFetch = true) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    if (!url || !shouldFetch) return;
    let ignore = false;
    const fetchComments = async () => {
      try {
        loaderStart();
        const response = await requestWithNativeFetch(url, {
          headers: { Authorization: token },
        });
        if (!ignore) {
          setComments(response);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        loaderStop();
      }
    };
    fetchComments();
    return () => {
      ignore = true;
    };
  }, [url, shouldFetch, token, loaderStart, loaderStop]);

  return { comments, setComments, error };
};

export default useComments;
