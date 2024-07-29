import {api} from "../hooks/apiConfig";
import {SEO_META_DATA, URL_SLUG_DATA} from "../constant";
import {parseJwt} from "../utility/jwtUtils";
export const actionToGetSEOMetaDataApiCall = () => async (dispatch) => {
    const {data} = await api.post(`web-setting/actionToGetSEOMetaDataApiCall`);
    dispatch({ type: SEO_META_DATA, payload: data });
    const response = await api.post(`web-setting/actionToGetURLSlugDataApiCall`);
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