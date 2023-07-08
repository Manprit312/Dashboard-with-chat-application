import { callApi } from '../helpers/apiHelper';

const deleteUserApi = (body) => {
  callApi(`http://localhost:4000/deleteUserMultiple`, 'delete', body);
};
export default deleteUserApi;
