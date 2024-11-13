import { useEffect, useState } from 'react';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const usePosts = (url, shouldFetch = true) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    if (!url || !shouldFetch) return;
    let ignore = false;
    const fetchPosts = async () => {
      try {
        loaderStart();
        const response = await requestWithNativeFetch(url, {
          headers: { Authorization: token },
        });
        if (!ignore) {
          setPosts(response);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        loaderStop();
      }
    };
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, [url, shouldFetch, token, loaderStart, loaderStop]);

  return { posts, setPosts, error };
};

export default usePosts;
