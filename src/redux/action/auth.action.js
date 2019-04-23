import axios from 'axios';
import qs from 'qs';
// import { dispatch } from 'rxjs/internal/observable/range';
import {API_URL} from '../../common/statics/commonurl';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_CURRENT_USER= 'SET_CURRENT_USER';
export const CREATE_TEAM = 'CREATE_TEAM';
export const UPDATE_USER = 'UPDATE_USER';
export function register(newUser, callback) {
  // try {
  //   axios.post(`${API_URL}/users/register`, newUser);
  //   // history.push("/login");
  //   dispatch({
  //     type: register,
  //     payload: {}
  //   });
  // } catch (err) {
  //   dispatch({
  //     // type: GET_ERRORS,
  //     // payload: err.response.data
  //     payload: err
  //   });
  // }
  const promise = axios.post(`${API_URL}/users/register`, newUser)
    .then(res => {
      callback(res);
      console.log(res)
      return res;
    });
  return {
    type: REGISTER,
    payload: promise
  }
}
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  value: user
})
export function login(user, callback) {
  const promise = axios.post(`${API_URL}/users/login`, qs.stringify(user), {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
  return {
    type: LOGIN,
    payload: promise
  }
}
export function updateuser(user, callback) {
  const promise = axios.post(`${API_URL}/users/update`, user, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
  return {
    type: UPDATE_USER,
    payload: promise
  }
}
export function logout(callback) {
  const promise = axios.post(`${API_URL}/logout`, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
  return {
    type: LOGOUT,
    payload: promise
  }
}

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