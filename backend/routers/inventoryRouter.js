import express from "express";
import expressAsyncHandler from "express-async-handler";
import multer from 'multer';
import {
    actionToGetBrandListApiCall,
    actionToGetCategoryListApiCall,
    actionToGetCustomerApiCall,
    actionToGetProductListApiCall,
    actionToGetSubCategoryListApiCall,
    actionToGetVendorApiCall,
    actionToImportProductExcelApiCall,
    actionToGetProductImagesApiCall,
    actionToGetProductCurriculumApiCall,
    actionToGetDiscountCouponForProductApiCall,
    actionToGetProductGradeApiCall,
    actionToGetProductSubjectApiCall, actionToGetProductTopicApiCall
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
inventoryRouter.post(
    '/get-products',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-categories',
    expressAsyncHandler(async (req, res) => {
        actionToGetCategoryListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-sub-categories',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubCategoryListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-brands',
    expressAsyncHandler(async (req, res) => {
        actionToGetBrandListApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

inventoryRouter.post(
    '/get-product-images',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductImagesApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-product-curriculum',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductCurriculumApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-product-grade',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductGradeApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-product-subject',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductSubjectApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
inventoryRouter.post(
    '/get-product-topic',
    expressAsyncHandler(async (req, res) => {
        actionToGetProductTopicApiCall(req.body).then((data) => {
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

inventoryRouter.post(
    '/get-discount-coupon-for-product',
    expressAsyncHandler(async (req, res) => {
        actionToGetDiscountCouponForProductApiCall(req.body).then((data) => {
            res.status(200).send(data);
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
export default inventoryRouter;