import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';

export const ALLUSERS = 'ALLUSERS';

export function allusers() {
    let promise = axios.get(`${API_URL}/users`, {withCredentials: true});
    return {
      type: ALLUSERS,
      payload: promise
    };
}
