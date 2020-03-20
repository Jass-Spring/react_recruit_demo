import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  NavBar,
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import { login } from '../../redux/actions'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  login = () => {
    this.props.login(this.state)
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render () {
    const { msg, redirectTo } = this.props.user
    
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div>
        <NavBar>React&nbsp;直&nbsp;聘</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <InputItem onChange={val => this.handleChange('username', val)}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>没有账号?去注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)
