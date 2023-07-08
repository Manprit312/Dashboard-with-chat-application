import axios from 'axios';

const initialState = {
  RegisteredUSer: [],
  isLoading: false,
  error: null,
};

const RegisteredUSer = (state = initialState, action) => {
    console.log(action.payload)
  switch (action.type) {
    case 'REGISTER_REQUEST':
    
      return {
        ...state,
        isLoading: true,
      };
    case 'REGISTER_SUCCESS':
       console.log(action)
      return {
        ...state,
        isLoading: false,
        RegisteredUSer: action.payload,
      };
    case 'REGISTER_FAILURE':
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

export default RegisteredUSer;
