import React, {
    View,
    BackAndroid,
    Navigator,
    ListView,
    Image,
    Text,
    ToastAndroid,
    ScrollView,
    TouchableOpacity
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/chatroom'
import basicStyles from '../styles/basic'

export default class Chatroom extends React.Component {

    constructor(props) {
        super(props)
        const nav = this.props.nav
        this.state = {
            data: null,
            dataList: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    renderItem(item) {
        return (
            <View>
                <Image source={ require(item.avatar) }></Image>
                <Text key={item.id} style={[styles.listItem, basicStyles.panel]}>
                    {item.username}
                </Text>
            </View>
        )
    }

    fetchData() {

    }

    render() {
        return (
            <View>
                <View style={basicStyles.window}>
                </View>
                <ListView
                    ref="list"
                    style={styles.list}
                    dataSource={this.state.dataList}
                    renderRow={this.renderItem.bind(this) }
                    />
            </View>
        )
    }
}
