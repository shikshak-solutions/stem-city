import connectPool from './connection.js';
// import {getCache, setCache} from "./redis/cache.js";
const pool = await connectPool();

export const actionToGetProductsApiCall =  (body) => {
    try {
        return new Promise(async function (resolve, reject) {
        // let seoReference = await getCache('shikshak-admin-products-data');
        // if(seoReference){
        //     resolve(JSON.parse(seoReference));
        // } else {
            let {condition} = body;
                let where = (condition) ? ` ${condition} AND products.show_on_website = 'stemcity'` : ` where products.show_on_website = 'stemcity'`;
                const query = `SELECT products.*,
                                      categories.name                       AS category,
                                      subcategories.sub_name                AS sub_category,
                                      subcategories.categoryId              AS categoryId,
                                      subchildcategories.subcategoryId      AS subCategoryId,
                                      subchildcategories.name               AS sub_child_category,
                                      brand.name                            AS brand_name,
                                      products.min_class                    AS min_class,
                                      products.max_class                    AS max_class,
                                      ROUND(AVG(product_ratings.rating), 2) AS avg_rating,
                                      COUNT(DISTINCT (product_ratings.id))  AS total_product_rating,
                                      COUNT(DISTINCT (product_reviews.id))  AS total_product_review
                               FROM products
                                        LEFT JOIN subchildcategories ON subchildcategories.id = products.childCategoryId
                                        LEFT JOIN subcategories ON subcategories.id = subchildcategories.subcategoryId
                                        LEFT JOIN categories ON categories.id = subcategories.categoryId
                                        LEFT JOIN brand ON brand.id = products.brand
                                        LEFT JOIN product_rating_and_reviews AS product_ratings
                                                  ON product_ratings.product_id = products.id AND
                                                     product_ratings.rating IS NOT null
                                        LEFT JOIN product_rating_and_reviews AS product_reviews
                                                  ON product_reviews.product_id = products.id AND
                                                     product_reviews.review_title IS NOT null
                                   ${where}
                               GROUP BY products.id`;
                //console.log(query,'query');
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results;
                    }
                    // setCache('shikshak-admin-products-data', JSON.stringify(data))
                    resolve(data);
                })
            // }
        })
    }catch (e){
        console.log(e);
    }
}
export const actionToGetCategoriesApiCall =  (body) => {
    try {
        return new Promise(async function(resolve, reject) {
        // let seoReference = await getCache('shikshak-admin-category-data');
        // if(seoReference){
        //     resolve(JSON.parse(seoReference));
        // } else {
            let {condition} = body;

                let where = (condition) ? ` ${condition} ` : '';
                const query = `select categories.* from categories ${where}`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if(results?.length){
                        data = results;
                    }
                    // setCache('shikshak-admin-category-data', JSON.stringify(data))
                    resolve(data);
                })
            // }
        })
    }catch (e){
        console.log(e);
    }
}
export const actionToGetBrandsApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select brand.* from brand ${where}`;
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
export const actionToGetRangeTypeCategoriesApiCall = (body) => {
    try {
        return new Promise(async function(resolve, reject) {
            // let seoReference = await getCache('shikshak-admin-range-type-category-data');
            // if(seoReference){
            //     resolve(JSON.parse(seoReference));
            // } else {
                let {condition} = body;
                let where = (condition) ? ` ${condition} ` : '';
                const query = `select *
                               from range_type_category ${where}`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results;
                    }
                    // setCache('shikshak-admin-range-type-category-data', JSON.stringify(data))
                    resolve(data);
                })
            // }
    })
    }catch (e){
        console.log(e);
    }
}
export const actionToGetSubCategoriesApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select subcategories.*,categories.name as category from subcategories left join categories on categories.id = subcategories.categoryId ${where}`;
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
export const actionToGetSubChildCategoriesApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select subchildcategories.*,categories.name as category,subcategories.sub_name as subcategory,subcategories.categoryId as categoryId from subchildcategories left join subcategories
        on subcategories.id=subchildcategories.subcategoryId left join categories on categories.id = subcategories.categoryId ${where}`;
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
        const query = `select * from product_photos where productId = ${id}`;
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

export const actionToGetCartDataByProductAndUserIdApiCall = (body) => {
    let {productId,userId} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT * FROM carts WHERE carts.productId=${productId} AND carts.custId='${userId}' and carts.orderId is NULL`;
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
export const actionToGetAllCartCountDataByUserId = (body) => {
    let {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT SUM(carts.qty) as total_qty FROM carts WHERE carts.custId='${userId}' and carts.orderId is NULL group by custId`;
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


export const actionToGetUserCartDataByUserId = (body) => {
    let {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT carts.id as id, carts.qty as qty, carts.productId as productId, carts.custId as custId, products.name as name, products.photo as photo, products.price as price FROM carts left join products on products.id = carts.productId WHERE carts.custId='${userId}' and carts.orderId is NULL`;
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

export const actionDeleteProductFromCartByCartId = (body) => {
    let {cartId} = body;
    return new Promise(function(resolve, reject) {
        const query = `DELETE FROM carts WHERE carts.id='${cartId}'`;
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


export const actionUpdateProductQuantityOnCartByCartId = (body) => {
    let {cartId, qty} = body;
    return new Promise(function(resolve, reject) {
        const query = `UPDATE carts set carts.qty = '${qty}' WHERE carts.id='${cartId}'`;
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
export const actionToGetProductsDetailsApiCall = (body) => {
    let {id} = body;
    try {
        return new Promise(async function (resolve, reject) {
            // let seoReference = await getCache('shikshak-admin-products-detail-data-' + id);
            // if (seoReference) {
            //     resolve(JSON.parse(seoReference));
            // } else {
                const query = `SELECT JSON_OBJECT(
                                              'id', products.id,
                                              'name', products.name,
                                              'brand', products.brand,
                                              'status', products.status,
                                              'price', products.price,
                                              'photo', products.photo,
                                              'sortDesc', products.sortDesc,
                                              'avgRating', AVG(product_ratings.rating),
                                              'totalRating', COUNT(DISTINCT (product_ratings.id)),
                                              'totalReview', COUNT(DISTINCT (product_reviews.id)),
                                              'description', products.description,
                                              'photos',
                                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', product_photos.id, 'photo', product_photos.imgUrl))
                                               from product_photos
                                                        JOIN products as prod
                                               WHERE prod.id = product_photos.productId
                                                 AND prod.id = ${id}),
                                              'review_photos',
                                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', product_reviews.id, 'photos',
                                                                                product_reviews.review_photos))
                                               from product_rating_and_reviews AS product_reviews
                                                        JOIN products as prodr
                                               WHERE prodr.id = product_reviews.product_id
                                                 AND prodr.id = ${id}),
                                              'reviews', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', product_reviews.id,
                                                                                           'review_title',
                                                                                           product_reviews.review_title,
                                                                                           'review_description',
                                                                                           product_reviews.review_description,
                                                                                           'review_photos',
                                                                                           product_reviews.review_photos,
                                                                                           'review_location',
                                                                                           product_reviews.review_location,
                                                                                           'review_rating',
                                                                                           product_reviews.rating,
                                                                                           'review_created_at',
                                                                                           product_reviews.review_at,
                                                                                           'review_by',
                                                                                           review_user.name))
                                                          from product_rating_and_reviews AS product_reviews
                                                                   JOIN products as prodreview
                                                                   JOIN app_user AS review_user ON review_user.id = product_reviews.review_by
                                                          WHERE prodreview.id = product_reviews.product_id
                                                            AND prodreview.id = ${id}),
                                              'product_faqs',
                                              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', product_faqs.id, 'question',
                                                                                product_faqs.question, 'answer',
                                                                                product_faqs.answer, 'like_count',
                                                                                product_faqs.like_count,
                                                                                'dislike_count',
                                                                                product_faqs.dislike_count))
                                               from product_faqs AS product_faqs
                                                        JOIN products as productfq
                                               WHERE productfq.id = product_faqs.product_id
                                                 AND productfq.id = ${id}),
                                              'related_products', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                                'id', related_prod.id,
                                'photo', related_prod.photo,
                                'title', related_prod.name,
                                'price', related_prod.price,
                                'brand', related_prod.brand))
                                                                   from products as related_prod
                                                                            JOIN categories AS related_cat
                                                                   WHERE related_prod.categoryId = related_cat.id
                                                                     AND related_prod.id!=${id} AND related_prod.categoryId IN (SELECT categoryId FROM products AS pp WHERE id=${id}))
                        ) as productData
                               from products
                                        LEFT JOIN subchildcategories ON subchildcategories.id = products.childCategoryId
                                        LEFT JOIN subcategories ON subcategories.id = subchildcategories.subcategoryId
                                        LEFT JOIN categories ON categories.id = subcategories.categoryId
                                        LEFT JOIN brand ON brand.id = products.brand
                                        LEFT JOIN product_rating_and_reviews AS product_ratings
                                                  ON product_ratings.product_id = products.id AND
                                                     product_ratings.rating IS NOT null
                                        LEFT JOIN product_rating_and_reviews AS product_reviews
                                                  ON product_reviews.product_id = products.id AND
                                                     product_reviews.review_title IS NOT null
                               WHERE products.id = ${id}
                               GROUP BY products.id`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results[0].productData;
                    }
                    // setCache('shikshak-admin-products-detail-data-' + id, JSON.stringify(data));
                    resolve(data);
                })
            // }
        })
    }catch (e) {
        console.log('e',e)
    }
}


    export const actionGenerateOrderInOrderTable = (body) => {
        let {userId, totalAmount,dateTime,uniqueOrderNumber,cartIds} = body;
        try {
            return new Promise(function(resolve, reject) {
                //const query = `UPDATE carts set carts.qty = '${qty}' WHERE carts.id='${cartId}'`;
                const query = `INSERT INTO orders (custId,grandtotal,createdAt,number,cart_ids)
                       VALUES ('${userId}','${totalAmount}','${dateTime}','${uniqueOrderNumber}','${cartIds}')`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                    let data = [];
                    if(results?.insertId){
                        data = results.insertId;
                    }
                    // actionSaveCustomerAddresses(body, data);
                    resolve(data);
                })
            })
        }catch (e){
            return e;
        }
    }

export const createAndSavePaymentGatewayTransaction = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `INSERT INTO payment_gateway_transaction_log (order_id,payment_gateway_id,payment_gateway_transaction_order_id,response_create_order)
                       VALUES (${body?.db_order_id},${body?.payment_gateway_id},'${body?.id}','${JSON.stringify(body)}')`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.insertId){
                    data = results.insertId;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updatePaymentGatewayTransactionAfterPayment = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE payment_gateway_transaction_log set payment_gateway_payment_id='${body?.razorpay_payment_id}',payment_gateway_payment_id='${body?.razorpay_payment_id}',paid='1',payment_gateway_response='${JSON.stringify(body)}' where id='${body?.payment_gateway_transaction_log_id}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updatePaymentGatewayTransactionByTransactionIdAfterPayment = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE payment_gateway_transaction_log set paid='1',payment_gateway_response='${JSON.stringify(body)}' where payment_gateway_transaction_order_id='${body?.transactionId}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updateOrderIdInCartTable = (body) => {
    let {orderId,cartIds} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE carts set carts.orderId = '${orderId}' WHERE carts.id in(${cartIds.toString()})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = orderId;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const actionToGetUserSavedAddressDataByUserId = (body) => {
    let {userId} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT shipping_address.id AS shipping_address_id,shipping_address.fullname AS shipping_address_full_name,shipping_address.phone AS shipping_address_phone,
                                  shipping_address.address AS shipping_address_address,shipping_address.city AS shipping_address_city,shipping_address.states AS shipping_address_state,shipping_address.country AS shipping_address_country
                                   ,shipping_address.pincode AS shipping_address_pin_code,shipping_address.company_name AS shipping_address_company_name,shipping_address.gst_no AS shipping_address_gst_no,
                                  shipping_address.company_address AS shipping_address_company_address,shipping_address.is_default_address as default_shipping_address,
                                  billing_address.id AS billing_address_id,billing_address.fullname AS billing_address_full_name,billing_address.phone AS billing_address_phone,
                                  billing_address.address AS billing_address_address,billing_address.city AS billing_address_city,billing_address.states AS billing_address_state,billing_address.country AS billing_address_country
                                   ,billing_address.pincode AS billing_address_pin_code,billing_address.company_name AS billing_address_company_name,billing_address.gst_no AS billing_address_gst_no,
                                  billing_address.company_address AS billing_address_company_address,billing_address.is_default_address as default_billing_address
                           FROM orders
                                    JOIN order_address_relation AS oar ON orders.id=oar.order_id
                                    JOIN addresses AS shipping_address ON shipping_address.id=oar.shipping_address_id
                                    JOIN addresses AS billing_address ON billing_address.id=oar.billing_address_id
                           WHERE orders.custId='${userId}'
                           GROUP BY shipping_address.id,billing_address.id `;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}

export const actionToGetUserOrdersDataByUserId = (body) => {
    let {userId} = body?.userId;
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT  JSON_OBJECT(
                                           'id',ordmain.id,
                                           'status',ordmain.status,
                                            'payment_status', payments.payment_status,
                                           'order_number',ordmain.number,
                                           'netAmount',payments.net_amount,
                                           'discountAmount',payments.discount_amount,
                                           'discountCoupon',shopping_coupons.coupon_code,
                                           'discountRate',shopping_coupons.discount_percentage,
                                           'maximumDiscountAmount',shopping_coupons.maximum_discount,
                                           'couponInfoMessage',shopping_coupons.coupon_info_message,
                                           'paymentMethod',ordmain.paymentmethod,
                                           'payment_gateway_payment_id',pgtl.payment_gateway_payment_id,
                                           'payment_gateway_transaction_order_id',pgtl.payment_gateway_transaction_order_id,
                                           'direct_payment_transaction_id',dptl.id,
                                           'direct_payment_transaction_no',dptl.transaction_no,
                                           'direct_payment_transaction_is_approved',dptl.is_approved,
                                           'direct_payment_transaction_approved_rejected_at',dptl.approved_rejected_at,
                                           'direct_payment_attachment_path',dptl.attachment_path,
                                           'createdAt',ordmain.createdAt,
                                           'products', ( SELECT JSON_ARRAYAGG(JSON_OBJECT('id',products.id,'photo',products.photo,'name',products.name,'brand',products.brand,'qty',cart.qty,'unite_price',products.price)) FROM orders JOIN carts as cart on cart.orderId=orders.id JOIN products ON  products.id= cart.productId WHERE orders.id=ordmain.id )
                                       ) as orderData
                           from orders  AS ordmain
                                    JOIN payments ON payments.order_id=ordmain.id
                                    JOIN order_address_relation ON order_address_relation.order_id= ordmain.id
                                    JOIN carts as cart on cart.orderId = ordmain.id
                                    JOIN products ON products.id = cart.productId
                                    LEFT JOIN addresses AS shipping_address ON shipping_address.id= order_address_relation.shipping_address_id
                                    LEFT JOIN addresses AS billing_address ON billing_address.id= order_address_relation.billing_address_id
                                    LEFT JOIN direct_payment_transaction_log AS dptl ON ordmain.id=dptl.order_id
                                    LEFT JOIN payment_gateway_transaction_log AS pgtl ON ordmain.id=pgtl.order_id
                                    LEFT JOIN shopping_coupons ON shopping_coupons.id=payments.discount_coupon_id
                           where ordmain.custId='${userId}'
                           ORDER BY ordmain.id desc `;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.length){
                    results.map((row)=>{
                        data.push(row);
                    })
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}

export const actionToGetAllProductsDataByOrderId = (body) => {
    let {orderId} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT orders.id AS orders_id,products.id AS product_id,products.photo,products.name AS product_name,brand.name AS brand_name, cart.qty ,products.price AS unite_price
                           FROM orders
                                    JOIN carts AS cart ON cart.orderId=orders.id
                                    JOIN products ON products.id= cart.productId
                                    JOIN brand ON brand.id= products.brand
                           WHERE orders.id='${orderId}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.length){
                    data=results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}




    export const actionSaveCustomerAddresses = (body, orderId) => {
        let {billingAddress, billingCity, billingCompanyAddress, billingCompanyName, billingCountry, billingFullName, billingGstNo, billingMobileNo, billingPinCode, billingState,
            shippingAddress, shippingCity, shippingCompanyAddress, shippingCompanyName, shippingCountry, shippingFullName, shippingGstNo, shippingMobileNo,shippingPinCode, shippingState, userId, cartIds} = body.data;
        try {

            const columnArray = ['fullname', "phone","address", "orderId", "discrict", "city", "states", "area", "custId", "type"];
            let response = {};

            new Promise(function(resolve, reject) {
                const query = `INSERT INTO addresses (${columnArray.toString()})
                           VALUES ('${billingFullName}','${billingMobileNo}', '${orderId}', '${billingCompanyAddress}', '${billingCity}', '${billingState}', '${billingAddress}', '${userId}', 'billing')`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                })
            })


            if (shippingAddress !== '' && shippingCity !== ''){
                new Promise(function(resolve, reject) {
                    const query = `INSERT INTO addresses (${columnArray.toString()})
                               VALUES ('${shippingFullName}','${shippingMobileNo}', '${orderId}', '${shippingCompanyAddress}', '${shippingCity}', '${shippingState}', '${shippingAddress}', '${userId}', 'shipping')`;
                    pool.query(query, (error, results) => {
                        if (error) {
                            reject(query)
                        }
                    })
                })
            }

            new Promise(function(resolve, reject) {
                const query = `UPDATE carts set carts.orderId = '${orderId}' WHERE carts.id in(${cartIds.toString()})`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                })
            })


            return response;

        }catch (e){
            return e;
        }
    }

