import express from 'express';
const postRouter = express.Router();
import {actionToGetPostApiCall} from "../models/Posts.js";
import expressAsyncHandler from "express-async-handler";
postRouter.post(
    '/actionToGetPostApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetPostApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default postRouter;
