import {ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR, ALERT_INFO} from './types'

export {
    success,
    error,
    info,
    clear
}

function success(message) {
    return {
        type: ALERT_SUCCESS,
        payload: message
    }
}

function error(message) {
    return {
        type: ALERT_ERROR,
        payload: message
    }
}

function info(message) {
    return {
        type: ALERT_INFO,
        payload: message
    }
}

function clear() {
    return {
        type: ALERT_CLEAR,
    }
}
