import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  NavBar,
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import { register } from '../../redux/actions'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'laoban'
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  register = () => {
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render () {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div>
        <NavBar>React&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <InputItem onChange={val => this.handleChange('username', val)}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={val => this.handleChange('password2', val)}>确认密码：</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账号,去登录</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)
