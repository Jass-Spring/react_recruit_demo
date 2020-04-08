import io from 'socket.io-client'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList
} from '../api/index'

/**
 * 单例
 * 创建对象之前：判断对象是否存在，不存在时才去创建
 * 创建对象之后：保存对象
 */

function initIO () {
  if (!io.socket) {
    // 连接服务器，得到服务器的连接对象
    io.socket = io('ws://localhost:4000')
    // 绑定监听，接收服务器返回的消息
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('接收消息：', chatMsg)
    })
  }
}

// 发送消息异步action
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log('发送消息', { from, to, content })
    io.socket.emit('sendMsg', { from, to, content })
  } 
}

// 异步获取消息列表
async function getMsgList (dispatch) {
  initIO()
  const response = await reqMsgList()
  const result = response.data
  if (result.code === 0) {
    const { users, chatMsgs } = result.data
    dispatch(receiveMsgList({ users, chatMsgs }))
  }
}

// 授权成功同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 提示错误信息同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接受用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收消息列表的同步action
export const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
// 接收一个消息的同步action
export const receiveMsg = () => ({ type: RECEIVE_MSG, data: {  } })

// 注册异步action
export const register = (user) => {
  const { username, password, password2, type } = user
  if (username === '' ) {
    console.log('用户名不能为空')
    return errorMsg('用户名不能为空')
  } else if (password === '') {
    console.log('密码不能为空')
    return errorMsg('密码不能为空')
  } else if (password2 === '') {
    console.log('两次密码不一致')
    return errorMsg('两次密码不一致')
  } else if (type === '') {
    console.log('请选择用户类型')
    return errorMsg('请选择用户类型')
  }

  return async dispatch => {
    const response = await reqRegister({ username, password, type })
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch)
      // 分发授权成功同步action
      dispatch(authSuccess(result.data))
    } else {
      // 分发提示错误信息同步action
      dispatch(errorMsg(result.msg))
    }
  }
}
// 登录异步action
export const login = (user) => {
  const { username, password } = user
  if (username === '' ) {
    return errorMsg('用户名不能为空')
  } else if (password === '') {
    return errorMsg('密码不能为空')
  }

  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch)
      // 分发授权成功同步action
      dispatch(authSuccess(result.data))
    } else {
      // 分发提示错误信息同步action
      dispatch(errorMsg(result.msg))
    }
  }
}
// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data

    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
// 获取用户信息异步action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户列表同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })

// 获取用户列表异步action
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
