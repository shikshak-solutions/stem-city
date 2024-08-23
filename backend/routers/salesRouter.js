import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetFollowUpTypeApiCall, actionToGetRegionApiCall,
    actionToGetSchoolApiCall,
    actionToGetSchoolTypeApiCall
} from "../models/Sales.js";

const salesRouter = express.Router();
salesRouter.post(
    '/get-schools',
    expressAsyncHandler(async (req, res) => {
        actionToGetSchoolApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-school-type',
    expressAsyncHandler(async (req, res) => {
        actionToGetSchoolTypeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-follow-up-type',
    expressAsyncHandler(async (req, res) => {
        actionToGetFollowUpTypeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-school-contact-person',
    expressAsyncHandler(async (req, res) => {
        actionToGetFollowUpTypeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-school-client-lead',
    expressAsyncHandler(async (req, res) => {
        actionToGetFollowUpTypeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-school-client-lead-interation',
    expressAsyncHandler(async (req, res) => {
        actionToGetFollowUpTypeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
salesRouter.post(
    '/get-regions',
    expressAsyncHandler(async (req, res) => {
        actionToGetRegionApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default salesRouter;