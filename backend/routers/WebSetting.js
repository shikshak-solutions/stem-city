import express from "express";
const webSettingRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetWebsiteContentApiCall,
    actionToGetSEOMetaDataWebsiteApiCall,
    actionToGetWebSettingsContentApiCall,
    actionToGetWebSettingSeoMetaApiCall,
    actionToGetWebSettingSeoReferenceHtmlApiCall,
    actionToGetWebSettingMenuListApiCall,
    actionToGetWebsiteMenuListApiCall,
    actionToGetWebsiteCategoriesListApiCall,
    actionToGetWebSettingsSectionContentApiCall, actionToGetWebsiteSectionContentApiCall
} from "../models/WebSetting.js";


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
    '/get-web-setting-section-content',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebSettingsSectionContentApiCall(req.body).then((data) => {
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
    '/get-menu-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebSettingMenuListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

webSettingRouter.post(
    '/get-website-menu-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteMenuListApiCall(req.body).then((data) => {
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
    '/get-website-section-content',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteSectionContentApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
webSettingRouter.post(
    '/get-website-categories',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteCategoriesListApiCall(req.body).then((data) => {
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