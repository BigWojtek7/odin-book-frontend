import { useCallback, useEffect, useState } from 'react';

import LoaderContext from './LoaderContext';

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [loaderStack, setLoaderStack] = useState([]);

  const start = useCallback((loaderText = 'Loading...') => {
    setLoaderText(loaderText);
    setLoaderStack((prevStack) => [...prevStack, true]);
  }, []);

  const stop = useCallback(() => {
    setLoaderStack((prevStack) => prevStack.slice(1));
  }, []);

  useEffect(() => {
    setIsLoading(loaderStack.length > 0);
  }, [loaderStack]);

  return (
    <LoaderContext.Provider value={{ isLoading, loaderText, start, stop }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
