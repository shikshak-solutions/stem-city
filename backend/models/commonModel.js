import connectPool from './connection.js';
const pool = await connectPool();
import {
    actionToGetAllChapterListDataQuery, actionToGetAllPincodeListDataQuery, actionToGetAllStateListQuery,
    actionToGetAllStudentClassDataByClassSectionQuery,
    actionToGetAllSubjectDataListQuery,
    actionToGetAllTopicListDataQuery,
    actionToGetAllUserListByConditionQuery,
    actionToGetChapterDataByChapterIdQuery,
    actionToGetChaptersAllTestDataByIdQuery,
    actionToGetChaptersAllTopicsDataByIdQuery,
    actionToGetChaptersAllTopicsHistoryDataByUserIdQuery,
    actionToGetChartDataJsProgressDataQuery,
    actionToGetChartDataJsProgressSubjectWiseDataQuery, actionToGetPinCodeDetailsDataQuery,
    actionToGetSubjectAllChapterDataByIdQuery,
    actionToGetSubjectDataBySubjectIdQuery, actionToGetTeacherAllClassesDataQuery,
    actionToGetTestDataByTestIdQuery,
    actionToGetTestQuestionsAndOptionsDataByIdQuery, actionToGetUserAllClassesSubjectDataQuery,
    loginUserQuery
} from "./helpers/commonQueries.js";

//const serpApiKey = `ad05b26208d9d271734a47c7d009e1027dc71c122edbf6fb4633b03865f36d71`;
const serpApiKey = `bd159053bc9d64d12628ebc88a72fa3bda9c23ec4ebf20dae6ace683246be59d`;

export const insertCommonApiCall = (body) => {
    const {column,alias,tableName,values} = body;
    return new Promise(function(resolve, reject) {
        const query =`INSERT INTO ${tableName} (${column.toString()}) VALUES (${alias.toString()})`;
        pool.query(query,values, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export const updateCommonApiCall = (body) => {
        const {column,value,whereCondition,tableName} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE ${tableName} set ${column.toString()} WHERE ${whereCondition}`;
            pool.query(query,value, (error) => {
                if (error) {
                    reject(error)
                }
                let data = {success:1};
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }

}
export const softDeleteCommonApiCall = (body) => {
        const {whereCondition,tableName} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE ${tableName} set is_active='0' WHERE ${whereCondition}`;
            pool.query(query, (error) => {
                if (error) {
                    reject(error)
                }
                let data = {success:1};
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }

}
export const deleteCommonApiCall = (body) => {
    const {condition,tableName} = body;
    return new Promise(function(resolve, reject) {
        const query = `DELETE FROM ${tableName} WHERE ${condition}`;
        pool.query(query, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export const loginUser = (body) => {
    const {password} = body;
    return new Promise(function(resolve, reject) {
        const query = loginUserQuery(password);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllStudentClassDataByClassSectionIdApiCall = (body) => {
    const {classStandardId,userId,schoolSyllabusId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllStudentClassDataByClassSectionQuery(classStandardId,userId,schoolSyllabusId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetTeacherAllClassesDataApiCall = (body) => {
    const {teacherId,schoolId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTeacherAllClassesDataQuery(teacherId,schoolId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetUserAllClassesSubjectDataApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetUserAllClassesSubjectDataQuery(userId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetChartDataJsProgressDataSetApiCall = (body) => {
    const {classStandardId,userId,schoolSyllabusId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChartDataJsProgressDataQuery(classStandardId,userId,schoolSyllabusId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetChartDataJsProgressSubjectWiseDataSetApiCall = (body) => {
    const {classStandardId,userId,schoolSyllabusId,subject_id} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChartDataJsProgressSubjectWiseDataQuery(classStandardId,userId,schoolSyllabusId,subject_id);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllSyllabusTypeDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        pool.query(`select * from syllabus_type`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllClassSectionTypeDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        pool.query(`select
                        class_standard.standard as standard,
                        school_class_with_section.id as id,
                        school_class_with_section.section as section from school_class_with_section
                        INNER JOIN class_standard ON class_standard.id = school_class_with_section.class_standard_id
                        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllClassStandardDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        pool.query(`select
                        class_standard.id as id,
                        class_standard.standard as standard from class_standard
                        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetSubjectDataBySubjectIdApiCall = (body) => {
    const {subjectId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetSubjectDataBySubjectIdQuery(subjectId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            let data = {};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
}
export const actionToGetChapterDataByChapterIdApiCall = (body) => {
    const {chapterId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChapterDataByChapterIdQuery(chapterId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            let data = {};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
}
export const actionToCallFunctionToValidatePasswordApiCall = (body) => {
    const {password} = body;
    return new Promise(function(resolve, reject) {
        pool.query(`SELECT count(id) as count from app_user WHERE panel_password = ?`,[password], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results[0]);
        })
    })
}
export const actionToGetSubjectAllChapterDataByIdApiCall = (body) => {
    const {subjectId,userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetSubjectAllChapterDataByIdQuery(subjectId,userId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetChaptersAllTopicsDataByIdApiCall = (body) => {
    const {condition,userId,limitQuery} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChaptersAllTopicsDataByIdQuery(condition,userId,limitQuery);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetTestDataByTestIdApiCall = (body) => {
    const {testId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTestDataByTestIdQuery(testId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetChaptersAllTopicsHistoryDataByUserIdApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChaptersAllTopicsHistoryDataByUserIdQuery(userId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllUserListByConditionApiCall = (body) => {
    const {condition} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllUserListByConditionQuery(condition);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllSubjectDataListApiCall = (body) => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllSubjectDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllChapterListDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllChapterListDataQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetChaptersAllTestDataByIdApiCall = (body) => {
    const {chapterId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetChaptersAllTestDataByIdQuery(chapterId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetTestQuestionsAndOptionsDataByIdApiCall = (body) => {
    const {testId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTestQuestionsAndOptionsDataByIdQuery(testId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllTopicListDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllTopicListDataQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

/**
 * This method is used to generate random string according to required length
 * @param length
 * @returns {string}
 */
export const generateRandomString=(length)=> {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}
export const actionToGetAllPincodeDetailsDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllPincodeListDataQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetPinCodeDetailsDataApiCall = (body) => {
    const {pinCode} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetPinCodeDetailsDataQuery(pinCode);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetALLStateListApiCall = (body) => {
    const {teacherId,schoolId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllStateListQuery(teacherId,schoolId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}