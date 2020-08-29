import {ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR, ALERT_INFO} from "../_actions/types";

export default function (state={}, action) {
    switch (action.type) {
        case ALERT_SUCCESS:
            return{
                type: 'success',
                message: action.payload
            }
        case ALERT_ERROR:
            return{
                type: 'danger',
                message: action.payload
            }
        case ALERT_INFO:
            return{
                type: 'info',
                message: action.payload
            }
        case ALERT_CLEAR:
            return{}
        default:
            return state;
    }
}
