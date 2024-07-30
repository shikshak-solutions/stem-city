import connectPool from './connection.js';
const pool = await connectPool();

/**
 * This method is used to get all user details
 * @returns {Promise<unknown>}
 */
export const actionToGetAllUserApiCall = () => {
    try {
    return new Promise(function(resolve, reject) {
        const query = `select * from users`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = {};
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
    }catch (e){
        return e;
    }
}
/**
 * This method is used to get user details by email address
 * @param email
 * @returns {Promise<unknown>}
 */
export const actionToGetUserIsExistApiCall = async (email) => {
    try {
    return new Promise(function(resolve, reject) {
        const query = `select users.* 
from users
where users.source='stemcity' and (users.email = '${email}' or users.mobile = '${email}')`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = {};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
    }catch (e){
        return e;
    }
}
/**
 * This method is used to insert a new entry on user table when user signup
 * @param body
 * @returns {Promise<unknown>}
 */
export const actionToInsertUserApi = async (body) => {
    try {
    let {email,name,password,mobile} = body;
    return new Promise(function(resolve, reject) {
        const query = `INSERT INTO users (email,name,password,mobile,role,source)
                       VALUES ('${email}','${name}','${password}','${mobile}',4,'stemcity')`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = {};
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
    }catch (e){
        return e;
    }
}

export const actionToInsertGoogleUserApi = async (body) => {
    try {
        let {email,name,password} = body;
        return new Promise(function(resolve, reject) {
            const query = `INSERT INTO users (email,name,password,role,source)
                       VALUES ('${email}','${name}','${password}',4,'website')`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = {};
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}

/**
 * This method is used to get the user details by forgot password token
 * @param token
 * @returns {Promise<unknown>}
 */
export const actionToGetUserDetailsByForgotPasswordTokenApiCall = async (token) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `select * from users where token_forgot_password = '${token}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = {};
                if(results?.length){
                    data = results[0];
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
/**
 * This method is used to get the user details by forgot password token
 * @param token
 * @returns {Promise<unknown>}
 */
export const actionToGetAllCustomersData = async () => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `select users.*
                                , count(DISTINCT (orders.id))           AS total_orders
                                , COUNT(DISTINCT (paid_payments.id))    AS total_paid_orders
                                , COUNT(DISTINCT (unpaid_payments.id))  AS total_unpaid_orders
                                , count(DISTINCT (delivered_orders.id)) AS total_delivered_orders
                                , count(DISTINCT (cancel_orders.id))    AS total_cancel_orders
                                , count(DISTINCT (pending_orders.id))   AS total_pending_orders
                           FROM users
                                    LEFT JOIN orders
                                              ON users.id = orders.custId AND orders.initial_order_email_send = '1'
                                    LEFT JOIN orders AS delivered_orders ON users.id = delivered_orders.custId AND
                                                                            delivered_orders.initial_order_email_send =
                                                                            '1' AND
                                                                            delivered_orders.status = 'delieverd'
                                    LEFT JOIN orders AS cancel_orders ON users.id = cancel_orders.custId AND
                                                                         cancel_orders.initial_order_email_send =
                                                                         '1' AND cancel_orders.status = 'cancel'
                                    LEFT JOIN orders AS pending_orders ON users.id = pending_orders.custId AND
                                                                          pending_orders.initial_order_email_send =
                                                                          '1' AND pending_orders.status!='cancel' AND pending_orders.status!='delieverd'
LEFT JOIN payments AS paid_payments
                           ON paid_payments.order_id=orders.id AND paid_payments.payment_status='1'
                               LEFT JOIN payments AS unpaid_payments ON unpaid_payments.order_id=orders.id AND unpaid_payments.payment_status!='1'
                           GROUP BY users.id`;
            console.log(query,"query")
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = {};
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
/**
 * This method is used to get user password get user password by user id
 * @param body
 * @returns {Promise<unknown>}
 */
export const userPassWordByIdApiCall = (body) => {
    return new Promise(function(resolve, reject) {
       const query = `SELECT password from users WHERE id = '${body.id.toString()}'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results[0]?.password);
        })
    })
}
export const getOtpDetailsByOptAndEmail = (body) => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT * from two_factor_auth WHERE code = '${body.otp.toString()}' and email_address_mobile_no = '${body.emailOrMobile.toString()}'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results[0]);
        })
    })
}
/**
 * This  query is used to get user password by user id
 * @param body
 * @returns {{query: string}}
 */
export const getUserPassWordByUserIdQuery = (body) => {
    const {id} = body;
    const value = [id];
    const query = `SELECT password from users WHERE id = $1`;
    console.log(value,"value")
    return {query,value};
}