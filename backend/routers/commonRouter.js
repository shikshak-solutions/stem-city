import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {

    deleteCommonApiCall,
    insertCommonApiCall,
    updateCommonApiCall
} from "../models/commonModel.js";
import {actionToSendCustomEmail} from "../helper/emailNodeMailerHelper.js";
import {actionToGetAllCustomersData} from "../models/Users.js";
import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = "XkhZG4fW2t2W";
const commonRouter = express.Router();

commonRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
            userData:{},
        }
        loginUser(req.body)
            .then(user => {
                if(user && user.length) {
                    responseToSend = {
                        success:1,
                        userData:user[0],
                    }
                    res.status(200).send(responseToSend);
                }else{
                    res.status(200).send(responseToSend);
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/insertCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        insertCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/updateCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        updateCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/deleteCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        deleteCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetAllStudentClassDataByClassSectionIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllStudentClassDataByClassSectionIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetTeacherAllClassesDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllClassesDataApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data.map((rows)=>{
                    finalData.push(JSON.parse(rows.school_teacher_class));
                })
            }
            res.status(200).send({
                response: finalData,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetUserAllClassesSubjectDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUserAllClassesSubjectDataApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data.map((rows)=>{
                    finalData.push(JSON.parse(rows.app_user));
                })
            }
            res.status(200).send({
                response: finalData[0],
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetChartDataJsProgressDataSetApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChartDataJsProgressDataSetApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToToGetApiResponseForTextSearchApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToToGetApiResponseForTextSearchApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetChartDataJsProgressSubjectWiseDataSetApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChartDataJsProgressSubjectWiseDataSetApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllSyllabusTypeDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllSyllabusTypeDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllClassSectionTypeDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllClassSectionTypeDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllClassStandardDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllClassStandardDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetSubjectDataBySubjectIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubjectDataBySubjectIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetChapterDataByChapterIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChapterDataByChapterIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToCallFunctionToValidatePasswordApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToCallFunctionToValidatePasswordApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetSubjectAllChapterDataByIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetSubjectAllChapterDataByIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetChaptersAllTopicsDataByIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChaptersAllTopicsDataByIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetTestDataByTestIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTestDataByTestIdApiCall(req.body).then((data) => {
            let dataToSend = {};
            if(data?.length)
                dataToSend = data[0];
            res.status(200).send({
                response: dataToSend,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetChaptersAllTopicsHistoryDataByUserIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChaptersAllTopicsHistoryDataByUserIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetChaptersAllTestDataByIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetChaptersAllTestDataByIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetTestQuestionsAndOptionsDataByIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTestQuestionsAndOptionsDataByIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllUserListByConditionApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllUserListByConditionApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllSubjectDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllSubjectDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllChapterListDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllChapterListDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToGetAllTopicListDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllTopicListDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
		.catch(error => {
			res.status(500).send(error);
		})
    })
);
commonRouter.post(
    '/actionToSendCustomEmail',
    expressAsyncHandler(async (req, res) => {
        actionToSendCustomEmail(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllCustomersApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllCustomersData().then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllPincodeDetails',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllPincodeDetailsDataApiCall().then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

commonRouter.post(
    '/actionToCheckDeliveryAvailabilityOnPincode',
    expressAsyncHandler(async (req, res) => {
        const data = CryptoJS.AES.decrypt(req?.body?.payload, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        let payload = JSON.parse(data);
        console.log(payload,"payload")
        actionToGetPinCodeDetailsDataApiCall(payload).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllStateList',
    expressAsyncHandler(async (req, res) => {
        actionToGetALLStateListApiCall(req.body).then((data) => {
            res.status(200).send({
                data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

export default commonRouter;
