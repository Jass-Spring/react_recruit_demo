import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import { sendMsg, readMsg } from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  }

  componentWillMount () {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝']
    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }

  componentDidMount () {
    // 滚动到最新消息的位置
    window.scrollTo(0, document.body.scrollHeight)

    // 更新未读消息
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  componentDidUpdate () {
    // 滚动到最新消息的位置
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount () {
    // 更新未读消息
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({ from, to, content })
    }
    this.setState({
      content: '',
      isShow: false
    })
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  render () {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    const myId = user._id
    if (!users[myId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [ myId, targetId ].sort().join('_')

    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    const targetName = users[targetId].username
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id="chat-page">
        <NavBar
          className="sticky-header"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {targetName}
        </NavBar>
        
        <List style={{ paddingTop: 45, paddingBottom: 45 }}>
          {/* <QueueAnim type="scale"> */}
            {
              msgs.map(msg => {
                if (myId === msg.to) {
                  return (
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else {
                  return (
                    <Item
                      key={msg._id}
                      className="chat-me"
                      extra="我"
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          {/* </QueueAnim> */}
        </List>

        <div className="am-tab-bar">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                <span onClick={this.toggleShow}>😃</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />

          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={item => {
                  this.setState({ content: this.state.content + item.text })
                }}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendMsg, readMsg }
)(Chat)