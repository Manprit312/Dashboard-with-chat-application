import { callApi } from '../helpers/apiHelper';

const RegisterNewUser = (body) => 
   callApi(`http://localhost:4000/register`, 'post', body);
;
export default RegisterNewUser;
