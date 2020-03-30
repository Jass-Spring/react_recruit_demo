import { combineReducers } from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types'
import { getRedirect } from '../utils'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}
// 产生user的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, header } = action.data
      return {...action.data, redirectTo: getRedirect(type, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
        return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []
// 产生userList的reducer
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList
})
