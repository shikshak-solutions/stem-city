import express from "express";
const commonLogRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetCompanyListApiCall,
    deleteWithLogCommonApiCall,
    insertCommonWithLogCommonApiCall,
    softDeleteWithLogCommonApiCall, updateWithLogCommonApiCall
} from "../models/commonLogModel.js";


commonLogRouter.post(
    '/insert-common-with-log-api-call',
    expressAsyncHandler(async (req, res) => {
        insertCommonWithLogCommonApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonLogRouter.post(
    '/soft-delete-common-with-log-api-call',
    expressAsyncHandler(async (req, res) => {
        softDeleteWithLogCommonApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonLogRouter.post(
    '/delete-common-with-log-api-call',
    expressAsyncHandler(async (req, res) => {
        deleteWithLogCommonApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonLogRouter.post(
    '/update-common-with-log-api-call',
    expressAsyncHandler(async (req, res) => {
        updateWithLogCommonApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonLogRouter.post(
    '/get-company-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetCompanyListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default commonLogRouter;