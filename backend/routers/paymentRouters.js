import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';
import crypto from "crypto";
import {
    checkDuplicateTransactionNo,
    createAndSaveDirectPaymentTransaction,
    createAndSavePaymentGatewayTransaction,
    GetAllDiscountCoupons,
    updateDirectPaymentTransaction,
    updateInitialOrderEmailStatusOnOrderTable,
    updatePaymentGatewayTransactionAfterPayment,
} from "../models/Products.js";
import CryptoJS from "crypto-js";
import {insertCommonApiCall} from "../models/commonModel.js";
import {actionToSendCustomEmail} from "../helper/emailNodeMailerHelper.js";
import {checkStatus, newPayment} from "../helper/PaymentHelper.js";
const ENCRYPTION_KEY = "XkhZG4fW2t2W";
const PaymentRouters = express.Router();
PaymentRouters.post(
    '/createOrder',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        let options = {
            amount: Number(payload?.totalAmount * 100),  // amount in the smallest currency unit
            currency: "INR"
        };
    })
);
PaymentRouters.post(
    '/payment',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        console.log(payload,'payload')
        await newPayment(payload,res).then((data) => {
            console.log(data,"data")
            res.status(200).json(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
PaymentRouters.post(
    '/status/:txnId',
    expressAsyncHandler(async (req, res) => {
        await checkStatus(req,res).then((data) => {
             console.log(data,"status Data");
            res.status(200).json(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
PaymentRouters.post(
    '/paymentVerification',
    expressAsyncHandler(async (req, res) => {
            console.log(req,"req")
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req?.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        // console.log(process.env.RAZORPAY_APT_SECRET,"process.env.RAZORPAY_APT_SECRET")
        const expectedSignature = crypto
            .createHmac("sha256", "FFjrQuJgBX4uNcFAnBk5iITl")
            .update(body.toString())
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Database comes here



        } else {
            res.status(400).json({
                success: false,
            });
        }
    })
);
PaymentRouters.post(
    '/createAndSavePaymentGatewayTransaction',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data)
        if(payload?.paymentMethod ==='offline'){
            createAndSaveDirectPaymentTransaction(payload).then((data) => {
                if (data)
                    res.status(200).json(CryptoJS.AES.encrypt(JSON.stringify({id: data}), ENCRYPTION_KEY).toString());
            })
                .catch(error => {
                    res.status(500).send(error);
                })
        }else {
            createAndSavePaymentGatewayTransaction(payload).then((data) => {
                if (data)
                    res.status(200).json(CryptoJS.AES.encrypt(JSON.stringify({id: data}), ENCRYPTION_KEY).toString());
            })
                .catch(error => {
                    res.status(500).send(error);
                })
        }
    })
);
PaymentRouters.post(
    '/updatePaymentGatewayTransactionAfterPayment',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data)
        updatePaymentGatewayTransactionAfterPayment(payload).then((data) => {
            if(data)
                res.status(200).send({id:data});
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
PaymentRouters.post(
    '/actionToCancelOrderAndRefund',
    expressAsyncHandler(async (req, res) => {

    })
);
PaymentRouters.post(
    '/savePaymentAPICall',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        insertCommonApiCall(payload).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
    })
);
const emailUpload = multer({
    storage: multer.memoryStorage()
});
PaymentRouters.post(
    '/sendOrderPlacedEmailWithInvoiceAPICall', emailUpload.single('file'), (req, res) => {
        console.log(req,"request")
            actionToSendCustomEmail({
                'to':req.body.email_address,
                'subject':'New Order Placed On Shikshak Solutions',
                'cc':'',
                'bcc':'',
                'html':req.body.html,
                'text':(req.body.text) ? req.body.text : req.body.html,
                'snippet':'',
                'account_type':'gmail',
                'attachments':[{
                    filename: req.file.originalname,
                    content: req.file.buffer
                }]
            });
        updateInitialOrderEmailStatusOnOrderTable('1',req.body.order_id);

        res.status(200).send({
            response: {success:1},
        });
    }
);
PaymentRouters.post(
    '/updateTransactionAttachment',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        console.log(payload,"payload")
        updateDirectPaymentTransaction(payload).then((data) => {
            if(data)
                res.status(200).send({id:data});
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
PaymentRouters.post(
    '/actionToCheckDuplicateTransactionNoApiCall',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        console.log(payload,"payload")
        checkDuplicateTransactionNo(payload).then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
PaymentRouters.post(
    '/actionToGetAllDiscountCouponsApiCall',
    expressAsyncHandler(async (req, res) => {
        GetAllDiscountCoupons().then((data) => {
            if(data)
                res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default PaymentRouters;