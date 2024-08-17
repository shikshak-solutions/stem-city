import {api} from "../hooks/apiConfig";
import {
    ADD_TO_CART, CLEAR_CART, LOAD_CART,UPDATE_QUANTITY_OF_CART,
    PRODUCTS_DETAIL_DATA,
    PRODUCTS_LIST_DATA,
    REMOVE_FROM_CART,
    SEO_META_DATA,
    WEBSITE_CONTENT
} from "../constant";
import {parseJwt} from "../utility/jwtUtils";
export const actionToGetSEOMetaDataApiCall = (payload) => async (dispatch,getState) => {
    let company_id = getState().webSetting.company_id;
    const {data} = await api.post(`web-setting/get-seo-meta-data-website`,{source_id:company_id,pathname:payload?.pathname});
    dispatch({ type: SEO_META_DATA, payload: data });
    const response = await api.post(`web-setting/get-website-content`,{source_id:company_id,pathname:payload?.pathname});
    dispatch({ type: WEBSITE_CONTENT, payload: response.data });
    return data;
}

export const actionToLogin =  (email, password) => async () =>{
    return api.post("/auth/login", {
            email,
            password,
        })
        .then(async (response) => {
            console.log(response,'res')
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                // Parse the JWT token
                const parsedData = parseJwt(response.data.accessToken);
                return parsedData.user;
            }
            return response.data;
        });
}
export const actionToLogout = () => ()=>{
    return api.delete("/auth/logout")
        .then( () => {
            localStorage.removeItem("user");
            localStorage.removeItem("cartCount");
            window.location.href='/login';
            return true;
        });
}
export const actionToSignup = (param) => ()=> {
    return api
        .post("/auth/signup", param)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("cartCount", "0");
                // Parse the JWT token
                const parsedData = parseJwt(response.data.accessToken);
                return parsedData.user;
            }

            return response.data;
        });
};
export const actionToGetProductsApiCall = () => async (dispatch,getState) => {
    let company_id = getState().webSetting.company_id;
    const {data} = await api.post(`products/get-web-product-list`,{id:company_id});
    dispatch({ type: PRODUCTS_LIST_DATA, payload: data });
}
export const actionToGetProductsDetailsApiCall = (payload) => async (dispatch,getState) => {
    payload['source_id']=getState().webSetting.company_id;
    const {data} = await api.post(`products/get-web-product-detail-by-slug`,payload );
    dispatch({ type: PRODUCTS_DETAIL_DATA, payload: data });
}
export const actionToAddToCart = (item) =>(dispatch,getState)=>{
    const { cartItems } = getState().product;

    // Check if the item is already in the cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        // Update the quantity
        let existingItemQuantity = Number(existingItem.quantity) + Number(item.quantity);
        dispatch({
            type: UPDATE_QUANTITY_OF_CART,
            payload: { id:item.id, quantity:existingItemQuantity }
        });
    } else {
        // Add new item to the cart
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    }
}

export const actionToRemoveFromCart = (itemId) => (dispatch)=> {
    dispatch({type: REMOVE_FROM_CART, payload: itemId});
}

export const actionToLoadCart = (cart) =>(dispatch)=> {
    dispatch({type: LOAD_CART, payload: cart});
}
export const actionToClearCart = () =>(dispatch)=> {
    dispatch({type: CLEAR_CART});
}