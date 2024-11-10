import { useContext, useEffect, useState } from 'react';
import LoaderContext from '../../contexts/Loader/LoaderContext';

import styles from './Loader.module.css';

function Loader() {
  const { isLoading, loaderText } = useContext(LoaderContext);
  const [isDelay, setIsDelay] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsDelay(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    } else {
      setIsDelay(false);
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <div className={styles.overlay}>
          <div className={styles.loaderContainer}>
            <span className={styles.spinner} />
            <span className={styles.text}>{loaderText}</span>
            {isDelay && (
              <span className={styles.text}>
                loading may take longer when server wakes up
              </span>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
