'use strict'

import React from 'react'

import {
  AppRegistry,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'

import {
  LIGHT_GRAY,
  LIGHT,
  LIGHT_SILVER,
  BLUE,
  GOLDEN,
  GRAY,
  DARK_BLUE,
  LIGHT_GREEN,
} from '../styles/basic'

import Icon from 'react-native-vector-icons/FontAwesome'
import { TabNavigator } from 'react-navigation'
import Main from '../index/Main'
import Chatroom from '../index/Chatroom'
import Setting from '../index/Setting'
import FadeInContainer from '../components/FadeInContainer'

class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '主页',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home'
        size={22}
        style={{ height: 22 }}
        color={tintColor || '#656468'}
      />
    )
  }

  render() {
    return <Main></Main>
  }
}

class ChatroomScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '聊天室',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='comments'
        size={22}
        style={{ height: 22 }}
        color={tintColor || '#656468'}
      />
    )
  }

  render() {
    return <Chatroom></Chatroom>
  }
}

class SettingScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '设置',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='user'
        size={22}
        style={{ height: 22 }}
        color={tintColor || '#656468'}
      />
    )
  }

  render() {
    return <Setting navigation={this.props.parentNav}></Setting>
  }
}

const TabNav = TabNavigator(
  {
    Home: {
      screen: MainScreen
    },
    Chatroom: {
      screen: ChatroomScreen
    },
    Setting: {
      screen: SettingScreen
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#fff',
      style: {
        height: 52,
        backgroundColor: '#3c3c3c'
      }
    },
    tabBarPosition: 'bottom'
  }
)

export default class MainTabView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hiddenStatus: true
    }
  }

  renderContent() {
    return () => {
      return (
        <TabNav></TabNav>
      )
    }
  }

  render() {
    return (
      <FadeInContainer renderContent={this.renderContent()} hidden={this.state.hiddenStatus} />
    )
  }
}

