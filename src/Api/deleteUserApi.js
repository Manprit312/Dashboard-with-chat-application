import { callApi } from '../helpers/apiHelper';

const deleteUserApi = (params) => {
  callApi(`http://localhost:4000/deleteUser/${params}`, 'delete');
};
export default deleteUserApi;
