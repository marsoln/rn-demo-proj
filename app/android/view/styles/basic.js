import { StyleSheet, Dimensions} from 'react-native'

const LIGHT = '#fefefe', LIGHT_BLUE = '#aaccee', LIGHT_GOLDEN = '#ECE165', LIGHT_RED = '#E23337', LIGHT_GREEN = '#AAC45C', LIGHT_GRAY = '#efefef', LIGHT_BORDER = '#8ea367'

const GRAY = '#989898', GOLDEN = '#DED537', RED = '#D65042'

const DARK = '#2f441f', DARK_BLUE = '#282E5E', DARK_GOLDEN = '#ACA125', DARK_RED = '#B63032', DARK_GREEN = '#346428', DARK_GRAY = '#575757', DARK_BORDER = '#3e8299'

const WINDOW_WIDTH = Dimensions.get('window').width, WINDOW_HEIGHT = Dimensions.get('window').height

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
    lineInputWrapper: {
        backgroundColor: LIGHT_GREEN,
        borderRadius: 10,
        marginLeft: 32,
        marginRight: 32,
        marginTop: 0,
        marginBottom: 11,
    },
    lineInput: {
        textAlign: 'left',
        paddingLeft: 12,
        fontSize: 16,
        padding: 5,
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
LIGHT_GOLDEN,
LIGHT_RED,
LIGHT_GREEN,
LIGHT_GRAY,
LIGHT_BORDER,

GRAY,
GOLDEN,
RED,

DARK,
DARK_BLUE,
DARK_GOLDEN,
DARK_RED,
DARK_GREEN,
DARK_GRAY,
DARK_BORDER,
WINDOW_HEIGHT,
WINDOW_WIDTH,
}