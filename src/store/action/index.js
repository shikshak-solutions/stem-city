import {api} from '../../hooks/api/ApiConfig.js';
import CryptoJS from "crypto-js";
import {
    CATEGORY_DATA, CUSTOMER_LIST, PRODUCTS_DATA, SUB_CATEGORY_LIST,
    UPDATE_VENDOR_FORM_DATA, UPDATE_CUSTOMER_FORM_DATA, VENDOR_LIST,
    UPDATE_PRODUCT_FORM_DATA, UPDATE_CATEGORY_FORM_DATA, UPDATE_SUB_CATEGORY_FORM_DATA,
    BRAND_DATA, UPDATE_BRAND_FORM_DATA, URL_SLUG_DATA, UPDATE_URL_SLUG_FORM_DATA, PRODUCT_DATA_CP,
    PRODUCT_DETAILS_DATA_CP
} from "../constant";

const ENCRYPTION_KEY = "XkhZG4fW2t2W";

//import AWS from 'aws-sdk';

/*const AWS_ACCESS_KEY_ID='AKIA5BAMSD7MAS6P43HN';
const AWS_SECRET_ACCESS_KEY='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';
const AWS_DEFAULT_REGION='eu-north-1';
const AWS_BUCKET = 'shikshak-solutions';
*/
/*const S3Bucket = new AWS.S3({
    params: {Bucket: AWS_BUCKET},
    region: AWS_DEFAULT_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    encryptionKey : ENCRYPTION_KEY,
})*/

/*
export const actionToUploadDataToS3BucketStore = (payload) => async () => {
    const params = {
        ACL: 'public-read',
        Body: payload.blobData,
        Bucket: AWS_BUCKET,
        Key: payload.key,
        ContentType:payload.type
    };
    S3Bucket.putObject(params)
        .send((err) => {
            console.log(err,'error');
        })
    return `https://shikshak-solutions.s3.eu-north-1.amazonaws.com/${payload.key}`;
}

export const actionToDeleteAwsObject = (payload)=> async()=>{
    const params = { Bucket: AWS_BUCKET,  Key:payload.key};
    return S3Bucket.deleteObject(params);
}*/
export const callInsertDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/insertCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}
export const callDeleteDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/deleteCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}
export const commonUpdateFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/updateCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}
export const actionToCreateVendor = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?','?','?','?', '?', '?', '?', '?', '?', '?','?', '?'];
    const columnArray = ['name','email','mobile','created_by', 'address', 'company_name', 'bank_name', 'account_holder_name', 'account_number', 'ifsc_code', 'upi_id', 'photo'];
    const valuesArray = [payload?.vendorName,payload?.email,payload?.mobileNumber,'41241Z41G_user_41G41n41M', payload?.address, payload?.companyName, payload?.bankName, payload?.accountName, payload?.accountNumber, payload?.ifscCode, payload?.upiId, '1'];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'vendor'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateCustomer = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?','?','?','?', '?', '?', '?', '?', '?', '?','?', '?'];
    const columnArray = ['name','email','mobile','created_by', 'address', 'school_name', 'bank_name', 'account_holder_name', 'account_number', 'ifsc_code', 'upi_id', 'photo'];
    const valuesArray = [payload?.customerName,payload?.email,payload?.mobileNumber,'41241Z41G_user_41G41n41M', payload?.address, payload?.schoolName, payload?.bankName, payload?.accountName, payload?.accountNumber, payload?.ifscCode, payload?.upiId, '1'];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'customer'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateProduct = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?','?','?','?', '?', '?', '?', '?', '?', '?','?', '?'];
    const columnArray = ['name','categoryId','subCategoryId', 'type', 'slug', 'sortDesc', 'description', 'unitSize', 'qty', 'buyerPrice', 'netPrice', 'location'];
    const valuesArray = [payload?.productName,payload?.productCategory,'1',payload?.productType, payload?.productSlug, payload?.shortDescription, payload?.briefDescription, payload?.unitSize, payload?.quantity, payload?.buyerPrice, payload?.netPrice, payload?.location];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'products'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateCategory = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?','?'];
    const columnArray = ['name','slug'];
    const valuesArray = [payload?.categoryName,payload?.slugName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'categories'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateSubCategory = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?', '?'];
    const columnArray = ['sub_name', 'categoryId'];
    const valuesArray = [payload?.subCategoryName,payload?.mainCategoryName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'subcategories'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateBrand = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?', '?'];
    const columnArray = ['name', 'slug'];
    const valuesArray = [payload?.brandName,payload?.slugName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'brand'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}

export const actionToCreateUrlSlug = (payload) => async (dispatch) =>{
    console.log(payload,'payload')
    const aliasArray = ['?', '?'];
    const columnArray = ['url_path', 'slug'];
    const valuesArray = [payload?.urlSlugPath,payload?.slugName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'url_slug_map'};
    let response = await dispatch(callInsertDataFunction(insertData));
    console.log(response,'res')
    return response;
}
export const actionToSetUpdateFromData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_VENDOR_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromCustomerData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_CUSTOMER_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromProductData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_PRODUCT_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromCategoriesData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_CATEGORY_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromSubCategoriesData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_SUB_CATEGORY_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromBrandsData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_BRAND_FORM_DATA, payload: data});
}
export const actionToSetUpdateFromUrlSlugData = (data) => async (dispatch) => {
    dispatch({type: UPDATE_URL_SLUG_FORM_DATA, payload: data});
}

