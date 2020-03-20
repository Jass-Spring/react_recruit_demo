import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class LaobanInfo extends Component {
  state = {
    header: '',   // 头像名称
    post: '',     // 招聘职位
    info: '',     // 职位要求
    company: '',  // 公司名称
    salary: ''    // 职位薪资
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
        <InputItem onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
        <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
        <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
        <TextareaItem title="职位要求:" rows="3" onChange={val => this.handleChange('info', val)}></TextareaItem>
        <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(LaobanInfo)
