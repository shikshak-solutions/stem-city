import connectPool from './connection.js';
const pool = await connectPool();
export const actionToGetGalleryFolderListApiCall = (body) => {
    let {user_id} = body;
    let where = user_id ? ` and (s.shared_with = ${user_id} OR g.created_by = ${user_id}) ` : '';
    return new Promise(function(resolve, reject) {
        const query = `select g.* from gallery_folder g
         LEFT JOIN gallery_folder_shared s ON s.gallery_folder_id = g.id
         where g.is_active = '1' ${where} group by g.id`;
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