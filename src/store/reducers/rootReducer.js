import authReducer from './authReducer'
import userReducer from './userReducer' 
import hallReducer from './hallReducer'
import supplierReducer from './supplierReducer'
import inventoryReducer from './inventoryReducer'
import posReducer from './posReducer'
import dashboardReducer from './dashboardReducer'
import shopReducer from './shopReducer'
import storeReducer from './storeReducer'
import reportReducer from './reportReducer'
import productReducer from './productReducer'
import formReducer from './formReducer'
import settingsReducer from './settingsReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    user: userReducer,
    hall: hallReducer,
    supplier: supplierReducer,
    inventory: inventoryReducer,
    product:productReducer,
    pos: posReducer,
    dashboard: dashboardReducer,
    shop:shopReducer,
    report:reportReducer,
    stores:storeReducer,
    form:formReducer,
    setting:settingsReducer
});

export default rootReducer;
