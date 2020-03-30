import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Cookies from 'js-cookie'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import { getRedirect } from '../../utils'
import { getUser } from '../../redux/actions'

/**
 * 1.实现自动登录
 *  1-1.cookie中没有userid，重定向到登录页面
 *  1-2.cookie中有userid，读取redux中的user
 *    1-2-1.user中没有_id，
 *    1-2-2.user中有_id
 *      1-2-2-1.请求根路径时，根据user中的type和header计算路径并重定向
 *      1-2-2-2.根据路径重定向
 * 2.如果已经登录，根据type和header重定向到对应界面
 */
class Main extends Component {
  navList = [
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神'
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'personal',
      text: '用户'
    }
  ]

  componentDidMount () {
    const userid = Cookies.get('userid')
    const { _id } = this.props.user
    if (userid && !_id) {
      this.props.getUser()
    }
  }

  render () {
    // 1.实现自动登录，读取cookie中的userid
    const userid = Cookies.get('userid')

    // 1-1.cookie中没有userid，重定向到登录页面
    if (!userid) {
      return <Redirect to="/login" />
    }

    const { user } = this.props
    // 1-2.cookie中有userid，读取redux中的user
    if (!user._id) {
      // 1-2-1.user中没有_id，在componentDidMount()中请求发送请求获取user
      return null
    } else {
      // 1-2-2.user中有_id
      let path = this.props.location.pathname
      // 1-2-2-1.请求根路径时，根据user中的type和header计算路径并重定向
      if (path === '/') {
        path = getRedirect(user.type, user.header)
        return <Redirect to={path} />
      }
    }

    const { navList } = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if (currentNav) {
      if (user.type === 'laoban') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }

    // 1-2-2-2.根据路径重定向
    return (
      <div>
        { currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null }
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
          }
          <Route path="/laobaninfo" component={LaobanInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route path="/chat" component={chat} />
          <Route component={NotFound} />
        </Switch>
        { currentNav ? <NavFooter navList={navList} /> : null}
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)
