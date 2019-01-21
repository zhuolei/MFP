import axios from 'axios';
import {API_URL} from '../../common/statics/commonurl';
import qs from 'qs';
export const CREATE_TEAM = 'CREATE_TEAM';
export const GET_TEAMS = 'GET_TEAMS';
export const INVITE_USER = 'INVITE_USER';
export const DELETE_TEAM = 'DELETE_TEAM';
export const GET_ALL_USERS_IN_ONE_TEAM = 'GET_ALL_USERS_IN_ONE_TEAM';
export function createteam(team, callback) {
    const promise = axios.post(`${API_URL}/teams/create`, team, {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
    return {
      type: CREATE_TEAM,
      payload: promise
    }
}

export function getTeams() {
    let promise = axios.get(`${API_URL}/users/teamslist`, {withCredentials: true});
    return {
      type: GET_TEAMS,
      payload: promise
    };
}

export function inviteUser(userInvite, callback){
  const promise = axios.post(`${API_URL}/teams/invite`, userInvite, {withCredentials: true})
  .then(res => {
    callback(res);
    return res;
  });
  return {
    type: INVITE_USER,
    payload: promise
  }
}

export function getallusersinoneteam(id){
  let promise = axios.get(`${API_URL}/teams/allusers`+id, {withCredentials: true});
    return {
      type: GET_ALL_USERS_IN_ONE_TEAM,
      payload: promise
    };
}

export function deleteTeam(id, callback) {
  const promise = axios.delete(`${API_URL}/users/teams/` + id, {withCredentials: true})
  .then(res => {
    callback(res);
    return res;
  });
  return {
    type: DELETE_TEAM,
    payload: promise
  }
}