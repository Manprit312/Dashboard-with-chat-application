import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const AuthGuard = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const router = useNavigate();
  const authenticated = localStorage.getItem('AuthToken');

  console.log(authenticated, '????????????');
  useEffect(() => {
    if (!authenticated) {
      router('/login');
    } else {
      setChecked(true);
    }
  }, [children]);

  return <>{children}</>;
};
export default AuthGuard;
