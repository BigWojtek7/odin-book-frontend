import LoaderContext from './LoaderContext';

import { useContext } from 'react';

const useLoader = () => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }
  return {
    loaderText: loaderContext.loaderText,
    isLoading: loaderContext.isLoading,
    start: loaderContext.start,
    stop: loaderContext.stop,
  };
};

export default useLoader;
