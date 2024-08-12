import connectPool from './connection.js';
import {getCache, setCache} from "./redis/cache.js";
const pool = await connectPool();
export const actionToGetWebSettingsContentApiCall = (body) => {
    let {id} = body;
    let where = id ? `and web.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select web.*, comp.name as company_name from website_content web
                                         LEFT JOIN company comp on comp.id=web.source where web.is_active='1' ${where}`;
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
    let {id} = body;
    let where = id ? `and web.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select seo.*, comp.name as company_name,ref.name as html_type_name from seo_reference seo
                                         LEFT JOIN company comp on comp.id=seo.source
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
    let {id} = body;
    let where = id ? `and content.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT JSON_OBJECTAGG(content.name, content.jsdata) as data
                       from (SELECT content.name, JSON_ARRAYAGG(JSON_OBJECT('id', content.id,
                                                                            'name', content.name,
                                                                            'object_key', content.object_key,
                                                                            'object_value', content.object_value,
                                                                            'object_type', content.object_type,
                                                                            'object_extras', content.object_extras)) AS jsdata
                             FROM website_content AS content WHERE is_active=1 ${where} GROUP BY content.name) AS content`;
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

export const actionToGetSEOMetaDataWebsiteApiCall = () => {
    try{
        return new Promise(async function (resolve, reject) {
            let seoReference = await getCache('shikshak-admin-seo-meta-data-website');
            if(seoReference){
                resolve(JSON.parse(seoReference));
            } else {
                const query = `SELECT JSON_OBJECTAGG(seo.url, seo.jsdata) as data
                               from (SELECT seo.url,
                                            JSON_ARRAYAGG(JSON_OBJECT('id', seo.id,
                                                                      'name', seo.name,
                                                                      'charset', seo.charset,
                                                                      'content', seo.content,
                                                                      'slug', seo.slug,
                                                                      'http_equiv', seo.http_equiv,
                                                                      'html_type', seo.html_type,
                                                                      'seo_html_type',
                                                                      (SELECT html FROM seo_reference_html WHERE id = seo.html_type),
                                                                      'url', seo.url)) AS jsdata
                                     FROM seo_reference AS seo
                                              left join seo_reference_html as seo_html_type ON seo.html_type = seo_html_type.id
                                     GROUP BY seo.url) AS seo`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results[0]['data'];
                    }
                    setCache('shikshak-admin-seo-meta-data',JSON.stringify(data))
                    resolve(data);
                })

            }
        })
    } catch (e){
        console.log(e);
    }

}