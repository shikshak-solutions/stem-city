import connectPool from './connection.js';
const pool = await connectPool();
import {
   actionToGetAllPincodeListDataQuery, actionToGetAllStateListQuery, actionToGetPinCodeDetailsDataQuery,
} from "./helpers/commonQueries.js";


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