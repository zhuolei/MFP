import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';

export const GET_PICTURE = 'GET_PICTURE';
export const CREATE_PICTURE = 'CREATE_PICTURE';

export function createpicture(picture, callback) {
    const promise = axios.post(`${API_URL}/picture/create`, picture, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
    return {
      type: CREATE_PICTURE,
      payload: promise
    }
}

export function getpicture(id) {
    let promise = axios.get(`${API_URL}/picture/` + id, {withCredentials: true})
    return {
        type: GET_PICTURE,
        payload: promise
    }
}