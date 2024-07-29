import {api} from "../hooks/apiConfig";
import {SEO_META_DATA, URL_SLUG_DATA} from "../constant";
export const actionToGetSEOMetaDataApiCall = () => async (dispatch) => {
    const {data} = await api.post(`web-setting/actionToGetSEOMetaDataApiCall`);
    dispatch({ type: SEO_META_DATA, payload: data });
    const response = await api.post(`web-setting/actionToGetURLSlugDataApiCall`);
    return data;
}