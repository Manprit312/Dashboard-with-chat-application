import { callApi } from '../helpers/apiHelper';

const AdduserApi = (body) => {
  callApi(`http://localhost:4000/newUser`, 'post', body);
};
export default AdduserApi;
