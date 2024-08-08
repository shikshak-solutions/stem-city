import connectPool from './connection.js';
const pool = await connectPool();
const logEvent = (eventTypeId,userId,tableName, action, objectId, previousData, newData,version_number) => {
    const query = `INSERT INTO event_logs(event_type_id,user_id,table_name, action, object_id, previous_data, new_data, object_version) VALUES (?, ?, ?, ?, ?, ?,?,?)`;
    pool.query(query, [eventTypeId,userId,tableName, action, objectId, previousData, newData, version_number], (err, results) => {
        if (err) {
            console.error('Error logging event:', err);
        }
        return true
    });
    return true
};
export const insertCommonWithLogCommonApiCall = (body) => {
    const {tableName,data,userId,eventTypeId} = body;
    return new Promise(function(resolve, reject) {
        const columns = Object.keys(data).join(',');
        const values = Object.values(data).map(value => `'${value}'`).join(',');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }else{
                logEvent(eventTypeId,userId,tableName, 'CREATE', results.insertId, null, JSON.stringify(data), 1);
                resolve({success:1,id:results.insertId});
            }

        })
    })
}


export const actionToGetCompanyListApiCall =  (body) => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select company.* from company where in_inventory_use='1'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}


export const softDeleteWithLogCommonApiCall = (body) => {
    const {eventTypeId,userId,id,tableName} = body;
    try {
        return new Promise(function(resolve, reject) {
            const selectQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
            pool.query(selectQuery, [id], (selectErr, selectResults) => {
                if (selectErr) {
                    reject(error)
                } else {
                    const previousData = JSON.stringify(selectResults[0]);
                    const version = selectResults[0].version;
                    const query = `UPDATE ${tableName}
                                   set is_active='0'
                                   WHERE id = ?`;
                    pool.query(query, [id], (error) => {
                        if (error) {
                            reject(error)
                        }
                        logEvent(eventTypeId,userId,tableName, 'SOFT_DELETE', id, previousData, null, version);
                        let data = {success: 1};
                        resolve(data);
                    })
                }
            })
        })
    }catch (e){
        return e;
    }

}

export const deleteWithLogCommonApiCall = (body) => {
    const {eventTypeId,userId,id,tableName} = body;
    try {
        return new Promise(function(resolve, reject) {
            const selectQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
            pool.query(selectQuery, [id], (selectErr, selectResults) => {
                if (selectErr) {
                    reject(error)
                } else {
                    const previousData = JSON.stringify(selectResults[0]);
                    const version = selectResults[0].version;
                    const query = `DELETE FROM ${tableName} WHERE id = ?`;
                    pool.query(query, [id], (error) => {
                        if (error) {
                            reject(error)
                        }
                        logEvent(eventTypeId,userId,tableName, 'DELETE', id, previousData, null, version);
                        let data = {success: 1};
                        resolve(data);
                    })
                }
            })
        })
    }catch (e){
        return e;
    }
}
export const updateWithLogCommonApiCall = (body) => {
    const {eventTypeId,userId,id,tableName,data} = body;
    try {
        const setClause = Object.keys(data)
            .map(key => `${key} = '${data[key]}'`)
            .join(',');
        return new Promise(function(resolve, reject) {
            const selectQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
            pool.query(selectQuery, [id], (selectErr, selectResults) => {
                if (selectErr) {
                    reject(error)
                } else {
                    const previousData = JSON.stringify(selectResults[0]);
                    const version = selectResults[0].version + 1;
                    const query = `UPDATE ${tableName} SET ${setClause}, version = ${version} WHERE id = ?`;
                    pool.query(query, [id], (error) => {
                        if (error) {
                            reject(error)
                        }
                        logEvent(eventTypeId,userId,tableName, 'UPDATE', id, previousData, JSON.stringify(data), version);
                        resolve({success: 1});
                    })
                }
            })
        })
    }catch (e){
        return e;
    }
}