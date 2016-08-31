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
    GREEN,
    RED,
    DARK,
    DARK_GOLDEN,
    DARK_GREEN,
    DARK_GRAY,
    DARK_RED,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from './basic'
let listHeight = WINDOW_HEIGHT - 48 - 24 - 70

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        height: 48,
        paddingTop: 14,
        fontSize: 14,
        backgroundColor: DARK_GRAY,
        color: LIGHT_GREEN,
    },
    list: {
        height: listHeight,
        // backgroundColor: LIGHT,
    },
    chatList: {
        paddingTop: 3,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        flex: 1,
    },
    sysInfo: {
        color: GREEN,
        textAlign: 'center',
        padding: 10,
    },
    message: {
        color: DARK,
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
    active: {
        width: 55,
        height: 55,
        borderRadius: 90,
    },
    commentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 2,
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
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: LIGHT_BLUE,
        marginRight: 3,
        backgroundColor: GRAY,
        paddingLeft: 8,
        paddingRight: 8,
    },
    sendBtn: {
        color: LIGHT,
    },
})