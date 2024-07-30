import {
    PRODUCTS_LIST_DATA,
    PRODUCTS_DETAIL_DATA,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART,
    CLEAR_CART
} from "../constant";
const initialState = {
    ProductsData: [],
    ProductDetailData: [],
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
}
export  const productReducer = (state = initialState, action) => {
    switch (action.type) {
       case PRODUCTS_LIST_DATA:
            return { ...state, ProductsData: action.payload };
       case PRODUCTS_DETAIL_DATA:
            return { ...state, ProductDetailData: action.payload };
        case ADD_TO_CART:
            const updatedCart = [...state.cartItems, action.payload];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { ...state, cartItems: updatedCart };
        case REMOVE_FROM_CART:
            const filteredCart = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            return { ...state, cartItems: filteredCart };
        case LOAD_CART:
            return { ...state, cartItems: action.payload };
        case CLEAR_CART:
            localStorage.removeItem('cart');
            return { ...state, cartItems: [] };
        default:
            return state
    }
}
export default productReducer;
