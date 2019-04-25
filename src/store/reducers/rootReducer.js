import authReducer from './authReducer'
import userReducer from './userReducer' 
import hallReducer from './hallReducer'
import supplierReducer from './supplierReducer'
import inventoryReducer from './inventoryReducer'
import posReducer from './posReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    user: userReducer,
    hall: hallReducer,
    supplier: supplierReducer,
    inventory: inventoryReducer,
    pos: posReducer
});

export default rootReducer;
