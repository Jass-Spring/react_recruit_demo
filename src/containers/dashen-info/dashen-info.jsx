import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'

class DashenInfo extends Component {
  state = {
    header: '',   // 头像名称
    post: '',     // 求职岗位
    info: ''      // 个人介绍
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    // 如果信息已经完善，重定向到对应界面
    const { header, type } = this.props.user
    if (header) {
      // 说明信息已经完善
      const path = type === 'dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path} />
    }

    return (
      <div>
        <NavBar>完善信息</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
        <TextareaItem title="个人介绍:" rows={3} onChange={val => this.handleChange('info', val)}></TextareaItem>
        <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(DashenInfo)
