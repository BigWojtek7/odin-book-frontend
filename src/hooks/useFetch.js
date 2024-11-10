import { useEffect, useState } from 'react';
import useLoader from '../contexts/Loader/useLoader';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const useFetch = (url, options) => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);

  const { start: loaderStart, stop: loaderStop } = useLoader();

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
  }, [url, options, loaderStart, loaderStop]);

  return { fetchData, setFetchData, error };
};

export default useFetch;
