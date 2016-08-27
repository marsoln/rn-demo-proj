import { StyleSheet, Dimensions} from 'react-native'

const LIGHT = '#fefefe'
const LIGHT_BLUE = '#aaccee'
const LIGHT_RED = '#E23337'
const LIGHT_GREEN = '#9AB44C'
const LIGHT_GRAY = '#eaeaea'
const LIGHT_BORDER = '#8ea367'

const DARK = '#3e3e3e'
const DARK_BLUE = '#282E5E'
const DARK_RED = '#B63032'
const DARK_GREEN = '#343428'
const DARK_GRAY = '#575757'
const DARK_BORDER = '#3e8299'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const DEFAULT = StyleSheet.create({
    window: {
        height: WINDOW_HEIGHT,
        backgroundColor: LIGHT
    },
    panel: {
        backgroundColor: LIGHT,
        color: DARK
    },
    container: {
        paddingTop: 44
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: LIGHT_BORDER,
        padding: 8,
        marginLeft: 52,
        marginRight: 52,
    },
    button: {
        color: LIGHT
    },
    buttonDark: {
        color: DARK
    },
    btnLarger: {
        fontSize: 18
    },
    btnDanger: {
        borderColor: DARK_RED,
        backgroundColor: LIGHT_RED,
    },
    lineInput: {
        textAlign: 'left',
        fontSize: 16,
        marginLeft: 32,
        marginRight: 32,
        marginTop: 0,
        marginBottom: 0,
        padding: 8
    },
    link: {
        marginTop: 8,
        marginLeft: 32,
        marginRight: 32,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    right: {
        justifyContent: 'flex-end',
    },
    bgDark: {
        backgroundColor: DARK
    },
    bgDarkBlue: {
        backgroundColor: DARK_BLUE
    },
    bgDarkRed: {
        backgroundColor: DARK_RED
    },
    bgDarkGreen: {
        backgroundColor: DARK_GREEN
    }
})

let currentStyle = DEFAULT

export default currentStyle
export {
LIGHT,
LIGHT_BLUE,
LIGHT_RED,
LIGHT_GREEN,
LIGHT_GRAY,
LIGHT_BORDER,
DARK,
DARK_BLUE,
DARK_RED,
DARK_GREEN,
DARK_GRAY,
DARK_BORDER,
WINDOW_HEIGHT,
WINDOW_WIDTH,
}