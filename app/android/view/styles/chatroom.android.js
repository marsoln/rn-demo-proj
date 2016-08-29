import { StyleSheet } from 'react-native'
import {LIGHT, LIGHT_GRAY, LIGHT_BLUE, LIGHT_GREEN, GRAY, DARK_RED} from './basic'

export default StyleSheet.create({
    title: {
        textAlign: 'center'
    },
    list: {
        marginBottom: 2,
        padding: 15,
        height: 450,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginBottom: 1,
        flex: 1,
    },
    message:{
        
    },
    msgContent: {
        backgroundColor: LIGHT_BLUE,
        padding: 8,
        borderRadius: 4,
        marginLeft: 9,
        marginRight: 9,
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
    },
    commentContainer: {
        bottom: 110,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 5,
    },
    content: {
        padding: 8,
        paddingLeft: 10,
    },
    sendBtnContainer: {
        flex: 1,
        margin: 0,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: LIGHT_GRAY,
        padding: 6,
        marginRight: 8,
        backgroundColor: LIGHT,
    },
    sendBtn: {
        color: GRAY
    },
})