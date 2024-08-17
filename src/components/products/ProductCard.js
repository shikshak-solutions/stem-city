// import React from "react";
// import Button from "../shared/Button";
// import {Link} from "react-router-dom";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons/faIndianRupeeSign";
// import {useSelector} from "react-redux";
//
// const ProductCard = ({ data }) => {
//     const ProductDetailData = useSelector((state) => state.product.ProductDetailData);
//
//     return (
//         <div className="mb-10">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
//                 {data.map((data) => (
//                     <div
//                         data-aos="fade-up"
//                         data-aos-delay={data.aosDelay}
//                         className="group"
//                         key={data.id}
//                     >
//                         <Link to={`/products/${data.category_slug}/${data.sub_category_slug}/${data.slug}`}>
//                         <div className="relative">
//                             <img
//                                 src={data.photo}
//                                 alt=""
//                                 className="h-[180px] w-[260px] object-cover rounded-md"
//                             />
//                             <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
//
//                                 <Button
//                                     text={"View Product"}
//                                     bgColor={"bg-primary"}
//                                     textColor={"text-white"}
//                                 />
//                             </div>
//                         </div>
//                         <div className="leading-7">
//                             <h2 className="font-semibold">{data.name}</h2>
//                             <div className='display-flex'>
//                                 <div className='productdetails-right-price-old'><FontAwesomeIcon icon={faIndianRupeeSign}/> {data.sale_price}</div>
//                                 <div className='productdetails-right-price-new'><FontAwesomeIcon icon={faIndianRupeeSign}/> {
//                                     (ProductDetailData.discount_amount_type === 'percentage' &&
//                                         ProductDetailData.sale_price*ProductDetailData.discount_percentage*0.01 < ProductDetailData.discount_maximum_discount)
//                                         ? ProductDetailData.sale_price *(100-ProductDetailData.discount_percentage)*0.01 : ProductDetailData.sale_price-ProductDetailData.discount_maximum_discount }
//                                 </div>
//                             </div>
//                         </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default ProductCard;

import React from "react";
import Button from "../shared/Button";
import {Link} from "react-router-dom";

const ProductCard = ({ data }) => {
    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                {data.map((data) => (
                    <div
                        data-aos="fade-up"
                        data-aos-delay={data.aosDelay}
                        className="group"
                        key={data.id}
                    >
                        <div className="relative">
                            <img
                                src={data.img}
                                alt=""
                                className="h-[180px] w-[260px] object-cover rounded-md"
                            />
                            <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                                <Link to={`/product/${data.id}`}>
                                    <Button
                                        text={"View Product"}
                                        bgColor={"bg-primary"}
                                        textColor={"text-white"}
                                    /></Link>
                            </div>
                        </div>
                        <div className="leading-7">
                            <h2 className="font-semibold">{data.title}</h2>
                            <h2 className="font-bold">Rs.{data.price}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
