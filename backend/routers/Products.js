import express from 'express';
const ENCRYPTION_KEY = "XkhZG4fW2t2W";
const productsRouter = express.Router();
import {
    actionToGetProductsApiCall,
    actionToGetCategoriesApiCall,
    actionToGetSubCategoriesApiCall,
    actionToGetSubChildCategoriesApiCall,
    actionToGetBrandsApiCall,
    actionToGetProductImagesApiCall,
    actionToGetCartDataByProductAndUserIdApiCall,
    actionToGetAllCartCountDataByUserId,
    actionToGetUserCartDataByUserId,
    actionDeleteProductFromCartByCartId,
    actionUpdateProductQuantityOnCartByCartId,
    actionToGetProductsDetailsApiCall,
    actionGenerateOrderInOrderTable,
    createAndSavePaymentGatewayTransaction,
    updateOrderIdInCartTable,
    actionToGetUserSavedAddressDataByUserId,
    actionToGetUserOrdersDataByUserId,
    actionToGetAllProductsDataByOrderId,
    actionToDbTest,
    actionGetOrderDetailsData,
    actionToGetCouponDetailsByCoupon,
    actionToGetAllOrdersData,
    actionToGetRangeTypeCategoriesApiCall,
    actionToGetClassTypeCategoriesApiCall,
    actionToUpdateDefaultDeliveryAddress,
    actionToResetDefaultAddress,
    updatePaymentStatusOnPaymentTable,
    updateOrderStatusOnOrderTable,
    actionToGetProductReviewProductAndUserIdApiCall,
    actionToGetFaqsApiCall,
    actionToGetProductsListForWebsiteApiCall,
    actionToGetProductsDetailBySlugForWebsiteApiCall
} from "../models/Products.js";
import expressAsyncHandler from "express-async-handler";
import CryptoJS from "crypto-js";
import {insertCommonApiCall, updateCommonApiCall} from "../models/commonModel.js";
import {generateUniqueIdForBlock} from "../helper/CommonHelper.js";
productsRouter.post(
    '/actionToGetProductsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductsApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetCategoriesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetCategoriesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetBrandsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetBrandsApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetRangeTypeCategoriesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetRangeTypeCategoriesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetSubCategoriesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubCategoriesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetSubChildCategoriesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubChildCategoriesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetProductImagesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductImagesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToCartDataByProductAndUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetCartDataByProductAndUserIdApiCall(payload).then((data) => {
            if (!data || data?.length === 0) {
                const aliasArray = ['?', '?', '?', '?'];
                const columnArray = ['productId', "qty", "custId", "createdAt"];
                const valuesArray = [payload?.productId, payload?.qty, payload?.userId, payload?.createdAt];
                const insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'carts'};
                console.log(insertData,"insertData");
                insertCommonApiCall(insertData).then((data) => {
                    res.status(200).send({
                        response: data,
                    });
                })
            } else {
                const setData = `qty = ?`;
                const whereCondition = `id = '${data[0]?.id}'`;
                const value = [data[0]?.qty + payload?.qty];
                const dataToSend = {column: setData, value, whereCondition, tableName: 'carts'};
                updateCommonApiCall(dataToSend).then((data) => {
                    res.status(200).send({
                        response: data,
                    });
                });
            }
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetAllCartCountDataByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetAllCartCountDataByUserId(payload).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionToGetUserCartDataByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetUserCartDataByUserId({userId:payload}).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionDeleteProductFromCartByCartId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionDeleteProductFromCartByCartId(payload).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);


