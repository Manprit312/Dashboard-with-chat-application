import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

const cookies = new Cookies();
const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

// Thunk
export const loginUser = (body) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      axios.post(`http://192.168.0.53:4000/loginUser`, body).then((response) => {
        dispatch(loginSuccess(response));
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('AuthToken', response?.data?.token);
          
        }
        // sessionStorage.setItem('expirationDate', response.expires_in);

        // const updateDateTime = new Date();
        // const expireDateTime = new Date(updateDateTime.setMinutes(updateDateTime.getMinutes() + 59));
        // sessionStorage.setItem('expireTimeStamp', expireDateTime);
      });
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};
