import React, {
    View,
    ListView,
    Image,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/chatroom'
import basicStyles, {
    LIGHT_GRAY,
    LIGHT_RED,
    GRAY,
} from '../styles/basic'
import { getClient, shutDown } from '../../../libs/network/socket/chatClient'
import DelayTrigger from '../../../libs/tools/delayTrigger'

const INFO_TYPE = {
    SYS: 0,
    CHAT: 1
}

let typingGuys = []
let typingStatus = false

export default class Chatroom extends React.Component {

    constructor(props) {
        super(props)
        this.counter = 0
        this.chatHis = []
        this.state = {
            content: '',
            chatStatus: '屋里静悄悄的...',
            chatInfos: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        }
    }

    componentDidMount() {
        this.connectChatServer()
    }

    enterChatContent(text) {

        this.setState({
            content: text
        })

        if (typingStatus == false) {
            this.chatClient.beginTyping()
            typingStatus = true
        }
        DelayTrigger.addTrigger('chat.typing', () => {
            this.chatClient.stopTyping()
            typingStatus = false
        }, this, 1200)
    }
    /**
     * 发送消息
     */
    sendMessage() {
        if (!this.state.content.trim()) {
            ToastAndroid.show('不能发送空消息喔', ToastAndroid.SHORT)
        } else {
            this.chatClient.sendMessage(this.state.content)
            this.pushHis({
                type: INFO_TYPE.CHAT,
                text: this.state.content.trim(),
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

    /**
     * 追加聊天记录
     */
    pushHis(his) {
        his.id = this.counter++;
        this.chatHis[this.chatHis.length] = his
        this.setState({
            chatInfos: this.state.chatInfos.cloneWithRows(this.chatHis)
        })
    }

    /**
     * 滚上去~
     */
    scrollTop() {
        DelayTrigger.addTrigger('chat.scrollTop', () => {
            this.refs.chatList.scrollTo({
                y: 0,
                animated: true,
            })
        })
    }

    /**
     * 滚下来
     */
    scrollDown() {
        DelayTrigger.addTrigger('chat.scrollDown', () => {
            this.refs.chatList.scrollTo({
                y: -1 >>> 1
            })
        })
    }

    /**
     * 连接到聊天服务器
     */
    connectChatServer() {
        // ToastAndroid.show('connect server', 500)
        this.chatClient = getClient()

        // 用户登入信息
        this.chatClient['on user joined']((_data) => {
            this.pushHis({
                type: INFO_TYPE.SYS,
                text: `${_data.user.name}加入了聊天室`
            })
        })

        // 有人退出聊天室
        this.chatClient['on disconnect']((_data) => {
            this.pushHis({
                type: INFO_TYPE.SYS,
                text: `${_data.user.name}离开了聊天室`
            })
        })

        // 接收信息
        this.chatClient['on new message']((_msg) => {
            this.pushHis({
                type: INFO_TYPE.CHAT,
                text: _msg.message,
                createTime: _msg.createTime,
                isMine: false,
                user: _msg.sender
            })
            this.scrollDown()
        })

        // 有人输入信息
        this.chatClient['on typing']((_data) => {
            if (!typingGuys.filter(d => d['_id'] == _data['_id']).length) {
                typingGuys[typingGuys.length] = _data
            }
            this.updateChatStatus()
        })

        // 有人停止输入
        this.chatClient['on stop typing']((_data) => {
            let _index = typingGuys.findIndex(d => d['_id'] == _data['_id'])
            if (_index > -1) {
                typingGuys.splice(_index, 1)
            }
            this.updateChatStatus()
        })

        this.chatClient.open()
    }

    updateChatStatus() {
        if (typingGuys.length > 0) {
            this.setState({
                chatStatus: typingGuys.reduce((p, n) => {
                    return p += n['user']['name'] + ' '
                }, '') + '正在输入'
            })
        } else {
            this.setState({
                chatStatus: '屋里静悄悄的...'
            })
        }
    }

    /**
     * 渲染聊天记录
     */
    renderChatHis(his) {
        switch (his.type) {
            case INFO_TYPE.SYS:  // 系统信息
                return (
                    <View key={his.id}>
                        <Text style={styles.sysInfo}>{his.text}</Text>
                    </View>
                )
            case INFO_TYPE.CHAT:  // 聊天记录
                let uri = !~his.user.avatar.indexOf('http:') ? `${apis.SERVER}/${his.user.avatar}` : his.user.avatar
                let paras = his.text.trim().split('\n')
                let fullLines = 0, lines
                paras.forEach(p => fullLines += p.length / 20 >>> 0)
                lines = paras.length + fullLines - 1
                let _style = lines > 0 ? {
                    minHeight: (lines + 1) * 22
                } : {}
                if (fullLines > 0) {
                    _style.width = 244
                }
                let _listStyle = lines > 0 ? {
                    height: _style.minHeight + 12
                } : { height: 38 }

                if (his.isMine) {
                    // 我的聊天信息
                    return (<View key={his.id}
                        style={[styles.listItem, styles.isMine, _listStyle]} >
                        <View style={[styles.msgContent, styles.isMyContent]}>
                            <Text style={[styles.message, _style]}>{his.text}</Text>
                        </View>
                        <Image source={{ uri: uri }}
                            style={[styles.avatar, styles.isMyAvatar]}></Image>
                    </View>)
                } else {
                    return (<View key={his.id}
                        style={[styles.listItem, _listStyle]}>
                        <TouchableOpacity
                            onPress={ () => this.viewProfile(his) }>
                            <Image source={{ uri: uri }}
                                style={styles.avatar}></Image>
                        </TouchableOpacity>
                        <View  style={[styles.msgContent]}>
                            <Text style={[styles.message, _style]}>{his.text}</Text>
                        </View>
                    </View>)
                }
        }
    }

    viewProfile(his) {
        ToastAndroid.show(his.user.name, 500)
    }

    render() {
        return (
            <View>
                <Text style={styles.title}
                    onPress={this.scrollTop.bind(this) }>
                    {this.state.chatStatus}
                </Text>
                <View style={styles.list}>
                    <ListView
                        ref="chatList"
                        style={styles.chatList}
                        dataSource={this.state.chatInfos}
                        renderRow={this.renderChatHis.bind(this) }
                        />
                </View>
                <View style={styles.commentContainer}>
                    <View style={styles.contentContainer}>
                        <TextInput
                            ref="contentInput"
                            style={styles.content}
                            placeholder="你想说点啥"
                            multiline={true}
                            placeholderTextColor='#cecece'
                            underlineColorAndroid="transparent"
                            value={this.state.content}
                            onChangeText={this.enterChatContent.bind(this) }/>
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
