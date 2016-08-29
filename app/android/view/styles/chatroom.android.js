import { StyleSheet } from 'react-native'
import {
    LIGHT,
    LIGHT_GRAY,
    LIGHT_BLUE,
    LIGHT_GREEN,
    GRAY,
    DARK_GREEN,
    DARK_GRAY,
    DARK_RED,
    WINDOW_HEIGHT
} from './basic'

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        height: 24,
        padding: 3
    },
    list: {
        height: WINDOW_HEIGHT - 50 - 24 - 70,
    },
    chatList: {

    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        flex: 1,
    },
    message: {
        lineHeight: 22
    },
    msgContent: {
        backgroundColor: LIGHT_BLUE,
        borderRadius: 4,
        marginLeft: 9,
        marginRight: 9,
        padding: 8,
    },
    isMine: {
        justifyContent: 'flex-end',
    },
    isMyContent: {
        backgroundColor: LIGHT_GREEN,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 5,
        marginLeft: 12,
        marginRight: 1,
    },
    isMyAvatar: {
        marginLeft: 1,
        marginRight: 12,
    },
    commentContainer: {
        bottom: 120,
        height: 47,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0,
        borderTopWidth: 1,
        borderTopColor: '#f3f6f8',
        backgroundColor: '#fbfbfb',
    },
    contentContainer: {
        flex: 5,
        justifyContent: 'center',
    },
    content: {
        padding: 7,
        paddingLeft: 10,
        marginBottom: -2,
    },
    sendBtnContainer: {
        flex: 1,
        margin: 0,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: LIGHT_BLUE,
        padding: 6,
        marginRight: 8,
        backgroundColor: DARK_GRAY,
    },
    sendBtn: {
        color: LIGHT_GREEN
    },
})