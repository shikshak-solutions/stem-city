import {Route, Routes, useParams} from "react-router-dom";
import ProductOverview from "./ProductOverview";
import FlipBook from "./FlipBook";
import {useEffectOnce} from "../redux/hooks/useEffectOnce";
import {actionToGetProductsDetailsApiCall} from "../redux/action";
import {useDispatch} from "react-redux";

const ProductOverviewCurriculum =()=> {
    const { cat_slug,sub_cat_slug,product_slug } = useParams();
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetProductsDetailsApiCall({cat_slug:cat_slug,sub_cat_slug:sub_cat_slug,product_slug:product_slug}));
    });
    return(<Routes>
            <Route exact path={""} element={<ProductOverview />} />
            <Route exact path={"/curriculum"} element={<FlipBook />} />
        </Routes>
    )
}
export default ProductOverviewCurriculum;