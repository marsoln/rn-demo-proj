import { StyleSheet } from 'react-native'
import {
    LIGHT,
    LIGHT_GRAY,
    LIGHT_GREEN,
    LIGHT_GOLDEN,
    GRAY,
    DARK_GREEN,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from './basic'
export default StyleSheet.create({
    container: {
        height: WINDOW_HEIGHT,
    },
    bgYellow: {
        backgroundColor: '#eae392'
    },
    bgGreen: {
        backgroundColor: DARK_GREEN
    },
    header: {
        fontSize: 36,
        color: LIGHT,
        textAlign: 'center',
        marginBottom: 80,
    },
    right: {
        textAlign: 'right',
        color: GRAY,
    },
    submit: {
        position: 'absolute',
        bottom: 120,
        left: 24,
        width: WINDOW_WIDTH - 48,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: LIGHT_GREEN,
    }
})