export const actionToGetCategoriesApiCall = () => async (dispatch) => {
    dispatch({ type: CATEGORY_DATA, payload: 'loading'});
    const {data} = await api.post(`products/actionToGetCategoriesApiCall`);
    let responseDataString = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    let categoriesData = JSON.parse(responseDataString);
    console.log(categoriesData,'categoriesData')
    dispatch({ type: CATEGORY_DATA, payload: categoriesData });
    return data;
}

export const actionToGetSubCategoriesApiCall = () => async (dispatch) => {
    dispatch({ type: SUB_CATEGORY_LIST, payload: 'loading'});
    const {data} = await api.post(`products/actionToGetSubCategoriesApiCall`);
    dispatch({ type: SUB_CATEGORY_LIST, payload: data});
    return data;
}

export const actionToGetUrlSlugApiCall = () => async (dispatch) => {
    dispatch({ type: URL_SLUG_DATA, payload: 'loading'});
    const {data} = await api.post(`web-setting/actionToGetUrlSlugApiCall`);
    dispatch({ type: URL_SLUG_DATA, payload: data});
    return data;
}
export const actionToGetBrandsApiCall = () => async (dispatch) => {
    dispatch({ type: BRAND_DATA, payload: 'loading'});
    const {data} = await api.post(`products/actionToGetBrandsApiCall`);
    dispatch({ type: BRAND_DATA, payload: data});
    return data;
}
export const actionToGetVendorApiCall = () => async (dispatch) => {
    dispatch({ type: VENDOR_LIST, payload: 'loading'});
    const {data} = await api.post(`inventory/actionToGetVendorApiCall`);
    dispatch({ type: VENDOR_LIST, payload: data});
    return data;
}

export const actionToGetCustomerApiCall = () => async (dispatch) => {
    dispatch({ type: CUSTOMER_LIST, payload: 'loading'});
    const {data} = await api.post(`inventory/actionToGetCustomerApiCall`);
    dispatch({ type: CUSTOMER_LIST, payload: data});
    return data;
}

export const actionToGetProductsApiCall = () => async (dispatch) => {
    let payload = {show_on_website:'stem_city'};
    const {data} = await api.post(`products/actionToGetProductsApiCall`,{payload:CryptoJS.AES.encrypt(JSON.stringify(payload), ENCRYPTION_KEY).toString()});
    let requestDataString = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    let productsData = JSON.parse(requestDataString);
    dispatch({ type: PRODUCT_DATA_CP, payload: {data:productsData,loading:false}});
    return data;
}

