import axios from 'axios';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
