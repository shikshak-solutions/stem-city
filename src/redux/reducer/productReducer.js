import {
    PRODUCTS_LIST_DATA,
    PRODUCTS_DETAIL_DATA,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART,
    CLEAR_CART, UPDATE_QUANTITY_OF_CART
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
            console.log(action.payload,'payload')
            const updatedCart = [...state.cartItems, action.payload];
            console.log(updatedCart,'updatedCart', JSON.stringify(updatedCart))
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { ...state, cartItems: updatedCart };
        case REMOVE_FROM_CART:
            const filteredCart = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            return { ...state, cartItems: filteredCart };
        case UPDATE_QUANTITY_OF_CART:
            console.log('here',action.payload)
            const updatedCountCart = state.cartItems.map(item => item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item);
            console.log(updatedCountCart,'updatedCountCart')
            localStorage.setItem('cart', JSON.stringify(updatedCountCart));
            return { ...state, cartItems: updatedCountCart };
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
