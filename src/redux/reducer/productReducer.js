import {PRODUCTS_LIST_DATA,PRODUCTS_DETAIL_DATA} from "../constant";
const initialState = {
    ProductsData: [],
    ProductDetailData: []
}
export  const productReducer = (state = initialState, action) => {
    switch (action.type) {
       case PRODUCTS_LIST_DATA:
            return { ...state, ProductsData: action.payload };
       case PRODUCTS_DETAIL_DATA:
            return { ...state, ProductDetailData: action.payload };
        default:
            return state
    }
}
export default productReducer;
