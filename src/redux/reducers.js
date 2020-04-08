import { combineReducers } from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,

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

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}
// 产生聊天状态的reducer
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})
