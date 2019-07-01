import authReducer from './authReducer'
import userReducer from './userReducer' 
import hallReducer from './hallReducer'
import supplierReducer from './supplierReducer'
import inventoryReducer from './inventoryReducer'
import posReducer from './posReducer'
import dashboardReducer from './dashboardReducer'
import shopReducer from './shopReducer'
import reportReducer from './reportReducer'
import formReducer from './formReducer'
import settingsReducer from './settingsReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    user: userReducer,
    hall: hallReducer,
    supplier: supplierReducer,
    inventory: inventoryReducer,
    pos: posReducer,
    dashboard: dashboardReducer,
    shop:shopReducer,
    report:reportReducer,
    form:formReducer,
    setting:settingsReducer
});

export default rootReducer;
