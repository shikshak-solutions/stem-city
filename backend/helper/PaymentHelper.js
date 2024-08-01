import crypto from "crypto";
import dotenv from "dotenv";
import axios from "axios";
import {
    getPaymentAndCartIdsByPaymentGateWayTransactionLog, updateOrderIdOnCartTable,
    updatePaymentGatewayTransactionByTransactionIdAfterPayment, updatePaymentStatusOnPaymentTable
} from "../models/Products.js";
import CryptoJS from "crypto-js";
dotenv.config();
const phonePayUrl =  process.env.PHONEPAY_PROD_URL;
const phonePaySaltKey =  process.env.PHONEPAY_API_SALT_KEY;
const encryptKey =  process.env.APP_ENCRYPT_DECRYPT_KEY;
const merchantId =  'M1K1DV72DJHO';
const ENCRYPTION_KEY = "XkhZG4fW2t2W";

export const newPayment = async (req, res) => {
    try {
        return new Promise(function(resolve) {

            const merchantTransactionId = req?.transactionId;
            const data = {
                merchantId: merchantId,
                merchantTransactionId: merchantTransactionId,
                merchantUserId: req.userId,
                name: req?.shippingFullName,
                amount: req.totalAmount * 100,
                redirectUrl: `https://shikshaksolutions.com/api-call/payment/status/${merchantTransactionId}`,
                callbackUrl: `https://shikshaksolutions.com/api-call/payment/status/${merchantTransactionId}`,
                redirectMode: 'POST',
                mobileNumber: req?.shippingMobileNo,
                paymentInstrument: {
                    type: 'PAY_PAGE'
                }
            };

            const payload = JSON.stringify(data);
            const payloadMain = Buffer.from(payload).toString('base64');
            const keyIndex = 1;
            const string = payloadMain + '/pg/v1/pay' + phonePaySaltKey;
            const sha256 = crypto.createHash('sha256').update(string).digest('hex');
            const checksum = sha256 + '###' + keyIndex;

            const prod_URL = phonePayUrl + process.env.PHONEPAY_API_END_POINT;
            // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
            const options = {
                method: 'POST',
                url: prod_URL,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum
                },
                data: {
                    request: payloadMain
                }
            };
             axios.request(options).then(function (response) {
                 resolve( {
                    url: response.data.data.instrumentResponse.redirectInfo.url,
                    data: response.data,
                    success: true
                })
            })
                .catch(function (error) {
                    resolve({
                        message: error.message,
                        success: false
                    })
                });
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

export const checkStatus = async(req, res) => {
    if(req?.body?.code=='PAYMENT_SUCCESS' && req?.body?.transactionId){
    try {
        return new Promise(function(resolve) {
            const merchantTransactionId = req?.body?.transactionId;
            // const merchantId = res.req.body.merchantId

            const keyIndex = 1;
            const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + phonePaySaltKey;
            const sha256 = crypto.createHash('sha256').update(string).digest('hex');
            const checksum = sha256 + "###" + keyIndex;
            const options = {
                method: 'GET',
                url: `${phonePayUrl}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'X-MERCHANT-ID': `${merchantId}`
                }
            };
             updatePaymentGatewayTransactionByTransactionIdAfterPayment(req?.body).then( async ()=>{
                await getPaymentAndCartIdsByPaymentGateWayTransactionLog(req?.body).then( async (cartOrderDetails)=>{
                    await updatePaymentStatusOnPaymentTable(cartOrderDetails[0],1).then(async ()=> {
                        await updateOrderIdOnCartTable(cartOrderDetails[0]).then(async () => {
                            console.log(cartOrderDetails[0]?.id,cartOrderDetails,'10555555555555')
                            const url = `https://shikshaksolutions.com/order/success/` + CryptoJS.AES.encrypt(
                                JSON.stringify(cartOrderDetails[0]?.id),
                                encryptKey
                            ).toString();
                            return res.redirect(url)

                        });
                    });
                })
            });
            // CHECK PAYMENT STATUS
            axios.request(options).then(async (response) => {
                console.log(response, "response Status")
                if (response.data.success === true) {
                    resolve({success:true,response:response});
                    await updatePaymentGatewayTransactionByTransactionIdAfterPayment(req?.body).then( async ()=>{
                       await getPaymentAndCartIdsByPaymentGateWayTransactionLog(req?.body).then( async (cartOrderDetails)=>{
                          await updatePaymentStatusOnPaymentTable(cartOrderDetails[0],1).then(async ()=> {
                              await updateOrderIdOnCartTable(cartOrderDetails[0]).then(async () => {
                                  console.log(cartOrderDetails[0]?.id,cartOrderDetails,'1255555555555555555')
                                  const url = `https://shikshaksolutions.com/order/success/` + CryptoJS.AES.encrypt(
                                      JSON.stringify(cartOrderDetails[0]?.id),
                                      ENCRYPTION_KEY
                                  ).toString();
                                  return res.redirect(url)

                              });
                          });
                        })
                    });
                    // const url = `https://shikshaksolutions.com/order/success/${merchantTransactionId}`
                    // return res.redirect(url)
                } else {
                    // resolve({success:false,response:response});
                    const url = `https://shikshaksolutions.com/order/failure/${merchantTransactionId}`
                    return res.redirect(url)
                }
            })
                .catch((error) => {
                    console.error(error);
                });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
    }else{
        const url = `https://stemcity.in/order/failure/${merchantTransactionId}`
        return res.redirect(url);
    }

};