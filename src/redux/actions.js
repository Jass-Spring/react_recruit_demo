import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api/index'

// 授权成功同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 提示错误信息同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接受用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

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
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 接收用户列表同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    } else {
      
    }
  }
}
