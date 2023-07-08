import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const AuthGuard = (props) => {
  const { children } = props;
  const router = useNavigate();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Access localStorage methods here
      const isAuthenticated = localStorage.getItem('AuthToken');
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting');
        router('/');
      } else {
        setChecked(true);
      }
    }
  }, []);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
