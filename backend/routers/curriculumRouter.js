import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
    actionToGetCurriculumFileApiCall,
    actionToGetCurriculumListApiCall, actionToGetGradeListApiCall,
    actionToGetSubjectListApiCall
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
    '/get-subject',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubjectListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default curriculumRouter;
