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
            const query = `select grades.id,JSON_OBJECT('id', grades.id,
                                              'name', grades.name,
                                              'product', (SELECT JSON_ARRAYAGG(JSON_OBJECT('product_id',product_grade.product_id,'id',product_grade.id,'name',prod.name))
                                                          from product_grade left join products prod on prod.id=product_grade.grade_id
                                                          WHERE grade_id = grades.id),
                                              'subject', (SELECT JSON_ARRAYAGG(JSON_OBJECT('subject_id',grade_subject.subject_id,'id',grade_subject.id))
                                                          from grade_subject left join subjects sub on sub.id=grade_subject.subject_id
                                                          WHERE grade_id = grades.id)
                                  ) as data
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
export const actionToGetSubjectListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select JSON_OBJECT('id', subjects.id,
                                              'name', subjects.name,
                                              'curriculum',
                                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', curriculum_topic.id, 'focus',
                                                                                curriculum.focus, 'name',
                                                                                curriculum.name, 'description',
                                                                                curriculum.description,
                                                                                'photo', curriculum.photo,
                                                                                'curriculum_content',
                                                                                (select JSON_ARRAYAGG(JSON_OBJECT('id',
                                                                                                                  curriculum_content.id,
                                                                                                                  'url',
                                                                                                                  curriculum_content.url,
                                                                                                                  'type',
                                                                                                                  curriculum_content.type,
                                                                                                                  'flipbook_code',
                                                                                                                  curriculum_content.type))
                                                                                 from curriculum_content
                                                                                 WHERE curriculum_content.curriculum_id = curriculum_topic.curriculum_id)
                                                                    ))
                                               from curriculum_topic
                                                        join curriculum on curriculum.id = curriculum_topic.curriculum_id
                                                        join subject_topic ON subject_topic.topic_id = curriculum_topic.topic_id
                                               WHERE subject_topic.subject_id = subjects.id),
                                              'product', (SELECT JSON_ARRAYAGG(product_subject.product_id)
                                                          from product_subject
                                                          WHERE subject_id = subjects.id),
                                              'grade', (SELECT JSON_ARRAYAGG(grade_subject.grade_id)
                                                        from grade_subject
                                                        WHERE subject_id = subjects.id)
                                  ) as data
                           from subjects  `;
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
            const query = `select JSON_OBJECT('id', topics.id,
                                              'name', topics.name,
                                              'curriculum',
                                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', curriculum_topic.id, 'focus',
                                                                                curriculum.focus, 'name',
                                                                                curriculum.name, 'description',
                                                                                curriculum.description,
                                                                                'photo', curriculum.photo,
                                                                                'curriculum_content',
                                                                                (select JSON_ARRAYAGG(JSON_OBJECT('id',
                                                                                                                  curriculum_content.id,
                                                                                                                  'url',
                                                                                                                  curriculum_content.url,
                                                                                                                  'type',
                                                                                                                  curriculum_content.type,
                                                                                                                  'flipbook_code',
                                                                                                                  curriculum_content.type))
                                                                                 from curriculum_content
                                                                                 WHERE curriculum_content.curriculum_id = curriculum_topic.curriculum_id)
                                                                    ))
                                               from curriculum_topic
                                                        join curriculum on curriculum.id = curriculum_topic.curriculum_id
                                               WHERE curriculum_topic.topic_id = topics.id),
                                              'product', (SELECT JSON_ARRAYAGG(product_topic.product_id)
                                                          from product_topic
                                                          WHERE topic_id = topics.id),
                                              'subject', (SELECT JSON_ARRAYAGG(subject_topic.subject_id)
                                                          from subject_topic
                                                          WHERE topic_id = topics.id)
                                  ) as data
                           from topics `;
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