import { combineReducers } from 'redux';
import productReducer from "./productReducer";
import {webSettingReducer} from "./webSettingReducer";
const rootReducer = combineReducers({
    product: productReducer,
    webSetting: webSettingReducer
    // Add other reducers here
});

export default rootReducer;
