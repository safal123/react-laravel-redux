import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './types'

export {
    success,
    error,
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

function clear() {
    return {
        type: ALERT_CLEAR,
    }
}
