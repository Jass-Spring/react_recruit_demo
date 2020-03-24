import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Grid } from 'antd-mobile'

export default class HeaderSelector extends Component {
  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: `头像${i+1}`,
        icon: require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }

  state = {
    icon: null
  }

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  handleClick = ({ text, icon }) => {
    this.setState({
      icon
    })
    this.props.setHeader(text)
  }

  render () {
    const { icon } = this.state
    const ListHeader = !icon ? '请选择头像:' : (
      <div>
        已选择头像:<img src={icon} />
      </div>
    )

    return (
      <List renderHeader={() => ListHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.handleClick} />
      </List>
    )
  }
}
