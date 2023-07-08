// actions.js
import axios from 'axios';

const fetchDataRequest = () => {
  return {
    type: 'FETCH_DATA_REQUEST',
  };
};

const fetchDataSuccess = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  };
};

const fetchDataFailure = (error) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  };
};

const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());

    axios
      .get('http://localhost:4000/users')
      .then((response) => {
        dispatch(fetchDataSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

export { fetchData };
