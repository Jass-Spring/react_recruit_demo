import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/**
 * 对chatMsgs按chat_id进行分组
 * 1.找出每个chat_id的最后一条消息lastMsg，以{ chat_id, lastMsg }的形式保存
 * 2.得到所有lastMsg的数组
 * 3.对数组按create_time降序排序
 */
function getLastMsgs (chatMsgs, userId) {
  const lastMsgObjs = {}

  // 1.找出每个chat_id的最后一条消息lastMsg，以{ chat_id, lastMsg }的形式保存
  chatMsgs.forEach(msg => {
    if (msg.to === userId && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    const chatId = msg.chat_id
    // 获取已经保存的lastMsg
    const lastMsg = lastMsgObjs[chatId]

    if (!lastMsg) {
      // 没有lastMsg，将msg保存为lastMsg
      lastMsgObjs[chatId] = msg
    } else {
      // 有lastMsg，统计unReadCount
      const unReadCount = lastMsg.unReadCount + msg.unReadCount

      if (msg.create_time > lastMsg.create_time) {
        // 如果msg比lastMsg晚，将msg保存为lastMsg
        lastMsgObjs[chatId] = msg
      }

      // 将unReadCount保存到最新的lastMsg上
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })

  // 2.得到所有lastMsg的数组
  const lastMsgs = Object.values(lastMsgObjs)

  // 3.对数组按create_time降序排序
  lastMsgs.sort((m1, m2) => m2.create_time - m1.create_time)

  return lastMsgs
}

class Message extends Component {
  render () {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // 对chatMsgs按chat_id进行分组
    const lastMsgs = getLastMsgs(chatMsgs, user._id)

    return (
      <List style={{ paddingTop: 45, paddingBottom: 50 }}>
        {
          lastMsgs.map(msg => {
            const targetUserId = user._id === msg.to ? msg.from : msg.to
            const targetUser = users[targetUserId]

            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount} />}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                arrow="horizontal"
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
        
      </List>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {}
)(Message)