export const actionToUpdateVendor = (payload) => async (dispatch) =>{
    let { name, email, mobile, address, company_name, bank_name, account_holder_name, account_number, ifsc_code, upi_id, photo, vendorId} = payload;
    let setData = `name = ?,email = ?,mobile = ?,address = ?, company_name = ?, bank_name = ?, account_holder_name = ?, account_number = ?, ifsc_code = ?, upi_id = ?, photo = ?`;
    const value = [name, email, mobile, address, company_name, bank_name, account_holder_name, account_number, ifsc_code, upi_id, photo];

    const whereCondition = `id = '${vendorId}'`;
    const dataToSend = {column: setData, value, whereCondition, tableName: 'vendor'};
    return await dispatch(commonUpdateFunction(dataToSend));
}

export const actionToUpdateCustomer = (payload) => async (dispatch) =>{
    let { name, email, mobile, address, school_name, bank_name, account_holder_name, account_number, ifsc_code, upi_id, photo, customerId} = payload;
    let setData = `name = ?,email = ?,mobile = ?,address = ?, school_name = ?, bank_name = ?, account_holder_name = ?, account_number = ?, ifsc_code = ?, upi_id = ?, photo = ?`;
    const value = [name, email, mobile, address, school_name, bank_name, account_holder_name, account_number, ifsc_code, upi_id, photo];

    const whereCondition = `id = '${customerId}'`;
    const dataToSend = {column: setData, value, whereCondition, tableName: 'customer'};
    return await dispatch(commonUpdateFunction(dataToSend));
}

export const actionToGetVendorOfIdApiCall = (payload) => async () => {
    let condition = ` where vendor.id = ${payload.id} `
    const {data} = await api.post(`inventory/actionToGetVendorApiCall`,{condition:condition});
    let requestDataString = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    let vendorData = JSON.parse(requestDataString);
    return vendorData;
}

export const actionToGetCustomerOfIdApiCall = (payload) => async () => {
    let condition = ` where customer.id = ${payload.id} `
    const {data} = await api.post(`inventory/actionToGetCustomerApiCall`,{condition:condition});
    let requestDataString = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    let customerData = JSON.parse(requestDataString);
    return customerData;
}

export const actionToUpdateProduct = (payload) => async (dispatch) =>{
    let { name, categoryId, subCategoryId, type, slug, sortDesc, description, unitSize, qty, buyerPrice, netPrice, photo, productId} = payload;
    let setData = `name = ?,categoryId = ?, subCategoryId= ?, type = ?, slug = ?, sortDesc = ?, description = ?, unitSize = ?, qty = ?, buyerPrice = ?,netPrice = ?, photo = ?`;
    const value = [name, categoryId, subCategoryId, type, slug, sortDesc, description, unitSize, qty, buyerPrice, netPrice, photo];

    const whereCondition = `id = '${productId}'`;
    const dataToSend = {column: setData, value, whereCondition, tableName: 'products'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToUpdateCategory = (payload) => async (dispatch) =>{
    let { name, slug, categoryId} = payload;
    let setData = `name = ?, slug = ?`;
    const value = [name, slug];

    const whereCondition = `id = '${categoryId}'`;
    const dataToSend = {column: setData, value, whereCondition, tableName: 'categories'};
    return await dispatch(commonUpdateFunction(dataToSend));
}

export const actionToGetProductDetailsDataApiCall = (payload) => async (dispatch) => {
    console.log(payload,'payload')
    const {data} = await api.post(`products/actionToGetProductsDetailsByIdApiCall`,{payload:CryptoJS.AES.encrypt(JSON.stringify(payload), ENCRYPTION_KEY).toString()});
    let responseDataString = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    let productData = JSON.parse(responseDataString);
    dispatch({ type: PRODUCT_DETAILS_DATA_CP, payload:{data: productData,loading:false}});
    return data;
}

export const actionToImportExcelOfProductsApiCall = (payload) => async (dispatch) => {
    console.log(payload, 'payload')
}

