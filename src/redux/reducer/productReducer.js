import {PRODUCTS_LIST_DATA} from "../constant";
const initialState = {
    ProductsData: []
}
export  const productReducer = (state = initialState, action) => {
    switch (action.type) {
       case PRODUCTS_LIST_DATA:
            return { ...state, ProductsData: action.payload };
        default:
            return state
    }
}
export default productReducer;
