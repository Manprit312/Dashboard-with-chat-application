import Cookies from 'universal-cookie';
export const getToken = async () => {
  const cookie = new Cookies();
  if (tokenExpired()) {
    window.location.href = '/';
  } else {
    console.log('tokens.js 11 | token not expired');
    return cookie.get('accessToken');
  }
};

const tokenExpired = () => {
  const currentDateTime = new Date();
  sessionStorage.setItem('currentTimeStamp', currentDateTime);
  const time = sessionStorage.getItem('currentTimeStamp');
  const expirationDate = sessionStorage.getItem('expireTimeStamp');

  if (time >= expirationDate) {
    return true; // token expired
  }

  return false; // valid token
};
