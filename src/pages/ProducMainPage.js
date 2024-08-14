import {Route, Routes} from "react-router-dom";
import Product from "./Product";
import ProductOverviewCurriculum from "./ProductOverviewCurriculum";

const ProductMainPage =()=> {
    return(
        <Routes>
            <Route exact path={""} element={<Product/>} />
            <Route exact path={"/:cat_slug/:sub_cat_slug/:product_slug/*"} element={<ProductOverviewCurriculum />} />
        </Routes>
    )
}
export default ProductMainPage;