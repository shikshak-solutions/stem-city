import express from "express";
import expressAsyncHandler from "express-async-handler";
import multer from 'multer';
import {
    actionToGetCustomerApiCall,
    actionToGetProductListApiCall,
    actionToGetVendorApiCall, actionToImportProductExcelApiCall
} from "../models/Inventory.js";

const inventoryRouter = express.Router();

inventoryRouter.post(
    '/actionToGetVendorApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetVendorApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/actionToGetCustomerApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetCustomerApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.get(
    '/actionToGetProductApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

const emailUpload = multer({
    storage: multer.memoryStorage()
});
inventoryRouter.post(
    '/actionToImportExcelOfProductsApiCall',emailUpload.single('file'),
    expressAsyncHandler(async (req, res) => {
      let file =  {
            filename: req.file.originalname,
            content: req.file.buffer,
          id:req.body.id
        };

        actionToImportProductExcelApiCall(file).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default inventoryRouter;