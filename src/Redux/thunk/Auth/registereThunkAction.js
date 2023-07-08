import axios from 'axios';

const loginRequest = () => ({
  type: 'REGISTER_REQUEST',
});

const loginSuccess = (user) => ({
  type: 'REGISTER_SUCCESS',
  payload: user,
});

const loginFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

// Thunk
export const login = (body) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      axios.post(`http://localhost:4000/register`, body).then((response) => {
        dispatch(loginSuccess(response));
      });
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};