productsRouter.post(
    '/actionUpdateProductQuantityOnCartByCartId',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data)
        actionUpdateProductQuantityOnCartByCartId(payload).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetProductsDetailsBySlugApiCall',
    expressAsyncHandler(async (req, res) => {
         actionToGetProductsDetailsApiCall(req?.body).then((response) => {
            res.status(200).send(response);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionProceedCartProductsPayment',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data)
        payload.uniqueOrderNumber = "SSORD-"+("" + Math.random()).substring(2, 8);
         actionGenerateOrderInOrderTable(payload).then((orderId) => {
             if(orderId){
                 if(payload?.addNewAddress) {
                     let shippingAddressId = generateUniqueIdForBlock() + '_shipping_' + generateUniqueIdForBlock();
                     const aliasArray = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?','?'];
                     const columnArray = ['id', 'fullname', "phone", "address", "createdAt", "type", "city", "states", "country", "pincode", "company_name", "gst_no", "company_address", "custId","gst_benefit"];
                     const valuesArray = [shippingAddressId, payload?.shippingFullName, payload?.shippingMobileNo, payload?.shippingAddress, payload?.dateTime, 'shipping', payload?.shippingCity, payload?.shippingState, payload?.shippingCountry, payload?.shippingPinCode, payload?.shippingCompanyName, payload?.shippingGstNo, payload?.shippingCompanyAddress, payload?.userId,payload?.gstBenefit];
                     const insertShippingAddressData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'addresses'};
                     console.log(insertShippingAddressData,"insertShippingAddressData")
                     insertCommonApiCall(insertShippingAddressData).then((shippingAddressInsert) => {
                         if (shippingAddressInsert && payload?.billToDifferentAddress) {
                             let billingAddressId = generateUniqueIdForBlock() + '_billing_' + generateUniqueIdForBlock();
                             const aliasArray = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
                             const columnArray = ['id', 'fullname', "phone", "address", "createdAt", "type", "city", "states", "country", "pincode", "company_name", "gst_no", "company_address", "custId","gst_benefit"];
                             const valuesArray = [billingAddressId, payload?.billingFullName, payload?.billingMobileNo, payload?.billingAddress, payload?.dateTime, 'billing', payload?.billingCity, payload?.billingState, payload?.billingCountry, payload?.billingPinCode, payload?.shippingCompanyName, payload?.shippingGstNo, payload?.shippingCompanyAddress, payload?.userId,payload?.gstBenefit];
                             const insertBillingAddressData = {
                                 alias: aliasArray,
                                 column: columnArray,
                                 values: valuesArray,
                                 tableName: 'addresses'
                             };
                             insertCommonApiCall(insertBillingAddressData).then((billingAddressInsert) => {
                                 if(billingAddressInsert) {
                                     const aliasArray = ['?', '?', '?'];
                                     const columnArray = ["order_id", "shipping_address_id", "billing_address_id"];
                                     const valuesArray = [orderId, shippingAddressId, billingAddressId];
                                     const insertOrderAddressRelationData = {
                                         alias: aliasArray,
                                         column: columnArray,
                                         values: valuesArray,
                                         tableName: 'order_address_relation'
                                     };
                                     insertCommonApiCall(insertOrderAddressRelationData).then(() => {
                                         res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify({id:orderId,orderNo:payload.uniqueOrderNumber}), ENCRYPTION_KEY).toString());
                                     })
                                 }
                             });
                         } else {
                             const aliasArray = ['?', '?', '?'];
                             const columnArray = ["order_id", "shipping_address_id", "billing_address_id"];
                             const valuesArray = [orderId, shippingAddressId, shippingAddressId];
                             const insertOARelationDataData = {
                                 alias: aliasArray,
                                 column: columnArray,
                                 values: valuesArray,
                                 tableName: 'order_address_relation'
                             };
                             insertCommonApiCall(insertOARelationDataData).then(() => {
                                 res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify({id:orderId}), ENCRYPTION_KEY).toString());
                             })
                         }

                     })
                 }else{
                     const aliasArray = ['?', '?', '?'];
                     const columnArray = ["order_id", "shipping_address_id", "billing_address_id"];
                     const valuesArray = [orderId, payload?.existingShippingAddressId, payload?.existingDeliveryAddressId];
                     const insertExistingAddressOrderData = {
                         alias: aliasArray,
                         column: columnArray,
                         values: valuesArray,
                         tableName: 'order_address_relation'
                     };
                     insertCommonApiCall(insertExistingAddressOrderData).then(() => {
                         res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify({id:orderId,orderNo:payload.uniqueOrderNumber}), ENCRYPTION_KEY).toString());
                     })
                 }
             }

        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/createAndSavePaymentGatewayTransaction',
    expressAsyncHandler(async (req, res) => {
        createAndSavePaymentGatewayTransaction(req?.body).then((data) => {
            if(data)
           res.status(200).send({id:data});
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/updateOrderIdInCart',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        updateOrderIdInCartTable(payload).then((data) => {
            if(data)
                res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify({id:data}), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetUserSavedAddressDataByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetUserSavedAddressDataByUserId(payload).then((data) => {
            if(data)
                res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetUserOrdersDataByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetUserOrdersDataByUserId(payload).then((data) => {
            if(data)
                res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToAllProductRelatedToOrderByOrderId',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllProductsDataByOrderId(req?.body).then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.get(
    '/dbtest',
    expressAsyncHandler(async (req, res) => {
        actionToDbTest(req?.body).then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionGetOrderDetailsData',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req.body?.orderId, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        actionGetOrderDetailsData({orderId:data}).then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionToCancelOrderAndRefund',
    expressAsyncHandler(async (req, res) => {
        actionGetOrderDetailsData(req?.body).then( async (data) => {
            if(data) {

                    await updatePaymentStatusOnPaymentTable({id:data[0]?.orderData?.id},'2').then(async (reponsePaymentUpdate)=> {
                        if(reponsePaymentUpdate?.affectedRows>0){
                            await updateOrderStatusOnOrderTable('cancel',data[0]?.orderData?.id).then(async (responseOrderStatusUpdate)=>{
                                if(responseOrderStatusUpdate?.affectedRows>0) {
                                    res.status(200).send({
                                        success: true,
                                        code: 11,
                                        message: 'Order cancel successfully.'
                                    });
                                }
                            });
                        }
                    });
                }

        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetCouponDetalsByCouponCode',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        actionToGetCouponDetailsByCoupon(payload).then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetAllOrdersApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllOrdersData().then((data) => {
            if(data)
                res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToGetClassTypeCategoriesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetClassTypeCategoriesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
productsRouter.post(
    '/actionToUpdateDefaultDeliveryAddress',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        actionToResetDefaultAddress(payload).then(() => {
            actionToUpdateDefaultDeliveryAddress(payload).then(() => {
                res.status(200).send({"message":"success"});
            }) .catch(error => {
                res.status(500).send(error);
            })
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);


productsRouter.post(
    '/actionAddUpdateProductReviewByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        console.log(payload);
        actionToGetProductReviewProductAndUserIdApiCall(payload).then((data) => {
            if (!data || data?.length === 0) {
                const aliasArray = ['?', '?', '?', '?', '?', '?','?'];
                const columnArray = ['product_id', "rating", "review_description", "review_title","review_photos", "review_by", "review_at"];
                const valuesArray = [payload?.productId, payload?.selectedRating, payload?.selectedRatingText,payload?.selectedTitleText, payload?.finalImagesJson, payload?.userId, payload?.createdAt];
                const insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'product_rating_and_reviews'};
                insertCommonApiCall(insertData).then((data) => {
                    res.status(200).send({
                        response: data,
                    });
                })
            } else {
                let setData = `rating = ?,review_description = ?,review_title=?,review_photos=?,review_at=?`;
                const whereCondition = `id = '${data[0]?.id}'`;
                let dataToSend = {column: setData, value: [payload?.selectedRating, payload?.selectedRatingText, payload?.selectedTitleText, payload?.finalImagesJson, payload?.createdAt], whereCondition: whereCondition, returnColumnName:'id',tableName: 'product_rating_and_reviews'};
                updateCommonApiCall(dataToSend).then((data) => {
                    res.status(200).send({
                        response: data,
                    });
                });
            }
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionGetProductReviewByUserId',
    expressAsyncHandler(async (req, res) => {
        let requestDataString = CryptoJS.AES.decrypt(req.body.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(requestDataString);
        actionToGetProductReviewProductAndUserIdApiCall(payload).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/actionToGetFaqsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetFaqsApiCall(req.body).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/get-web-product-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductsListForWebsiteApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

productsRouter.post(
    '/get-web-product-detail-by-slug',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductsDetailBySlugForWebsiteApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default productsRouter;
