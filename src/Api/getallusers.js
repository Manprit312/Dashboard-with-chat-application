import { callApi } from '../helpers/apiHelper';

const getallUsers = () => 
 { callApi(`http://localhost:4000/allusers`, 'get' );
;}
export default getallUsers
