import {api} from "../hooks/apiConfig";
import {PRODUCTS_LIST_DATA, SEO_META_DATA, URL_SLUG_DATA} from "../constant";
import {parseJwt} from "../utility/jwtUtils";
export const actionToGetSEOMetaDataApiCall = () => async (dispatch) => {
    const {data} = await api.post(`web-setting/actionToGetSEOMetaDataApiCall`);
    dispatch({ type: SEO_META_DATA, payload: data });
    const response = await api.post(`web-setting/actionToGetURLSlugDataApiCall`);
    dispatch({ type: URL_SLUG_DATA, payload: response.data });
    return data;
}

export const actionToLogin =  (email, password) => async (dispatch) =>{
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
        .then( (response) => {
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
export const actionToGetProductsApiCall = () => async (dispatch) => {
    const {data} = await api.post(`products/actionToGetProductsApiCall`);
    dispatch({ type: PRODUCTS_LIST_DATA, payload: data });
}