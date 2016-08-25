'use strict';

import React from 'react'
import { AppRegistry, View, BackAndroid, Navigator, Text, Alert, ToastAndroid, AppState } from 'react-native'
import apis from '../libs/network/apis.js'
import MainTabView from './view/common/MainTabView'

const EXIT_DELAY = 3000    // 双击退出客户端的相应延迟

var _navigator, _quitStatus = false;

apis.Util.setErrConsumeFunction(err => {
    if (err instanceof TypeError) {
        if (err.message == "Network request failed") {
            //网络问题 连接不到服务器
            Alert.alert(
                '警告',
                '请检查你的网络情况！', [
                    { text: 'OK' }
                ]
            )
        } else {
            Alert.alert(
                '警告',
                '未知错误！！！', [
                    { text: 'OK' }
                ]
            )
        }
    } else if (err instanceof SyntaxError) {
        Alert.alert(
            '警告',
            '呀！！不小心网络出问题了', [
                { text: 'OK' }
            ]
        )
    } else {
        Alert.alert(
            '警告',
            '未知错误！！！', [
                { text: 'OK' }
            ]
        )
    }
});


BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
        if (_quitStatus) {
            return false;
        } else {
            ToastAndroid.show("再按一次返回键退出客户端", ToastAndroid.SHORT)
            _quitStatus = true
            setTimeout(() => {
                _quitStatus = false
            }, EXIT_DELAY)
            return true
        }
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return { type: 0, currentAppState: "" };
    },
    componentDidMount() {

    },
    componentWillUnmount() {
    },
    renderScene: function (route, navigator) {
        _navigator = navigator;
        if (route.id === 'MainTabView') {
            return (<View style = { { flex: 1 } }>
                <MainTabView nav = { navigator }
                    type = { route.type }
                    selectedTab = { route.selectedTab }
                    />
            </View >
            );
        }
    },
    render: function () {

        return (<Navigator ref = "navigator"
            initialRoute = {
                { id: 'MainTabView', selectedTab: 'Main' }
            }
            configureScene = {
                () => Navigator.SceneConfigs.FadeAndroid
            }
            renderScene = { this.renderScene } />
        );

    },
    onReceiveMessage(message) {

    },

    onOpenMessage(message) { }
})