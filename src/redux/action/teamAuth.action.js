import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';
export const CREATE_TEAM = 'CREATE_TEAM';
export function createteam(team, callback) {
    const promise = axios.post(`${API_URL}/team`, team, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
    return {
      type: CREATE_TEAM,
      payload: promise
    }
  }