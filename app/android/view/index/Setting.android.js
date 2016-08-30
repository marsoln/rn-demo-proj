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
    }

    logout() {
        apis
            .UserState
            .logout()
            .then(res => {
                this.props.nav.immediatelyResetRouteStack([
                    { id: 'Login' }
                ])
                shutDown()
            })
    }

    render() {
        return (
            <View>
                <View style={basicStyles.window}>
                </View>
                <TouchableOpacity style={[basicStyles.btnContainer, basicStyles.btnDanger, styles.logoutBtn]} onPress={this.logout.bind(this) }>
                    <Text style={basicStyles.button}>登出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
