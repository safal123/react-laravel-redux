import api from "../_helpers/api";

export const productService = {
    all,
    findById,
};

async function all() {
    return await api().get('/products');
}

async  function findById(id) {
    return await api().get(`/products/${id}`);
}
