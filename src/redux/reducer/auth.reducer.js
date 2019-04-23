import {LOGIN, LOGOUT, UPDATE_USER} from '../action/auth.action';
// import { REGISTER } from '../action/auth.action';

export default function (state = null, action) {
  let res;
  switch (action.type) {
    // case SET_CURRENT_USER:
    //   res = action.value;
    //   console.log(res)
    case LOGIN:
      res = action.payload.data;
      // res.then(data=>{
      //   console.log(data)
      //   return data
      // }, (data) => {
      //   return data
      // })
      console.log(res)
      if (res && res.success) {
        return res.user;
      } else {
        return state;
      }
    case UPDATE_USER:
      res = action.payload.data;
      if(res) {
        return res
      } else {
        return state;
      }
    case LOGOUT:
      res = action.payload.data;
      if (res.success) {
        return state;
      } else {
        return state;
      }
    default:
      // any action will be sent to all the reducers.
      // only reducer which can handle the action should update its state.
      // other reducers should keep its state UNCHANGED!!!
      return state;
  }
}