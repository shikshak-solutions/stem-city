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
            const query = `select grades.id,grades.name,grades.photo,JSON_OBJECT(
                                              'product', (SELECT JSON_ARRAYAGG(JSON_OBJECT('product_id',product_grade.product_id,'id',product_grade.id,'name',prod.name))
                                                          from product_grade left join products prod on prod.id=product_grade.product_id
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
            const query = `select subjects.id,subjects.name,subjects.photo,JSON_OBJECT(
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
                                              'product', (SELECT JSON_ARRAYAGG(JSON_OBJECT('product_id',product_subject.product_id,'id',product_subject.id,'name',prod.name))
                                                          from product_subject left join products prod on prod.id=product_subject.product_id
                                                          WHERE subject_id = subjects.id),

                                              'grade', (SELECT JSON_ARRAYAGG(JSON_OBJECT('grade_id',grade_subject.grade_id,'id',grade_subject.id))
                                                        from grade_subject
                                                        WHERE subject_id = subjects.id),
                                              'topic', (SELECT JSON_ARRAYAGG(JSON_OBJECT('topic_id',subject_topic.topic_id,'id',subject_topic.id))
                                                        from subject_topic
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
            const query = `select topics.id,topics.name,topics.photo,JSON_OBJECT(
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
                                              'product', (SELECT JSON_ARRAYAGG(JSON_OBJECT('product_id',product_topic.product_id,'id',product_topic.id,'name',prod.name))
                                                          from product_topic left join products prod on prod.id=product_topic.product_id
                                                          WHERE topic_id = topics.id),
                                              'subject', (SELECT JSON_ARRAYAGG(JSON_OBJECT('subject_id',subject_topic.subject_id,'id',subject_topic.id))
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
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}