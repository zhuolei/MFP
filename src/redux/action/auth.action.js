import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.PMP_API_URL;

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(user, callback) {
  const promise = axios.post(`${API_URL}/users/login`, user, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
  return {
    type: LOGIN,
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