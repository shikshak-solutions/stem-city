import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
    actionToGetALLStateListApiCall,
    actionToGetCityListApiCall, actionToGetPinCodeApiCall,

    deleteCommonApiCall,
    insertCommonApiCall,
    updateCommonApiCall
} from "../models/commonModel.js";
import {actionToSendCustomEmail, sendTestEmail} from "../helper/emailNodeMailerHelper.js";
import {actionToGetAllCustomersData} from "../models/Users.js";
import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = "XkhZG4fW2t2W";
const commonRouter = express.Router();

commonRouter.post(
    '/insertCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        insertCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/updateCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        updateCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/deleteCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        deleteCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToSendCustomEmail',
    expressAsyncHandler(async (req, res) => {
        actionToSendCustomEmail(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllCustomersApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllCustomersData().then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllPincodeDetails',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllPincodeDetailsDataApiCall().then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

commonRouter.post(
    '/actionToCheckDeliveryAvailabilityOnPincode',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        console.log(payload,"payload")
        actionToGetPinCodeDetailsDataApiCall(payload).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllStateList',
    expressAsyncHandler(async (req, res) => {
        actionToGetALLStateListApiCall(req.body).then((data) => {
            res.status(200).send({
                data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/get-state-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetALLStateListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/get-city-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetCityListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/get-pin-code-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetPinCodeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.get(
    '/test-email',
    expressAsyncHandler(async (req, res) => {
        sendTestEmail(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default commonRouter;
