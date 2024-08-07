import express from "express";
const webSettingRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetWebsiteContentApiCall,
    actionToGetSEOMetaDataWebsiteApiCall,
    actionToGetWebSettingsContentApiCall,
    actionToGetWebSettingSeoMetaApiCall,
    actionToGetWebSettingSeoReferenceHtmlApiCall
} from "../models/WebSetting.js";
import CryptoJS from "crypto-js";


webSettingRouter.post(
    '/get-web-setting-content',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebSettingsContentApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.post(
    '/get-web-setting-seo-meta-data',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebSettingSeoMetaApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.post(
    '/get-web-setting-seo-reference-html',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebSettingSeoReferenceHtmlApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.post(
    '/get-website-content',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteContentApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.post(
    '/get-seo-meta-data-website',
    expressAsyncHandler(async (req, res) => {
        actionToGetSEOMetaDataWebsiteApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default webSettingRouter;