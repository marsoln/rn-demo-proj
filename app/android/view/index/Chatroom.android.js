import React, {
    View,
    ListView,
    Image,
    Text,
    TextInput,
    ToastAndroid,
    ScrollView,
    TouchableOpacity
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/chatroom'
import basicStyles from '../styles/basic'
import Client from '../../../libs/network/socket/chatClient'

const TYPE = {
    SYS: 0,
    HIS: 1
}

export default class Chatroom extends React.Component {

    constructor(props) {
        super(props)
        this.counter = 0
        this.chatHis = []
        this.state = {
            content: null,
            chatRoomUserAmount: 0,
            chatInfos: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        }
    }

    sendMessage() {
        if (!this.state.content) {
            ToastAndroid.show('不能发送空消息喔', ToastAndroid.SHORT)
        } else {
            this.chatClient.sendMessage(this.state.content)
            this.pushHis({
                type: TYPE.HIS,
                text: this.state.content,
                createTime: Date.now(),
                isMine: true,
                user: this.chatClient.user
            })
            this.setState({
                content: ''
            })
            this.refs.contentInput.blur()
            this.scrollDown()
        }
    }

    componentDidMount() {
        this.connectChatServer()
    }

    renderChatHis(his) {
        switch (his.type) {
            case TYPE.SYS:
                break
            case TYPE.HIS:
                let uri = !~his.user.avatar.indexOf('http:') ? `${apis.SERVER}/${his.user.avatar}` : his.user.avatar
                let lines = his.text.length / 20 >>> 0
                let _style = lines > 0 ? {
                    width: 244,
                    minHeight: (lines + 1) * 22
                } : {}
                let _listStyle = lines > 0 ? {
                    height: _style.minHeight + 18
                } : { height: 42 }

                if (his.isMine) {
                    // 我的聊天信息
                    return (
                        <View key={his.id}
                            style={[styles.listItem, styles.isMine, _listStyle]} >
                            <View  style={[styles.msgContent, styles.isMyContent]}>
                                <Text style={[styles.message, _style]}>{his.text}</Text>
                            </View>
                            <Image source={{ uri: uri }}
                                style={[styles.avatar, styles.isMyAvatar]}></Image>
                        </View>
                    )
                } else {
                    // 其他人发送的聊天信息
                    return (
                        <View key={his.id}
                            style={[styles.listItem, _listStyle]} >
                            <Image source={{ uri: uri }}
                                style={styles.avatar}></Image>
                            <View  style={[styles.msgContent]}>
                                <Text style={[styles.message, _style]}>{his.text}</Text>
                            </View>
                        </View>
                    )
                }
        }
    }

    pushHis(his) {
        his.id = this.counter++;
        this.chatHis[this.chatHis.length] = his
        this.setState({
            chatInfos: this.state.chatInfos.cloneWithRows(this.chatHis)
        })
    }

    scrollDown() {
        setTimeout(() => {
            this.refs.chatList.scrollTo({
                y: -1 >>> 1
            })
        }, 200)
    }

    autoScrollDown() {
        if (this.refs.chatList.scrollHeight) {
            this.scrollDown()
        }
    }

    connectChatServer() {
        this.chatClient = new Client().open()

        // 聊天室信息
        this.chatClient.onUserAmountChanged((_data) => {
            this.setState({
                chatRoomUserAmount: _data['numUsers']
            })
        })

        // 用户登入信息
        this.chatClient.onUserJoined((_user) => {
            this.pushHis({
                type: TYPE.SYS,
                text: `${_user.name}加入了聊天室.`
            })
        })

        // 接收信息
        this.chatClient.onRecieveMessage((_msg) => {
            this.pushHis({
                type: TYPE.HIS,
                text: _msg.message,
                createTime: _msg.createTime,
                isMine: false,
                user: _msg.sender
            })
            this.autoScrollDown()
        })
    }

    render() {
        return (
            <View>
                <View style={basicStyles.window}>
                    <Text style={styles.title}>当前在线 {this.state.chatRoomUserAmount} 人</Text>
                    <View style={styles.list}>
                        <ListView
                            ref="chatList"
                            style={styles.chatList}
                            dataSource={this.state.chatInfos}
                            renderRow={this.renderChatHis.bind(this) }
                            />
                    </View>
                </View>
                <View style={styles.commentContainer}>
                    <View style={styles.contentContainer}>
                        <TextInput
                            ref="contentInput"
                            style={styles.content}
                            placeholder="你想说点啥"
                            value={this.state.content}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ content: text }) }/>
                    </View>
                    <TouchableOpacity style={styles.sendBtnContainer}
                        onPress={this.sendMessage.bind(this) }>
                        <Text style={styles.sendBtn}>发射!!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
