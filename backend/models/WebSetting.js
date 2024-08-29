import connectPool from './connection.js';
//import {getCache, setCache} from "./redis/cache.js";
const pool = await connectPool();
export const actionToGetWebSettingsContentApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `select web.*, comp.name as company_name from website_content web
                                LEFT JOIN menu_website_content on menu_website_content.website_content_id= web.id
                                LEFT JOIN menu on menu.id= menu_website_content.menu_id
                                LEFT JOIN company comp on comp.id=menu.source where web.is_active='1' group by web.id,comp.id`;
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

export const actionToGetWebSettingsSectionContentApiCall = (body) => {
    let {source_id} = body;
    let where = source_id ? `and menu.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select web.*, comp.id as source, comp.name as company_name,
                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', content.id,
                                                                'name', content.name,
                                                                'source', comp.id,
                                                                'company_name', comp.name,
                                                                'object_value', content.object_value,
                                                                'object_size', content.object_size,
                                                                'object_type', content.object_type,
                                                                'object_subheading', content.object_subheading,
                                                                'object_heading', content.object_heading,
                                                                'object_class', content.object_class,
                                                                'call_to_action_link', content.call_to_action_link,
                                                                'call_to_action_name', content.call_to_action_name,
                                                                'position', content.position,
                                                                'object_extras', content.object_extras)) FROM  website_section_content AS content WHERE
                              content.is_active='1' and content.website_section_id = web.id ORDER BY content.position) AS content,
                              JSON_ARRAYAGG(JSON_OBJECT('id', menu_website_section.id,'menu_id', menu_website_section.menu_id,'menu_name', menu.name,'ordering', menu_website_section.ordering)) as menu_data
                       from website_section web
                                LEFT JOIN menu_website_section on menu_website_section.website_section_id= web.id
                                LEFT JOIN menu on menu.id= menu_website_section.menu_id
                                LEFT JOIN company comp on comp.id=menu.source where web.is_active='1' ${where} group by web.id,comp.id`;
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
export const actionToGetWebSettingSeoMetaApiCall = (body) => {
    let {source_id} = body;
    let where = source_id ? `and menu.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select seo.*, menu.name as menu_name,comp.name as company_name,ref.name as html_type_name from seo_reference seo
                                         LEFT JOIN menu on menu.id=seo.menu_id and menu.is_active='1'
                                         LEFT JOIN company comp on comp.id=menu.source
                                         LEFT JOIN seo_reference_html ref on ref.id=seo.html_type where seo.is_active='1' ${where}`;
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
export const actionToGetWebSettingMenuListApiCall = (body) => {
    let {source_id} = body;
    let where = source_id ? `and web.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select menu.*, c.name AS component_name,c.component_path,c.component_type, comp.name as company_name from menu
                                         LEFT JOIN component c ON c.id=menu.component_id
                                         LEFT JOIN company comp on comp.id=menu.source where menu.is_active='1' ${where}`;
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
export const actionToGetWebSettingSeoReferenceHtmlApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `select * from seo_reference_html `;
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
export const actionToGetWebsiteContentApiCall = (body) => {
    let {pathname,source_id} = body;
    let where = source_id ? `and menu.url = '${pathname}' and menu.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT JSON_OBJECTAGG(content.name, content.jsdata) as data
                       from (SELECT content.name, JSON_ARRAYAGG(JSON_OBJECT('id', content.id,
                                                                            'name', content.name,
                                                                            'object_key', content.object_key,
                                                                            'object_value', content.object_value,
                                                                            'object_type', content.object_type,
                                                                            'object_heading', content.object_heading,
                                                                            'call_to_action_link', content.call_to_action_link,
                                                                            'call_to_action_name', content.call_to_action_name,
                                                                            'component_type', content.component_type,
                                                                            'object_extras', content.object_extras)) AS jsdata
                             FROM website_content AS content 
                             LEFT JOIN menu_website_content on menu_website_content.website_content_id= content.id
                             LEFT JOIN menu on menu.id= menu_website_content.menu_id
                             WHERE content.is_active='1' ${where} GROUP BY content.name) AS content`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results[0]['data'];
            }
            resolve(data);
        })
    })
}
export const actionToGetWebsiteSectionContentApiCall = (body) => {
    let {pathname,source_id} = body;
    let where = source_id ? `and menu.url = '${pathname}' and menu.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT section.*,component.name as component_name,component.component_type,component.component_path,
                                            (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', content.id,
                                                                            'name', content.name,
                                                                            'object_value', content.object_value,
                                                                            'object_size', content.object_size,
                                                                            'object_type', content.object_type,
                                                                            'object_subheading', content.object_subheading,
                                                                            'object_heading', content.object_heading,
                                                                            'object_class', content.object_class,
                                                                            'call_to_action_link', content.call_to_action_link,
                                                                            'call_to_action_name', content.call_to_action_name,
                                                                            'position', content.position,
                                                                            'object_extras', content.object_extras)) FROM  website_section_content AS content WHERE 
                                                                            content.website_section_id = section.id AND content.is_active='1' ORDER BY content.position) AS content
                             FROM  website_section AS section 
                             LEFT JOIN component on component.id= section.component_id and component.is_active='1'
                             LEFT JOIN menu_website_section on menu_website_section.website_section_id= section.id
                             LEFT JOIN menu on menu.id= menu_website_section.menu_id and menu.is_active='1'
                             WHERE section.is_active='1' ${where} order by menu.ordering`;
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
export const actionToGetWebsiteMenuListApiCall = (body) => {
    let {source_id} = body;
    let where = source_id ? `and menu.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT menu.*, c.name AS component_name,c.component_path  FROM menu  
    LEFT JOIN component c ON c.id=menu.component_id AND c.is_active='1' WHERE menu.is_active='1' ${where} order by ordering`;
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
export const actionToGetComponentListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT *  FROM component WHERE is_active='1' order by id`;
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
export const actionToGetWebsiteCategoriesListApiCall = (body) => {
    let {source_id} = body;
    let where = source_id ? `and c.source = ${source_id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT JSON_OBJECTAGG(category.id, category.jsdata) as data
                       from (SELECT c.id,JSON_OBJECT('id', c.id,
                                                             'name', c.name,
                                                             'photo', c.photo,
                                                             'slug', c.slug)  AS jsdata
    FROM categories c WHERE c.is_active='1' ${where} group by c.id) as category`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results[0].data;
            }
            resolve(data);
        })
    })
}

export const actionToGetSEOMetaDataWebsiteApiCall = (body) => {
    let {pathname,source_id} = body;
    let where = source_id ? `and menu.source = ${source_id} ` : ``;
     where += pathname ? `and menu.url = '${pathname}' ` : ``;
    try{
        return new Promise(async function (resolve, reject) {
           /* let seoReference = await getCache('shikshak-admin-seo-meta-data-website');
            if(seoReference){
                resolve(JSON.parse(seoReference));
            } else {*/
                const query = `SELECT seo.*,  (SELECT html FROM seo_reference_html WHERE id = seo.html_type) as seo_html_type                                      
                                     FROM seo_reference AS seo
                                              left join seo_reference_html as seo_html_type ON seo.html_type = seo_html_type.id
                                     left join menu ON menu.id=seo.menu_id where seo.is_active = '1' ${where} `;

                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results;
                    }
                   // setCache('shikshak-admin-seo-meta-data',JSON.stringify(data))
                    resolve(data);
                })

           // }
        })
    } catch (e){
        console.log(e);
    }

}