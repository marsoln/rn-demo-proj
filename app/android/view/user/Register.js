import React, {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from '../../../libs/system/react'

import { NavigationActions } from 'react-navigation'
import apis from '../../../libs/network/apis'
import styles from '../styles/loginAndRegister'
import basicStyles, { LIGHT_GREEN } from '../styles/basic'
import FadeInContainer from '../components/FadeInContainer'
import Toast from 'react-native-toast'

export default class Register extends React.Component {
    static navigationOptions = {
        title: 'Register'
    }
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            unsubmit: true
        }
    }

    validate() {
        if (!this.state.username) {
            Toast.show('请输入用户名', 1000)
            return false
        }
        if (!this.state.password) {
            Toast.show('请输入密码', 1000)
            return false
        }
        if (!this.state.confirmPassword) {
            Toast.show('请输入确认密码', 1000)
            return false
        }
        if (this.state.password != this.state.confirmPassword) {
            Toast.show('两次输入的密码不一致', 1000)
            return false
        }
        return true
    }

    registerSubmit() {
        if (this.state.unsubmit && this.validate()) {
            apis
                .UserState
                .register(this.state.username, this.state.password, this.state.confirmPassword)
                .then((res) => {
                    this.state.unsubmit = true
                    if (res.type == apis.STATES.SUCCESS) {
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Main' })
                            ]
                        }))
                    } else {
                        Toast.show(res.data, 2000)
                    }
                })
            this.state.unsubmit = false
        }
    }

    gotoLogin() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        }))
    }

    renderContent() {
        return () => {
            return (
                <View>
                    <View style={[basicStyles.container, styles.container, styles.bgYellow]}>
                        <Text style={styles.header}>来嘛, 客官~</Text>
                        <View>
                            <View style={basicStyles.lineInputWrapper}>
                                <TextInput
                                    ref="username"
                                    style={basicStyles.lineInput}
                                    placeholder="用户名"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => this.setState({ username: text })} />
                            </View>
                            <View style={basicStyles.lineInputWrapper}>
                                <TextInput
                                    ref="password"
                                    style={basicStyles.lineInput}
                                    placeholder="密码"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                            <View style={basicStyles.lineInputWrapper}>
                                <TextInput
                                    ref="confirmPassword"
                                    style={basicStyles.lineInput}
                                    placeholder="确认密码"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })} />
                            </View>
                        </View>
                        <View style={[basicStyles.link, basicStyles.right]}>
                            <Text style={styles.right}
                                onPress={this.gotoLogin.bind(this)}>已经有账号</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={[basicStyles.btnContainer, styles.submit]}
                            onPress={this.registerSubmit.bind(this)}>
                            <Text style={basicStyles.button}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (<FadeInContainer renderContent={this.renderContent()}></FadeInContainer>)
    }
}