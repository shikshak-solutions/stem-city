export const loginUserQuery = (password)=>{
    return `SELECT app_user.id as id,
                   app_user.name as name,
                   app_user.email as email,
                   app_user.is_active as is_active,
                   app_user.role as role,
                   app_user.avatar as avatar,
                   app_user.school_class_with_section_id,
                   school_class_with_section.class_standard_id,
                   app_user.gender,
                   app_user.mobile,
                   app_user.address,
                   app_user.school_id as school_id,
                   app_user.dob,
                   app_user.syllabus_type AS syllabus_type_id,
                   school_users.syllabus_type as school_syllabus_id
            FROM app_user
                     LEFT JOIN app_user as school_users ON school_users.id = app_user.school_id
                     LEFT JOIN school_class_with_section ON school_class_with_section.id = app_user.school_class_with_section_id
            WHERE app_user.panel_password = '${password}' AND app_user.is_active = 1`;
}
export const actionToGetAllStudentClassDataByClassSectionQuery = (class_standard_id,user_id,school_syllabus_id)=>{
    return `SELECT
                class_wise_subject.id as id,
                class_wise_subject.subject_name as name,
                SUM(chapter_wise_video_lessons.video_duration_in_seconds) AS total_workload,
                NULL as test_completed_percentage,
                ((100/SUM(chapter_wise_video_lessons.video_duration_in_seconds))*SUM(school_students_topic_progress.progress_time_last_watched)) as lesson_completed_percentage
                from class_wise_subject
                     LEFT  join subject_wise_chapter ON subject_wise_chapter.subject_id = class_wise_subject.id
                     LEFT  join chapter_wise_video_lessons ON chapter_wise_video_lessons.chapter_id = subject_wise_chapter.id
                     LEFT  join school_students_topic_progress ON school_students_topic_progress.topic_id = chapter_wise_video_lessons.id AND school_students_topic_progress.student_id = '${user_id}'
                WHERE class_wise_subject.class_standard_id = ${class_standard_id} AND class_wise_subject.syllabus_type_id = ${school_syllabus_id} GROUP BY class_wise_subject.id`;
}
export const actionToGetTeacherAllClassesDataQuery = (teacherId,schoolId)=>{
    return `SELECT JSON_OBJECT(
                           'standard',class_standard.standard,
                           'class_data',class_wise_subject.jsdata,
                           'student_data',class_standard_student.jsdata
                       ) AS school_teacher_class from school_teacher_class
                                                          INNER JOIN school_class_with_section ON school_class_with_section.id = school_teacher_class.school_class_with_section_id
                                                          INNER JOIN class_standard ON school_class_with_section.class_standard_id = class_standard.id
                                                          LEFT JOIN (SELECT class_wise_subject.class_standard_id,
                                                                            json_arrayagg(
                                                                                    json_object('name',class_wise_subject.subject_name,'id',class_wise_subject.id)
                                                                                ) jsdata
                                                                     FROM class_wise_subject
                                                                     GROUP BY class_wise_subject.class_standard_id) class_wise_subject ON class_wise_subject.class_standard_id = school_class_with_section.class_standard_id
                                                          LEFT JOIN (SELECT class_standard_student.id,
                                                                            json_arrayagg(
                                                                                    json_object('name', app_user.name,
                                                                                                'id', app_user.id,
                                                                                                'school_class_with_section_id', app_user.school_class_with_section_id,
                                                                                                'school_syllabus_id', app_user.syllabus_type,
                                                                                                'class_data',class_wise_subject_student.jsdata,
                                                                                                'class_standard_id',class_standard_student.standard)
                                                                                ) jsdata
                                                                     FROM class_standard AS class_standard_student
                                                                              INNER JOIN school_class_with_section ON school_class_with_section.class_standard_id = class_standard_student.id
                                                                              LEFT JOIN (SELECT class_wise_subject_student.class_standard_id,
                                                                                                json_arrayagg(
                                                                                                        json_object(
                                                                                                                'name', class_wise_subject_student.subject_name,
                                                                                                                'id',class_wise_subject_student.id
                                                                                                            )
                                                                                                    ) jsdata
                                                                                         FROM class_wise_subject AS class_wise_subject_student
                                                                                         GROUP BY class_wise_subject_student.class_standard_id
                                                                     ) class_wise_subject_student ON class_wise_subject_student.class_standard_id = school_class_with_section.class_standard_id
                                                                              INNER JOIN app_user ON app_user.school_class_with_section_id = school_class_with_section.id
                                                                     WHERE app_user.school_id = '${schoolId}'
                                                                     GROUP BY class_standard_student.id) class_standard_student ON class_standard_student.id = class_standard.id

            WHERE school_teacher_class.teacher_id = '${teacherId}' GROUP BY school_class_with_section.id`;
}
export const actionToGetUserAllClassesSubjectDataQuery = (userId)=>{
    return `SELECT JSON_OBJECT(
                           'id',app_user.id,
                           'name',app_user.name,
                           'school_class_with_section_id',app_user.school_class_with_section_id,
                           'class_standard_id',school_class_with_section.class_standard_id,
                           'syllabus_type_id',app_user.syllabus_type,
                           'school_syllabus_id',app_user.syllabus_type,
                           'school_id',app_user.school_id,
                           'class_data',class_wise_subject.jsdata
                       ) AS app_user from app_user
                                              LEFT JOIN school_class_with_section ON school_class_with_section.id = app_user.school_class_with_section_id
                                              LEFT JOIN (SELECT class_wise_subject.class_standard_id,
                                                                json_arrayagg(
                                                                        json_object('name',class_wise_subject.subject_name,'id',class_wise_subject.id)
                                                                    ) jsdata
                                                         FROM class_wise_subject
                                                         GROUP BY class_wise_subject.school_class_with_section_id) class_wise_subject ON class_wise_subject.class_standard_id = school_class_with_section.class_standard_id
            WHERE app_user.id = '${userId}'`;
}
export const actionToGetSubjectDataBySubjectIdQuery = (subjectId)=>{
    return `SELECT
                class_wise_subject.id as id,
                class_wise_subject.subject_name as name
            from class_wise_subject
            WHERE class_wise_subject.id = ${subjectId}`;
}
export const actionToGetChapterDataByChapterIdQuery = (chapterId)=>{
    return `SELECT
                subject_wise_chapter.id as id,
                subject_wise_chapter.name as name,
                subject_wise_chapter.description as description,
                subject_wise_chapter.icon as icon
            from subject_wise_chapter
            WHERE subject_wise_chapter.id = ${chapterId}`;
}

