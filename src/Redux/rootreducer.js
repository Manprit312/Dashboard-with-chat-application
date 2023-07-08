import { combineReducers } from 'redux';
import RegisteredUSer from './thunk/Auth/registerThunkReducers';
import reducer from './thunk/UserThunkReducer';
import loginUser from './thunk/Auth/LoginTHunkAction';

const rootReducer = combineReducers({
  users: reducer,
  RegisteredUsers: RegisteredUSer,
  logindata: loginUser,
});

export default rootReducer;
