import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetCurriculumFileApiCall,
    actionToGetCurriculumListApiCall,
    actionToGetCurriculumTopicListApiCall,
    actionToGetGradeListApiCall,
    actionToGetSubjectListApiCall,
    actionToGetSubjectTopicGradeListApiCall,
    actionToGetTopicsListApiCall, actionToGetWebsiteCurriculumListApiCall,
    actionToGetWebsiteGradeListApiCall
} from "../models/Curriculum.js";
const curriculumRouter = express.Router();


curriculumRouter.post(
    '/get-curriculum-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetCurriculumListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
curriculumRouter.post(
    '/get-curriculum-file-by-curriculum-id',
    expressAsyncHandler(async (req, res) => {
        actionToGetCurriculumFileApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

curriculumRouter.post(
    '/get-grades',
    expressAsyncHandler(async (req, res) => {
        actionToGetGradeListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

curriculumRouter.post(
    '/get-website-grades',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteGradeListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

curriculumRouter.post(
    '/get-website-curriculum',
    expressAsyncHandler(async (req, res) => {
        actionToGetWebsiteCurriculumListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
curriculumRouter.post(
    '/get-subjects',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubjectListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

curriculumRouter.post(
    '/get-topics',
    expressAsyncHandler(async (req, res) => {
        actionToGetTopicsListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
curriculumRouter.post(
    '/get-subject-grade-topic',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubjectTopicGradeListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

curriculumRouter.post(
    '/get-curriculum-topic',
    expressAsyncHandler(async (req, res) => {
        actionToGetCurriculumTopicListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default curriculumRouter;

