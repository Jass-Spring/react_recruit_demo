import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

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
    console.log(this.state)
  }

  render () {
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
  state => ({}),
  {}
)(DashenInfo)
