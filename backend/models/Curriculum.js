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
    let {id,slug} = body;
    let where = id ? ` and cc.curriculum_id = ${id} ` :'';
     where += slug ? ` and c.slug = '${slug}' ` :'';
    return new Promise(function(resolve, reject) {
        const query = `select * from curriculum_content cc
         LEFT JOIN curriculum c ON c.id=cc.curriculum_id
         where 1=1 ${where} order by ordering`;
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
            const query = `select grades.id,grades.name,grades.photo
                           from grades`;
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
export const actionToGetWebsiteGradeListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `SELECT JSON_OBJECTAGG(grades.id, grades.jsdata) as data
                           from (SELECT g.id,JSON_OBJECT('id', g.id,
                               'name', g.name,
                               'photo', g.photo)  AS jsdata
                               from grades g WHERE g.is_active='1'  group by g.id) as grades`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results[0].data;
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
            const query = `select subjects.id,subjects.name,subjects.photo from subjects  where is_active='1'`;
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
export const actionToGetTopicsListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select topics.id,topics.name,topics.photo from topics where is_active = '1'`;
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
export const actionToGetSubjectTopicGradeListApiCall =  (body) => {
    let {subject_id,grade_id,topic_id} = body;
    let where = subject_id ? ` and stg.subject_id = ${subject_id}` : '';
    where += grade_id ? ` and stg.grade_id = ${grade_id}` : '';
    where += topic_id ? ` and stg.topic_id = ${topic_id}` : '';
    try {
        return new Promise(async function(resolve, reject) {
            const query = `SELECT stg.*, s.name AS subject_name,t.name AS topic_name, g.name AS grade_name
                           FROM grade_subject_topic stg LEFT JOIN subjects s ON s.id=stg.subject_id 
                               LEFT JOIN topics t ON t.id = stg.topic_id LEFT JOIN grades g ON g.id = stg.grade_id where 1=1 ${where}`;
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
export const actionToGetCurriculumTopicListApiCall =  (body) => {
    let {curriculum_id,topic_id} = body;
    let where =  curriculum_id ? ` and cgst.curriculum_id = ${curriculum_id}` : '';
    where += topic_id ? ` and cgst.topic_id = ${topic_id}` : '';
    try {
        return new Promise(async function(resolve, reject) {
            const query = `SELECT cgst.*, s.name AS subject_name,t.name AS topic_name, g.name AS grade_name
                           FROM curriculum_grade_subject_topic cgst
                               LEFT JOIN grade_subject_topic stg ON stg.id=cgst.grade_subject_topic_id LEFT JOIN subjects s ON s.id=stg.subject_id 
                               LEFT JOIN topics t ON t.id = stg.topic_id LEFT JOIN grades g ON g.id = stg.grade_id where 1=1 ${where}`;
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

export const actionToGetWebsiteCurriculumListApiCall =  (body) => {
    let {source_id} = body;
    let where =  source_id ? ` and cat.source = ${source_id}` : '';
    try {
        return new Promise(async function(resolve, reject) {
            const query = `SELECT JSON_OBJECTAGG(curriculum.id, curriculum.jsdata) as data
                           from (SELECT c.id,JSON_OBJECT('id',c.id,
                                   'name',c.name,
                                   'focus',c.focus,
                                   'description',c.description,
                                   'photo',c.photo,
                                   'slug',c.slug,
                                   'product_name',p.name,
                                   'product_slug',pd.slug,
                                   'subcategory_name',sc.name,
                                   'subcategory_slug',sc.slug,
                                   'category_name',cat.name,
                                   'category_slug',cat.slug,
                                   'grade_name',g.name,
                                   'subject_name',s.name,
                                   'topic_name',t.name) AS jsdata
                                 FROM curriculum c
                                          INNER JOIN product_curriculum pc on pc.curriculum_id =c.id
                                          LEFT JOIN curriculum_grade_subject_topic cgst ON cgst.curriculum_id = c.id
                                          LEFT JOIN grade_subject_topic gst ON gst.id = cgst.grade_subject_topic_id
                                          LEFT JOIN grades g ON g.id = gst.grade_id
                                          LEFT JOIN subjects s ON s.id = gst.subject_id
                                          LEFT JOIN topics t ON t.id = gst.topic_id
                                          LEFT JOIN products p ON p.id=pc.product_id
                                          LEFT JOIN product_details pd ON pd.product_id=pc.product_id
                                          LEFT JOIN sub_categories sc  ON sc.id = p.sub_category_id
                                          LEFT JOIN categories cat ON cat.id = sc.category_id WHERE c.is_active = '1' ${where} ) as curriculum`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results[0].data;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}