import connectPool from './connection.js';
const pool = await connectPool();
/**
 * This  query is used to get follow up type
 * @returns {{query: string}}
 */
export const actionToGetFollowUpTypeApiCall = () =>{
    return new Promise(function(resolve, reject) {
        const query = `SELECT * from follow_up_type `;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
/**
 * This  query is used to get school type
 * @returns {{query: string}}
 */
export const actionToGetSchoolTypeApiCall = () =>{
    return new Promise(function(resolve, reject) {
        const query = `SELECT * from school_type `;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
/**
 * This  query is used to get school list
 * @returns {{query: string}}
 */
export const actionToGetSchoolApiCall = (body) =>{
    return new Promise(function(resolve, reject) {
        let {region_id} = body;
        let where = region_id ? ` and sr.region_id = ${region_id}` : '';
        const query = `SELECT s.*,sl.name as state_name,asm.name as assigned_sales_member_name,
       st.name as school_type_name, c.name as city_name from schools s 
                                  left join state_list sl on sl.id = s.state_id 
                                  left join state_region sr on sr.state_id = s.state_id 
                                  left join school_type st on st.id = s.school_type_id 
                                  left join cities c on c.id = s.city_id 
                                  left join users asm on asm.id = s.assigned_sales_member
                                  where s.is_active='1' ${where}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
/**
 * This  query is used to get school list
 * @returns {{query: string}}
 */
export const actionToGetRegionApiCall = () =>{
    return new Promise(function(resolve, reject) {
        const query = `SELECT r.id,r.name, JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'state_name', sl.name)) AS state_list
                       FROM region r LEFT JOIN state_region s on s.region_id=r.id LEFT JOIN state_list sl on sl.id=s.state_id GROUP BY r.id`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}