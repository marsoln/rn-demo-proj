import React, {
    View,
    ListView,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
    ScrollView,
} from '../../../libs/system/react'

import { NavigationActions } from 'react-navigation'
import apis from '../../../libs/network/apis'
import styles from '../styles/setting'
import basicStyles from '../styles/basic'
import {
    getClient,
    shutDown,
} from '../../../libs/network/socket/chatClient'
import Button from '../components/Button'
import { AppRouter } from '../../Routers.android'

export default class Setting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: apis.CurrentUser.getCurrentUser()
        }
    }

    componentDidMount() {
        this.updateProfile()
    }

    updateProfile() {
        apis
            .UserApi
            .userProfile(this.state.currentUser['id'])
            .then(data => {
                apis.CurrentUser.setCurrentUser(Object.assign({}, this.state.currentUser, data.user))
                this.setState({
                    currentUser: apis.CurrentUser.getCurrentUser()
                })
            })
    }

    editProfile(key) {
        let terms = {
            age: 12
        }

        let _str = JSON.stringify(terms)
        apis.UserApi
            .updateUserProfile(_str)
            .then(res => {
                if (res && res['updateUserProfile']) {
                    ToastAndroid.show(`update ${key} success`, 1000)
                } else {
                    ToastAndroid.show('更新失败.', 1000)
                }
            })
            .catch((e) => {
                ToastAndroid.show('服务器爆炸了.', 500)
            })
    }

    renderProfileItem(title, value, key) {
        return (
            <View style={styles.profileItem} key={key}>
                <Text style={styles.itemTitle}>{title}: </Text>
                <Text style={styles.itemValue}
                    onPress={() => this.editProfile(key)} >{value}</Text>
            </View>
        )
    }

    renderProfile() {
        let profileItemMapper = {
            gender: '性别',
            age: '年龄',
            birthday: '生日',
            email: '邮箱',
            phone: '手机',
            city: '所在城市',
            address: '地址',
            hometown: '家乡',
        }
        let res = []
        for (let name in profileItemMapper) {
            res[res.length] = this.renderProfileItem(profileItemMapper[name], this.state.currentUser[name], name)
        }
        return res
    }

    /**
     * 登出 
     */
    logout() {
        shutDown()
        apis.UserState.logout()
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        }))
    }

    render() {
        let uri = `${apis.SERVER}/${this.state.currentUser.avatar}`
        return (
            <View>
                <View style={basicStyles.window}>
                    <View style={styles.header}>
                        <Image style={styles.avatar}
                            source={{ uri: uri }} />
                        <View style={styles.usernameContainer}>
                            <Text style={styles.nickname}>
                                {this.state.currentUser.nickname}
                            </Text>
                            <Text style={styles.username}>
                                {this.state.currentUser.username}
                            </Text>
                        </View>
                    </View>
                    <View>
                        {this.renderProfile()}
                    </View>
                </View>

                <Button text='登出'
                    wrapperStyle={[basicStyles.btnDanger, styles.logoutBtn]}
                    onPress={this.logout.bind(this)}
                    delay={false} />
            </View>
        )
    }
}
