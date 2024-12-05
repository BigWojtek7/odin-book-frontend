import { useEffect, useState } from 'react';
import useLoader from '../contexts/Loader/useLoader';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const useFetch = (url, options) => {
  const [fetchData, setFetchData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const toggleRefresh = () => setRefresh((prev) => !prev);
  useEffect(() => {
    if (url) {
      let ignore = false;
      const fetchForData = async () => {
        try {
          loaderStart();
          const response = await requestWithNativeFetch(url, options);
          if (!ignore) {
            setFetchData(response);
          }
        } catch (err) {
          setError(err);
          console.log(err);
        } finally {
          loaderStop();
        }
      };
      fetchForData();
      return () => {
        ignore = true;
      };
    }
  }, [url, options, loaderStart, loaderStop, refresh]);

  return { fetchData, setFetchData, toggleRefresh, error };
};

export default useFetch;
