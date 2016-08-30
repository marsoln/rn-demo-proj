import { StyleSheet } from 'react-native'
import {
    LIGHT,
    LIGHT_GOLDEN,
    LIGHT_GRAY,
    LIGHT_BLUE,
    LIGHT_GREEN,
    LIGHT_RED,
    GRAY,
    GOLDEN,
    RED,
    DARK_GOLDEN,
    DARK_GREEN,
    DARK_GRAY,
    DARK_RED,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from './basic'

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        height: 48,
        fontSize: 16,
        padding: 12,
        backgroundColor: LIGHT_GRAY
    },
    list: {
        height: WINDOW_HEIGHT - 48 - 24 - 70,
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
        backgroundColor: '#f4f4f4',
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
        height: 47,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0,
        backgroundColor: DARK_GRAY,
    },
    contentContainer: {
        flex: 5,
    },
    content: {
        padding: 7,
        paddingLeft: 10,
        marginBottom: -2,
        color: LIGHT
    },
    sendBtnContainer: {
        flex: 1,
        margin: 0,
        marginTop: -3,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: LIGHT_BLUE,
        marginRight: 8,
        backgroundColor: GRAY,
    },
    sendBtn: {
        color: LIGHT
    },
})