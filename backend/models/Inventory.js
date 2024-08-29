import connectPool from './connection.js';
// import {getCache, setCache} from "./redis/cache.js";
const pool = await connectPool();
import XLSX from 'xlsx';
export const actionToGetVendorApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select vendor.* from vendor ${where}`;
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

export const actionToGetCustomerApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select customer.* from customer ${where}`;
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
export const actionToGetProductListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT prod.*, subcat.name AS sub_category_name, cat.name AS category_name,subcat.category_id as category_id,
                              brand.name as brand_name, comp.name as company_name,comp.in_website_use as in_website_use,
                              comp.in_curriculum_use as in_curriculum_use,comp.in_inventory_use as in_inventory_use,detail.slug as slug,cat.source as source,
                              detail.id as product_detail_id,detail.long_description,detail.min_age,detail.max_age
                       FROM products AS prod
                                LEFT JOIN sub_categories AS subcat ON subcat.id = prod.sub_category_id
                                LEFT JOIN categories AS cat ON cat.id=subcat.category_id
                                LEFT JOIN company comp on comp.id=cat.source
                                LEFT JOIN product_details detail on detail.product_id=prod.id
                                LEFT JOIN brand ON prod.brand_id=brand.id where prod.is_active='1'`;
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
export const actionToGetProductImagesApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select * from product_photos where product_id = ${id}`;
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
export const actionToGetProductCurriculumApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select c.*,p.product_id,p.id as product_curriculum_id from product_curriculum p join curriculum c on c.id=p.curriculum_id where p.product_id = ${id}`;
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
export const actionToGetProductGradeApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select g.*,p.product_id from product_grade p join grades g on g.id=p.grade_id where p.product_id = ${id}`;
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
export const actionToGetProductSubjectApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select s.*,p.product_id from product_subject p join subjects s on s.id=p.subject_id where p.product_id = ${id}`;
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
export const actionToGetProductTopicApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select t.*,p.product_id from product_topic p join topics t on t.id=p.topic_id where p.product_id = ${id}`;
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
export const actionToImportProductExcelApiCall = async(file) =>{
    const workbook = XLSX.read(file.content, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    const query = `INSERT INTO products (categoryId, type, location, in_stock_qty, name, brand, status, unitSize, netPrice, slug, description,  purchase_price)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY Update location =  VALUES(location) ,in_stock_qty= VALUES(location),type=VALUES(type)`;
    try {
        const connection = await pool.getConnection();
        for (const row of data) {
            const values = [row.name, row.column1, row.column2]; // Adjust based on your columns
            await connection.query(query, values);
        }
        connection.release();
        return 'File uploaded and data inserted/updated successfully.';
    } catch (error) {
        console.error('Error processing file:', error);
        return 'Error processing file.';
    }
    console.log(data,'data 12');
   return data;
}

export const actionToGetCategoryListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
          /* let {condition} = body;
            let where = (condition) ? ` ${condition} ` : '';*/
            const query = `select categories.*,c.name AS company_name from categories  
    join company c on c.id=categories.source where is_active='1'`;
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
export const actionToGetSubCategoryListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
          /* let {condition} = body;
            let where = (condition) ? ` ${condition} ` : '';*/
            const query = `select s.*,cat.name AS category,c.name AS company_name,c.id AS source from sub_categories s join categories cat on cat.id=s.category_id join company c on c.id=cat.source where s.is_active='1'`;
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

export const actionToGetBrandListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select b.* from brand b where b.is_active='1'`;
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
export const actionToGetDiscountCouponForProductApiCall = () => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT * FROM discount_coupon WHERE type='discount' and is_active = '1'`;
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
    }catch (e){
        return e;
    }
}