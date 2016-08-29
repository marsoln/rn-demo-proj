import io from './socket.io'
import { SERVER } from '../utils/http'
import {getCurrentUser} from '../utils/currentUser'

const SERVICE_NAME_PREFIX = 'chatroom-'
class Client {

    constructor() {
        this.socket = null
        // 尴尬...
        let user = Object.assign({}, getCurrentUser())
        user.name = user.username
        this.user = user
    }

    open() {
        this.socket = io(SERVER)
        this.socket.emit(SERVICE_NAME_PREFIX + 'add user', this.user)
        return this
    }

    onUserAmountChanged(handleEvent) {
        this.socket.on(`${SERVICE_NAME_PREFIX}login`, handleEvent)
    }

    onUserJoined(handleEvent) {
        this.socket.on(`${SERVICE_NAME_PREFIX}user joined`, handleEvent)
    }

    onRecieveMessage(handleEvent) {
        this.socket.on(`${SERVICE_NAME_PREFIX}new message`, handleEvent)
    }

    onSomeoneTyping(handleEvent) {
        this.socket.on(`${SERVICE_NAME_PREFIX}typing`, handleEvent)
    }

    sendMessage(msg) {
        this.socket.emit(`${SERVICE_NAME_PREFIX}new message`, { message: msg })
    }
}

export default Client