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
import TabNavigator from 'react-native-tab-navigator'
import Main from '../index/Main'
import Chatroom from '../index/Chatroom'
import Setting from '../index/Setting'
import FadeInContainer from '../components/FadeInContainer'

export default class MainTabView extends React.Component {
  constructor(props) {
    super(props);
    const nav = this.props.nav;
    this.state = {
      selectedTab: this.props.selectedTab != null ? this.props.selectedTab : 'Main',
      hiddenStatus: true
    }
  }

  switchPage(keyword) {
    this.setState({
      selectedTab: keyword,
    })
  }

  renderContent() {
    return () => {
      return (
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Main'}
            renderIcon={
              () => <Icon
                name='home'
                size={22}
                style={{ height: 22 }}
                color='#656468'
                />}
            renderSelectedIcon={() =>
              <Icon
                name='home'
                size={22}
                style={{ height: 22 }}
                color={LIGHT_GREEN}
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.switchPage('Main') }>
            <Main nav={this.props.nav}></Main>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Chat'}
            renderIcon={
              () => <Icon
                name='comments'
                size={22}
                style={{ height: 22 }}
                color='#656468'
                />}
            renderSelectedIcon={() =>
              <Icon
                name='comments-o'
                size={22}
                style={{ height: 22 }}
                color={BLUE}
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.switchPage('Chat') }>
            <Chatroom nav={this.props.nav}></Chatroom>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Setting'}
            renderIcon={
              () => <Icon
                name='user'
                size={22}
                style={{ height: 22 }}
                color='#656468'
                />}
            renderSelectedIcon={() =>
              <Icon
                name='user'
                size={22}
                style={{ height: 22 }}
                color={GOLDEN}
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.switchPage('Setting') }>
            <Setting nav={this.props.nav}></Setting>
          </TabNavigator.Item>

        </TabNavigator>
      )
    }
  }

  render() {
    return (
      <FadeInContainer renderContent={ this.renderContent() } hidden={this.state.hiddenStatus}/>
    )
  }
}

