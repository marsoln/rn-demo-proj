import io from './socket.io'
import { SERVER } from '../utils/http'
import currentUser from '../utils/currentUser'

const SERVICE_NAME_PREFIX = 'chatroom-'
const SOCKET = io(SERVER)
const client = null

let noop = function () { }
let handlers = null
let resetHandler = () => {
    handlers = {
        'login': noop,
        'user joined': noop,
        'new message': noop,
        'typing': noop,
    }
}

(() => {
    resetHandler()
    for (let key in handlers) {
        SOCKET.on(`${SERVICE_NAME_PREFIX}${key}`, (args) => { handlers[key](args) })
    }
})()


class ChatClient {

    constructor() {
        this.user = Object.assign({}, currentUser.getCurrentUser())
    }

    open() {
        if (null == this.socket) {
            SOCKET.emit(`${SERVICE_NAME_PREFIX}add user`, this.user)
        }
        return this
    }

    onUserAmountChanged(handleEvent) {
        handlers['login'] = handleEvent
    }

    onUserJoined(handleEvent) {
        handlers['user joined'] = handleEvent
    }

    onRecieveMessage(handleEvent) {
        handlers['new message'] = handleEvent
    }

    onSomeoneTyping(handleEvent) {
        handlers['typing'] = handleEvent
    }

    sendMessage(msg) {
        SOCKET.emit(`${SERVICE_NAME_PREFIX}new message`, { message: msg })
    }

    destroy() {
        SOCKET.emit(`${SERVICE_NAME_PREFIX}disconnect`, this.user)
        this.user = null
    }
}

export function getClient() {
    if (null == client) {
        client = new ChatClient()
    }
    return client.open()
}

export function shutDown() {
    if (client) {
        client.destroy()
        client.user = null
        client = null
    }
    resetHandler()
}