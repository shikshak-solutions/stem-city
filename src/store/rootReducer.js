import { combineReducers } from "redux";
import {webSettingReducer} from "./reducer/webSettingReducer.js";
import {inventoryReducer} from "./reducer/inventoryReducer.js";




const rootReducer = combineReducers({
    webSetting: webSettingReducer,
    inventory: inventoryReducer
});

export default rootReducer
