import {SEO_META_DATA, URL_SLUG_DATA} from "../constant";
const initialState = {
    seoMetaData:{},
    urlSlug:{}
}
export  const webSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEO_META_DATA:
            return { ...state, seoMetaData: action.payload };
        case URL_SLUG_DATA:
            return { ...state, urlSlug: action.payload };
        default:
            return state
    }
}