import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';
import { dispatch } from 'rxjs/internal/observable/range';

export const GET_PROJECTS = 'GET_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';

export function getprojects(id){
    let promise = axios.get(`${API_URL}/teams/projects/` + id, {withCredentials: true});
    return {
        type: GET_PROJECTS,
        payload: promise
    }
}

export function createproject(project, callback) {
    const promise = axios.post(`${API_URL}/teams/createproject`, project, {withCredentials: true})
    .then(res => {
      callback(res);
    //   return dispatch(getprojects(project.teamId));
      return res;
    });
    return {
      type: CREATE_PROJECT,
      payload: promise
    }
}