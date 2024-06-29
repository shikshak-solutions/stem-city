import {
    CATEGORY_DATA,
    SUB_CATEGORY_LIST,
    VENDOR_LIST,
    CUSTOMER_LIST,
    PRODUCTS_DATA,
    PRODUCT_DATA,
    UPDATE_VENDOR_FORM_DATA,
    UPDATE_CUSTOMER_FORM_DATA,
    UPDATE_PRODUCT_FORM_DATA,
    UPDATE_CATEGORY_FORM_DATA,
    UPDATE_SUB_CATEGORY_FORM_DATA, BRAND_DATA,
    UPDATE_BRAND_FORM_DATA, URL_SLUG_DATA, UPDATE_URL_SLUG_FORM_DATA,
    PRODUCT_DETAILS_DATA_CP, IMPORT_REQUEST, IMPORT_SUCCESS, IMPORT_FAILURE
} from "../constant/index.js";

const initialState = {
    categoryData:[],
    subCategoryData:[],
    vendorList:[],
    customerList:[],
    productsData:[],
    productData:[],
    brandData:[],
    productDetailsData:{data:[],loading: true},
    urlSlugData:[],
    updateVendorFormData:[],
    updateCustomerFormData:[],
    updateProductFormData:[],
    updateCategoryFormData:[],
    updateSubCategoryFormData:[],
    updateBrandFormData:[],
    updateUrlSlugFormData:[],
}
export  const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_DATA:
            return { ...state, categoryData: action.payload };
        case SUB_CATEGORY_LIST:
            return { ...state, subCategoryData: action.payload };
        case VENDOR_LIST:
            return { ...state, vendorList: action.payload };
        case CUSTOMER_LIST:
            return { ...state, customerList: action.payload };
        case PRODUCTS_DATA:
            return { ...state, productsData: action.payload };
        case PRODUCT_DATA:
            return { ...state, productData: action.payload };
        case PRODUCT_DETAILS_DATA_CP:
            return { ...state, productDetailsData: action.payload };
        case BRAND_DATA:
            return { ...state, brandData: action.payload };
        case URL_SLUG_DATA:
            return { ...state, urlslugData: action.payload };
        case UPDATE_VENDOR_FORM_DATA:
            return { ...state, updateVendorFormData: action.payload };
        case UPDATE_CUSTOMER_FORM_DATA:
            return { ...state, updateCustomerFormData: action.payload };
        case UPDATE_PRODUCT_FORM_DATA:
            return { ...state, updateProductFormData: action.payload };
        case UPDATE_CATEGORY_FORM_DATA:
            return { ...state, updateCategoryFormData: action.payload };
        case UPDATE_SUB_CATEGORY_FORM_DATA:
            return { ...state, updateSubCategoryFormData: action.payload };
        case UPDATE_BRAND_FORM_DATA:
            return { ...state, updateBrandFormData: action.payload };
        case UPDATE_URL_SLUG_FORM_DATA:
            return { ...state, updateUrlSlugFormData: action.payload };
        case IMPORT_REQUEST:
            return { ...state, loading: true };
        case IMPORT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case IMPORT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}