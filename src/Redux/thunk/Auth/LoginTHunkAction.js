import axios from 'axios';

const initialState = {
  loginData: [],
  isLoading: false,
  error: null,
};

const loginUser = (state = initialState, action) => {
    console.log(action.payload)
  switch (action.type) {
    case 'LOGIN_REQUEST':
    
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
       console.log(action)
      return {
        ...state,
        isLoading: false,
        loginData: action.payload,
      };
    case 'LOGIN_FAILURE':
        console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginUser;
