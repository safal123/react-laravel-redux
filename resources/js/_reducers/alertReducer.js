import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR} from "../_actions/types";

export default function (state={}, action) {
    switch (action.type) {
        case ALERT_SUCCESS:
            return{
                type: 'alert-success',
                message: action.payload
            }
        case ALERT_ERROR:
            return{
                type: 'alert-error',
                message: action.payload.message
            }
        case ALERT_CLEAR:
            return{}
        default:
            return state;
    }
}
