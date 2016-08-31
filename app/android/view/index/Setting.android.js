import React, {
    View,
    BackAndroid,
    Navigator,
    ListView,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
    ScrollView,
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/setting'
import basicStyles from '../styles/basic'
import { getClient, shutDown } from '../../../libs/network/socket/chatClient'

export default class Setting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: apis.CurrentUser.getCurrentUser()
        }
    }

    logout() {
        apis
            .UserState
            .logout()
        shutDown()
        this.props.nav.immediatelyResetRouteStack([
            { id: 'Login' }
        ])
    }

    render() {
        let uri = !~this.state.currentUser.avatar.indexOf('http:') ? `${apis.SERVER}/${this.state.currentUser.avatar}` : this.state.currentUser.avatar
        return (
            <View>
                <View style={basicStyles.window}>
                    <View style={styles.header}>
                        <Image style={styles.avatar}
                            source={{ uri: uri }}/>
                        <View style={styles.usernameContainer}>
                            <Text style={styles.nickname}>
                                {this.state.currentUser.nickname}
                            </Text>
                            <Text style={styles.username}>
                                {this.state.currentUser.username}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[basicStyles.btnContainer, basicStyles.btnDanger, styles.logoutBtn]} onPress={this.logout.bind(this) }>
                    <Text style={basicStyles.button}>登出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
