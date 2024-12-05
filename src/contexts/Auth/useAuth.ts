import AuthContext from './AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Please use useAuth inside the context of AuthProvider');
  }
  return authContext;
};

export default useAuth;
