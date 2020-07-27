import api from "../_helpers/api";

export const productService = {
    all
};

async function all() {
    return await api().get('/products');
}
