import express from "express";
import expressAsyncHandler from "express-async-handler";
import {actionToGetGalleryFolderListApiCall} from "../models/Gallery.js";
const galleryRouter = express.Router();


galleryRouter.post(
    '/get-gallery-list',
    expressAsyncHandler(async (req, res) => {
        actionToGetGalleryFolderListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default galleryRouter;