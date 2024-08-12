import connectPool from './connection.js';
const pool = await connectPool();
export const actionToGetCurriculumListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `select * from curriculum where is_active = '1'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToGetCurriculumFileApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select * from curriculum_content where curriculum_id = ${id}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}

export const actionToGetGradeListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select * from grade `;
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
export const actionToGetSubjectListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select * from subject `;
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