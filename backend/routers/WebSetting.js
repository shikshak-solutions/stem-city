import express from "express";
const ENCRYPTION_KEY = "XkhZG4fW2t2W";
const webSettingRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetSEOMetaDataApiCall,
    actionToGetSEOReferencesApiCall,
    actionToGetUrlSlugApiCall,
    actionToGetSEOReferencesHtmlDropdownApiCall, actionToGetURLSlugDataApiCall, actionToDeleteAllCacheDataApiCall
} from "../models/WebSetting.js";
import CryptoJS from "crypto-js";

webSettingRouter.post(
    '/actionToGetSEOReferencesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSEOReferencesApiCall(req.body).then((data) => {
            console.log(data,'data');
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
webSettingRouter.post(
    '/actionToGetUrlSlugApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUrlSlugApiCall(req.body).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
webSettingRouter.post(
    '/actionToGetSEOReferencesHtmlDropdownApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSEOReferencesHtmlDropdownApiCall(req.body).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
webSettingRouter.post(
    '/actionToGetSEOMetaDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSEOMetaDataApiCall(req.body).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
webSettingRouter.post(
    '/actionToGetURLSlugDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetURLSlugDataApiCall(req.body).then((data) => {
            res.status(200).send(CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString());
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.get(
    '/actionToDeleteCacheDataApiCall/:keyname',
    expressAsyncHandler(async (req, res) => {
        actionToDeleteAllCacheDataApiCall(req.params.keyname).then((data) => {
            console.log(req.params.keyname,'key',data);
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default webSettingRouter;