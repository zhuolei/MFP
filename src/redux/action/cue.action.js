import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';

export const GET_CUE = 'GET_CUE';
export const CREATE_CUE = 'CREATE_CUE';

export function createcue(cue, callback) {
    const promise = axios.post(`${API_URL}/cue/create`, cue, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
    return {
      type: CREATE_CUE,
      payload: promise
    }
}

export function getcue(id) {
    let promise = axios.get(`${API_URL}/cue/` + id, {withCredentials: true})
    return {
        type: GET_CUE,
        payload: promise
    }
}