export const actionToDbTest = async () =>{
    return new Promise(async function(resolve, reject) {
        pool.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results)
        });
    })
}


export const actionGetOrderDetailsData = (body) => {
    let {orderId} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT  JSON_OBJECT(
                                           'id',ordmain.id,
                                           'status',ordmain.status,
                                           'paymentStatus',payments.payment_status,
                                           'order_number',ordmain.number,
                                           'netAmount',payments.net_amount,
                                           'discountAmount',payments.discount_amount,
                                           'discountCoupon',shopping_coupons.coupon_code,
                                           'discountRate',shopping_coupons.discount_percentage,
                                           'maximumDiscountAmount',shopping_coupons.maximum_discount,
                                           'couponInfoMessage',shopping_coupons.coupon_info_message,
                                           'paymentMethod',ordmain.paymentmethod,
                                           'shippingCharge',payments.shipping_charge,
                                            'payment_gateway_payment_id',pgtl.payment_gateway_payment_id,    
                                            'payment_gateway_transaction_order_id',pgtl.payment_gateway_transaction_order_id,
                                            'payment_gateway_id',pgateway.id,
                                            'payment_gateway_name',pgateway.name,
                                            'direct_payment_transaction_id',dptl.id,
                                           'direct_payment_attachment_path',dptl.attachment_path,
                                           'shiippingFullname', shipping_address.fullname,
                                           'shippingPhoneNo', shipping_address.phone,
                                           'shippingAddress', shipping_address.address,
                                           'shippingCity', shipping_address.city,
                                           'shippingStates', shipping_address.states,
                                           'shippingCountry', shipping_address.country,
                                           'shippingPincode', shipping_address.pincode,
                                           'shippingGstno', shipping_address.gst_no,
                                           'billingFullname', billing_address.fullname,
                                           'billingPhoneNo', billing_address.phone,
                                           'billingAddress', billing_address.address,
                                           'billingCity', billing_address.city,
                                           'billingStates', billing_address.states,
                                           'billingCountry', billing_address.country,
                                           'billingPincode', billing_address.pincode,
                                           'billingGstno', billing_address.gst_no,
                                           'createdAt',ordmain.createdAt,
                                           'user_email',app_user.email,
                                            'initial_order_email_send',ordmain.initial_order_email_send,
                                           'products', ( SELECT JSON_ARRAYAGG(JSON_OBJECT('id',products.id,'photo',products.photo,'name',products.name,'brand',brand.name,'qty',cart.qty,'unite_price',products.price)) 
                                                         FROM orders JOIN carts as cart on cart.orderId=orders.id JOIN products ON  products.id= cart.productId JOIN brand ON  brand.id= products.brand  WHERE orders.id=ordmain.id )
                                       ) as orderData
                           from orders  AS ordmain
                                    JOIN app_user ON ordmain.custId=app_user.id
                                    JOIN payments ON payments.order_id=ordmain.id
                                    JOIN order_address_relation ON order_address_relation.order_id= ordmain.id
                                    LEFT JOIN addresses AS shipping_address ON shipping_address.id= order_address_relation.shipping_address_id
                                    LEFT JOIN addresses AS billing_address ON billing_address.id= order_address_relation.billing_address_id
                                    LEFT JOIN direct_payment_transaction_log AS dptl ON ordmain.id=dptl.order_id
                                    LEFT JOIN payment_gateway_transaction_log AS pgtl ON ordmain.id=pgtl.order_id and pgtl.transaction_type='payment'
                                    LEFT JOIN payment_gateways AS pgateway ON pgateway.id=pgtl.payment_gateway_id
                                    LEFT JOIN shopping_coupons ON shopping_coupons.id=payments.discount_coupon_id
                           where ordmain.id='${orderId}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const actionToGetCouponDetailsByCoupon = async (coupon) =>{
        try {
            return new Promise(function(resolve, reject) {
                const query = `select * from shopping_coupons where shopping_coupons.coupon_code='${coupon}'`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(query)
                    }
                    let data = [];
                    if(results){
                        data = results;
                    }
                    resolve(data);
                })
            })
        }catch (e){
            return e;
        }
}
export const actionToGetAllOrdersData = () => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `SELECT  JSON_OBJECT(
                                           'id',ordmain.id,
                                           'status',ordmain.status,
                                           'payment_status', payments.payment_status,
                                           'order_number',ordmain.number,
                                           'netAmount',payments.net_amount,
                                           'discountAmount',payments.discount_amount,
                                           'discountCoupon',shopping_coupons.coupon_code,
                                           'discountRate',shopping_coupons.discount_percentage,
                                           'maximumDiscountAmount',shopping_coupons.maximum_discount,
                                           'couponInfoMessage',shopping_coupons.coupon_info_message,
                                           'paymentMethod',ordmain.paymentmethod,
                                           'payment_gateway_payment_id',pgtl.payment_gateway_payment_id,
                                           'payment_gateway_transaction_order_id',pgtl.payment_gateway_transaction_order_id,
                                           'direct_payment_transaction_id',dptl.id,
                                           'direct_payment_transaction_no',dptl.transaction_no,
                                           'direct_payment_transaction_is_approved',dptl.is_approved,
                                           'direct_payment_transaction_approved_rejected_at',dptl.approved_rejected_at,
                                           'direct_payment_attachment_path',dptl.attachment_path,
                                           'createdAt',ordmain.createdAt,
                                           'customer_name',app_user.name,
                                           'customer_email',app_user.email,
                                           'customer_mobile',app_user.mobile,
                                           'products', ( SELECT JSON_ARRAYAGG(JSON_OBJECT('id',products.id,'photo',products.photo,'name',products.name,'brand',products.brand,'qty',cart.qty,'unite_price',products.price)) FROM orders JOIN carts as cart on cart.orderId=orders.id JOIN products ON  products.id= cart.productId WHERE orders.id=ordmain.id )
                                       ) as orderData
                           from orders  AS ordmain
                                    JOIN payments ON payments.order_id=ordmain.id
                                    JOIN app_user ON app_user.id=ordmain.custId
                                    JOIN order_address_relation ON order_address_relation.order_id= ordmain.id
                                    LEFT JOIN addresses AS shipping_address ON shipping_address.id= order_address_relation.shipping_address_id
                                    LEFT JOIN addresses AS billing_address ON billing_address.id= order_address_relation.billing_address_id
                                    LEFT JOIN direct_payment_transaction_log AS dptl ON ordmain.id=dptl.order_id
                                    LEFT JOIN payment_gateway_transaction_log AS pgtl ON ordmain.id=pgtl.order_id
                                    LEFT JOIN shopping_coupons ON shopping_coupons.id=payments.discount_coupon_id
                           where ordmain.initial_order_email_send="1"   
                           ORDER BY ordmain.id desc`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.length){
                    results.map((row)=>{
                        data.push(row);
                    })
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const createAndSaveDirectPaymentTransaction = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `INSERT INTO direct_payment_transaction_log (order_id)
                       VALUES (${body?.db_order_id})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.insertId){
                    data = results.insertId;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updateDirectPaymentTransaction = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE direct_payment_transaction_log set direct_payment_transaction_log.attachment_path = '${body?.path}' WHERE direct_payment_transaction_log.order_id='${body?.id}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const checkDuplicateTransactionNo = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `select transaction_no from  direct_payment_transaction_log  WHERE direct_payment_transaction_log.order_id!='${body?.id}' and direct_payment_transaction_log.transaction_no='${body?.transactionNo}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const getPaymentAndCartIdsByPaymentGateWayTransactionLog = (body) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `select orders.id,orders.cart_ids from payment_gateway_transaction_log join orders on orders.id=payment_gateway_transaction_log.order_id where payment_gateway_transaction_log.payment_gateway_transaction_order_id='${body?.transactionId}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updateOrderIdOnCartTable = (body) => {
    let {id,cart_ids} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE carts set carts.orderId = '${id}' WHERE carts.id in(${cart_ids.toString()})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updatePaymentStatusOnPaymentTable = (body,status) => {
    let {id} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE payments set payments.payment_status = '${status}' WHERE payments.order_id in(${id})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updateInitialOrderEmailStatusOnOrderTable = (status,id) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE orders set orders.initial_order_email_send = '${status}' WHERE orders.id in(${id})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const actionToGetClassTypeCategoriesApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select * from class_range_category  ${where}`;
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
export const GetAllDiscountCoupons = () => {
    return new Promise(function(resolve, reject) {
        const query = ` SELECT shopping_coupons.*,COUNT(disTINCT(payments.id)) AS total_order_occure ,sum(payments.discount_amount) AS total_discount_provided FROM shopping_coupons
                         LEFT JOIN payments ON payments.discount_coupon_id = shopping_coupons.id
                        GROUP BY shopping_coupons.id`;
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
export const actionToResetDefaultAddress = (payload) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE addresses set addresses.is_default_address = '0' WHERE addresses.custId ='${payload.userId.toString()}'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const actionToUpdateDefaultDeliveryAddress = (payload) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE addresses set addresses.is_default_address = '1' WHERE addresses.id in(${payload.ids.toString()})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const updateOrderStatusOnOrderTable = (status,id) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE orders set orders.status = '${status}' WHERE orders.id in(${id})`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}
export const savePaymentGatewayTransactionAfterRefund = (orderId,paymentGatewayId,paymentGatewayTransactionPaymentId,transactionType,payStatus,paymentGatewayResponse) => {
    try {
        return new Promise(function(resolve, reject) {
            const query = `INSERT INTO payment_gateway_transaction_log (order_id,payment_gateway_id,payment_gateway_payment_id,transaction_type,paid,payment_gateway_response)
                       VALUES (${orderId},${paymentGatewayId},'${paymentGatewayTransactionPaymentId}','${transactionType}','${payStatus}','${JSON.stringify(paymentGatewayResponse)}')`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(query)
                }
                let data = [];
                if(results?.insertId){
                    data = results.insertId;
                }
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}

export const actionToGetProductReviewProductAndUserIdApiCall = (body) => {
    try {
        let {productId,userId} = body;
        return new Promise(function(resolve, reject) {
            const query = `SELECT * FROM product_rating_and_reviews WHERE product_rating_and_reviews.product_id=${productId} AND product_rating_and_reviews.review_by='${userId}'`;
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

export const actionToGetFaqsApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `SELECT product_faqs.*, products.*, products.id as productId, product_faqs.id as id FROM product_faqs
                                LEFT JOIN products ON products.id = product_faqs.product_id
                                ${where} GROUP BY product_faqs.id`;

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
}