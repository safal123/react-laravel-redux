import {
    ADD_TO_CART,
    INCREASE_CART_ITEM,
    DECREASE_CART_ITEM,
    CLEAR_CART,
    REMOVE_CART_ITEM
} from "../_actions/types";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        //add item to cart
        case ADD_TO_CART:
            let addedItem = state.items.find(item => item.id === action.payload.id);
            if (addedItem) {
                addedItem.quantity += 1;
                return {
                    ...state,
                    items: state.items,
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price,
                }
            } else {
                action.payload.quantity = 1;
                action.payload.inCart = true;
                const items = [...state.items, action.payload];
                return {
                    ...state,
                    items: [...new Set(items)],
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price,
                }
            }

        // remove an item from cart
        case REMOVE_CART_ITEM:
            let itemToRemove = state.items.find(item => item.id === action.payload.id);
            return {
                ...state,
                items: state.items.filter(item => action.payload.id !== item.id),
                totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
                totalItems: state.totalItems - itemToRemove.quantity
            }

        // clear item from cart
        case CLEAR_CART:
            return {
                ...initialState
            }

        case INCREASE_CART_ITEM:
            action.payload.quantity += 1;
            return {
                ...state,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + action.payload.price,
            }

        case DECREASE_CART_ITEM:
            action.payload.quantity -= 1;
            if (action.payload.quantity === 0) {
                return {
                    ...state,
                    items: state.items.filter(item => action.payload.id !== item.id),
                    totalItems: state.totalItems - 1,
                    totalPrice: state.totalPrice - action.payload.price,
                }
            }
            return {
                ...state,
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - action.payload.price,
            }

        default:
            return state;
    }
}

export default cartReducer;
