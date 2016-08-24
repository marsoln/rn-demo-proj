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

import DemoList from '../demo/DemoList'

export default class MainTabView extends React.Component {
  constructor(props) {
    super(props);
    const nav = this.props.nav;
    this.state = {
      selectedTab: this.props.selectedTab != null ? this.props.selectedTab : 'Main'
    }
  }

  componentDidMount() {

  }

  render() {

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
          <DemoList></DemoList>
        </TabNavigator.Item>


        <TabNavigator.Item
          selected={this.state.selectedTab === 'Sec'}
          title="第二页"
          renderIcon={
            () => <Icon
              name='credit-card'
              size={22}
              style={{ height: 22 }}
              color='#656468'
              />}
          renderSelectedIcon={() =>
            <Icon
              name='credit-card-alt'
              size={22}
              style={{ height: 22 }}
              color='#3b5998'
              />}
          titleStyle={{ fontSize: 12 }}
          onPress={() => this.setState({ selectedTab: 'Sec' }) }>
          <Text>Sec</Text>
        </TabNavigator.Item>


        <TabNavigator.Item
          selected={this.state.selectedTab === 'Third'}
          title="第三页"
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
          onPress={() => this.setState({ selectedTab: 'Third' }) }>
          <Text>第三页</Text>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

