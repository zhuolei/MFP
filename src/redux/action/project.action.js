import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';
export const GET_PROJECT = 'GET_PROJECT';
export function getproject(id) {
    let promise = axios.get(`${API_URL}/projects/` + id, {withCredentials: true});
    return {
        type: GET_PROJECT,
        payload: promise
    }
}