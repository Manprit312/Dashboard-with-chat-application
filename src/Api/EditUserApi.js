import { callApi } from '../helpers/apiHelper';

const editUser = (params, body) => {
  callApi(`http://localhost:4000/editUser/${params}`, 'put', body);
};
export default editUser;
