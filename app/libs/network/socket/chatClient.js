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
        'stop typing': noop,
        'disconnect': noop,
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
        for (let key in handlers) {
            this[`on ${key}`] = (handlerEvent) => {
                handlers[key] = handlerEvent
            }
        }
    }

    open() {
        this.user = Object.assign({}, currentUser.getCurrentUser())
        SOCKET.emit(`${SERVICE_NAME_PREFIX}add user`, this.user)
        return this
    }

    sendMessage(msg) {
        SOCKET.emit(`${SERVICE_NAME_PREFIX}new message`, { message: msg })
    }

    beginTyping() {
        SOCKET.emit(`${SERVICE_NAME_PREFIX}typing`)
    }

    stopTyping() {
        SOCKET.emit(`${SERVICE_NAME_PREFIX}stop typing`)
    }

    destroy() {
        // SOCKET.emit(`${SERVICE_NAME_PREFIX}disconnect`, this.user)
        this.user = null
        resetHandler()
    }
}

export function getClient() {
    if (null == client) {
        client = new ChatClient()
    }
    return client
}

export function shutDown() {
    if (client) {
        client.destroy()
        client = null
    }
}