export const actionToGetSubjectAllChapterDataByIdQuery = (subject_id)=>{
    return `SELECT
                subject_wise_chapter.id as id,
                subject_wise_chapter.name as name,
                subject_wise_chapter.description as description,
                subject_wise_chapter.icon as icon,
                count(chapter_wise_video_lessons.id) as total_topics
            FROM subject_wise_chapter
                LEFT join chapter_wise_video_lessons ON chapter_wise_video_lessons.chapter_id = subject_wise_chapter.id
            WHERE subject_wise_chapter.subject_id = ${subject_id} GROUP BY subject_wise_chapter.id`;
}
export const actionToGetChaptersAllTopicsDataByIdQuery = (condition,user_id,limitQuery)=>{
    if(!limitQuery)
        limitQuery = '';
    return `SELECT chapter_wise_video_lessons.id as id,
                   school_students_topic_progress.id as school_students_topic_progress_id,
                   chapter_wise_video_lessons.chapter_id as chapter_id,
                   chapter_wise_video_lessons.name as name,
                   school_students_topic_progress.progress_time_last_watched  AS progress_time_last_watched,
                   chapter_wise_video_lessons.description as description,chapter_wise_video_lessons.video_url as video_url,
                   chapter_wise_video_lessons.poster_url as poster_url,
                   chapter_wise_video_lessons.video_duration_in_seconds as video_duration_in_seconds,
                   ((100/chapter_wise_video_lessons.video_duration_in_seconds)*school_students_topic_progress.progress_time_last_watched) as lesson_completed_percentage

            FROM chapter_wise_video_lessons
                     LEFT join school_students_topic_progress ON school_students_topic_progress.topic_id = chapter_wise_video_lessons.id AND school_students_topic_progress.student_id = '${user_id}'
            WHERE ${condition} GROUP BY chapter_wise_video_lessons.id,school_students_topic_progress.id ${limitQuery}`;
}
export const actionToGetChaptersAllTestDataByIdQuery = (chapterId)=>{
    return `SELECT *
            FROM chapter_wise_test
            WHERE chapter_wise_test.chapter_id = ${chapterId}`;
}
export const actionToGetTestQuestionsAndOptionsDataByIdQuery = (testId)=>{
    return `SELECT *
            FROM chapter_wise_test_options
            WHERE chapter_wise_test_options.chapter_wise_test_id = '${testId}'`;
}
export const actionToGetTestDataByTestIdQuery = (testId)=>{
    return `SELECT chapter_wise_test.*,count(chapter_wise_test_options.id) as number_of_questions
            FROM chapter_wise_test
            LEFT JOIN chapter_wise_test_options ON chapter_wise_test_options.chapter_wise_test_id = chapter_wise_test.id
            WHERE chapter_wise_test.id = '${testId}' GROUP BY chapter_wise_test_options.chapter_wise_test_id`;
}
export const actionToGetChaptersAllTopicsHistoryDataByUserIdQuery = (user_id)=>{
    return `SELECT chapter_wise_video_lessons.id                               as id,
                   school_students_topic_progress.id                           as school_students_topic_progress_id,
                   chapter_wise_video_lessons.name                             as name,            
                   school_students_topic_progress.updated_at                   as updated_at,
                   school_students_topic_progress.progress_time_last_watched   AS progress_time_last_watched,
                   chapter_wise_video_lessons.description                      as description,
                   chapter_wise_video_lessons.video_url                        as video_url,
                   chapter_wise_video_lessons.poster_url                       as poster_url,
                   chapter_wise_video_lessons.video_duration_in_seconds        as video_duration_in_seconds,
                   class_wise_subject.subject_name                                                as subject_name,
                   class_wise_subject.id              as subject_id,
                   subject_wise_chapter.name as chapter_name,
                   subject_wise_chapter.id as chapter_id,
                   ((100 / chapter_wise_video_lessons.video_duration_in_seconds) *
                    school_students_topic_progress.progress_time_last_watched) as lesson_completed_percentage
            FROM school_students_topic_progress
                     LEFT join chapter_wise_video_lessons ON school_students_topic_progress.topic_id = chapter_wise_video_lessons.id
                     LEFT join subject_wise_chapter ON chapter_wise_video_lessons.chapter_id = subject_wise_chapter.id
                     LEFT join class_wise_subject ON subject_wise_chapter.subject_id = class_wise_subject.id
            WHERE school_students_topic_progress.student_id = '${user_id}'`;
}
export const actionToGetAllUserListByConditionQuery = (condition)=>{
    return `SELECT * FROM app_user WHERE ${condition}`;
}
export const actionToGetAllSubjectDataListQuery = ()=>{
    return `SELECT class_wise_subject.id,class_wise_subject.subject_name as name,class_standard.standard as standard
            FROM class_wise_subject
                     inner join class_standard ON class_standard.id = class_wise_subject.class_standard_id`;
}
export const actionToGetAllChapterListDataQuery = ()=>{
    return `SELECT * FROM subject_wise_chapter`;
}
export const actionToGetAllTopicListDataQuery = ()=>{
    return `SELECT * FROM chapter_wise_video_lessons`;
}
export const actionToGetChartDataJsProgressDataQuery = (class_standard_id,user_id,school_syllabus_id)=>{
    return `SELECT
                class_wise_subject.subject_name as name,
                class_wise_subject.subject_name as subject_name,
                CASE
                    WHEN SUM(chapter_wise_video_lessons.video_duration_in_seconds) IS NULL THEN 0
                    ELSE SUM(chapter_wise_video_lessons.video_duration_in_seconds)
                    END as total,
                CASE
                    WHEN (SUM(school_students_topic_progress.progress_time_last_watched)) IS NULL THEN 0
                    ELSE (SUM(school_students_topic_progress.progress_time_last_watched))
                    END as total_spent,
                CASE
                    WHEN ((100 / SUM(chapter_wise_video_lessons.video_duration_in_seconds)) *
                          SUM(school_students_topic_progress.progress_time_last_watched)) IS NULL THEN 0
                    ELSE ((100 / SUM(chapter_wise_video_lessons.video_duration_in_seconds)) *
                          SUM(school_students_topic_progress.progress_time_last_watched))
                    END as percentage
            from class_wise_subject
                     LEFT  join subject_wise_chapter ON subject_wise_chapter.subject_id = class_wise_subject.id
                     LEFT  join chapter_wise_video_lessons ON chapter_wise_video_lessons.chapter_id = subject_wise_chapter.id
                     LEFT  join school_students_topic_progress ON school_students_topic_progress.topic_id = chapter_wise_video_lessons.id AND school_students_topic_progress.student_id = '${user_id}'
            WHERE class_wise_subject.class_standard_id = ${class_standard_id} AND class_wise_subject.syllabus_type_id = ${school_syllabus_id} GROUP BY class_wise_subject.id`;
}
export const actionToGetChartDataJsProgressSubjectWiseDataQuery = (class_standard_id,user_id,school_syllabus_id,subject_id)=>{
    return `SELECT
                subject_wise_chapter.name as subject_name,
                CASE
                    WHEN SUM(chapter_wise_video_lessons.video_duration_in_seconds) IS NULL THEN 0
                    ELSE SUM(chapter_wise_video_lessons.video_duration_in_seconds)
                    END as total,
                CASE
                    WHEN (SUM(school_students_topic_progress.progress_time_last_watched)) IS NULL THEN 0
                    ELSE (SUM(school_students_topic_progress.progress_time_last_watched))
                    END as total_spent,

                CASE
                    WHEN ((100/SUM(chapter_wise_video_lessons.video_duration_in_seconds))*SUM(school_students_topic_progress.progress_time_last_watched)) IS NULL THEN 0
                    ELSE ((100/SUM(chapter_wise_video_lessons.video_duration_in_seconds))*SUM(school_students_topic_progress.progress_time_last_watched))
                    END as percentage

            FROM subject_wise_chapter
                     INNER join class_wise_subject ON class_wise_subject.id = subject_wise_chapter.subject_id
                     LEFT  join chapter_wise_video_lessons ON chapter_wise_video_lessons.chapter_id = subject_wise_chapter.id
                     LEFT  join school_students_topic_progress ON school_students_topic_progress.topic_id = chapter_wise_video_lessons.id AND school_students_topic_progress.student_id = '${user_id}'
            WHERE class_wise_subject.class_standard_id = ${class_standard_id} AND class_wise_subject.syllabus_type_id = ${school_syllabus_id} AND subject_wise_chapter.subject_id = ${subject_id} GROUP BY subject_wise_chapter.id`;
}
export const actionToGetAllPincodeListDataQuery = ()=>{
    return `SELECT * FROM pincode_master order by id desc`;
}
export const actionToGetPinCodeDetailsDataQuery = (pinCode)=>{
    return `SELECT * FROM pincode_master where pincode=${pinCode} order by id desc`;
}
export const actionToGetAllStateListQuery = ()=>{
    return `SELECT * FROM state_list order by state_name ASC`;
}