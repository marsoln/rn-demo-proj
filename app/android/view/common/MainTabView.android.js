'use strict'

import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import TabNavigator from 'react-native-tab-navigator'

import Main from '../index/Main'
import Chatroom from '../index/Chatroom'
import Setting from '../index/Setting'
import FadeInContainer from '../common/FadeInContainer'

export default class MainTabView extends React.Component {
  constructor(props) {
    super(props);
    const nav = this.props.nav;
    this.state = {
      selectedTab: this.props.selectedTab != null ? this.props.selectedTab : 'Main'
    }
  }

  renderContent() {
    return () => {
      return (
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Main'}
            title="主页"
            renderIcon={
              () => <Icon
                name='bell'
                size={22}
                style={{ height: 22 }}
                color='#656468'
                />}
            renderSelectedIcon={() =>
              <Icon
                name='bell-o'
                size={22}
                style={{ height: 22 }}
                color='#3b5998'
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.setState({ selectedTab: 'Main' }) }>
            <Main nav={this.props.nav}></Main>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Chat'}
            title="聊天"
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
                color='#3b5998'
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.setState({ selectedTab: 'Chat' }) }>
            <Chatroom nav={this.props.nav}></Chatroom>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Setting'}
            title="我"
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
                color='#3b5998'
                />}
            titleStyle={{ fontSize: 12 }}
            onPress={() => this.setState({ selectedTab: 'Setting' }) }>
            <Setting nav={this.props.nav}></Setting>
          </TabNavigator.Item>

        </TabNavigator>
      )
    }
  }

  render() {
    return (<FadeInContainer renderContent={ this.renderContent() }></FadeInContainer>)
  }
}

