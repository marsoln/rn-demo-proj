import React, {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from '../../../libs/system/react'
import { NavigationActions } from 'react-navigation'
import apis from '../../../libs/network/apis'
import styles from '../styles/loginAndRegister'
import basicStyles from '../styles/basic'
import FadeInContainer from '../components/FadeInContainer'
import Toast from 'react-native-toast'
import DB from 'react-native-store'

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props)
        let account = DB.model('account')
        let _where = { where: { state: 'last_login_user' } }

        account.find(_where).then(res => {
            if (res && res[0]) {
                this.setState({
                    username: res[0]['username'],
                    password: res[0]['password']
                })
            }
        })

        this.state = {
            username: '',
            unsubmit: true  // 是否未提交
        }
    }

    gotoRegister() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Register' })
            ]
        }))
    }

    validate() {
        if (this.state.username === '') {
            Toast.show('请填写用户名', 'short')
            return false
        }
        if (this.state.password === '') {
            Toast.show('请填写密码', 'short')
            return false
        }
        return true
    }

    loginSubmit() {
        if (this.state.unsubmit && this.validate()) {
            apis
                .UserState
                .login(this.state.username, this.state.password)
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
                        Toast.show(res.data, 'short')
                    }
                })
            this.state.unsubmit = false
        }
    }

    renderContent() {
        return () => {
            return (
                <View>
                    <View style={[basicStyles.container, styles.container, styles.bgGreen]}>
                        <Text style={styles.header}>进来坐坐</Text>
                        <View>
                            <View style={basicStyles.lineInputWrapper}>
                                <TextInput
                                    style={basicStyles.lineInput}
                                    placeholder="用户名"
                                    value={this.state.username}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => this.setState({ username: text })} />
                            </View>
                            <View style={basicStyles.lineInputWrapper}>
                                <TextInput
                                    style={basicStyles.lineInput}
                                    placeholder="密码"
                                    secureTextEntry={true}
                                    defaultValue={this.state.password}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                        </View>
                        <View style={[basicStyles.link, basicStyles.right]}>
                            <Text style={styles.right}
                                onPress={this.gotoRegister.bind(this)}>还没有注册?</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[basicStyles.btnContainer, styles.submit]}
                            onPress={this.loginSubmit.bind(this)}>
                            <Text style={basicStyles.button}>登录</Text>
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