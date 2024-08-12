import {SEO_META_DATA, WEBSITE_CONTENT} from "../constant";
const initialState = {
    seoMetaData:{},
    websiteContentData:{},
    company_id:2
}
export  const webSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEO_META_DATA:
            return { ...state, seoMetaData: action.payload };
        case WEBSITE_CONTENT:
            return { ...state, websiteContentData: action.payload };
        default:
            return state
    }
}