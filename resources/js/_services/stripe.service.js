import api from "../_helpers/api";
import {history} from "../_helpers";

export const stripeService = {
    checkout,
};

async function checkout(token) {
    return await api().post('/checkout', token).then(history.push('/account'));
}
