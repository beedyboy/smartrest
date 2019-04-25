/**
 * Created by wawooh on 2/7/19.
 */
import * as actionTypes from '../actions/authType';
import {updateObject} from  '../utility';

const initialState= {
    token: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    position: '',
    user: '',
    fullname: '',
    email: '',
    shop:''
}

const authStart=(state, action)=>{
    return updateObject(state, {
        user: '',
        fullname: '',
        email: '',
        shop:'',
        position: '',
        isAuthenticated: false, 
        error:null,
        loading:true
    })
}

const authSuccess=(state, action)=>{
    // console.log(action)
    const position = action.data.record.position
    return updateObject(state, {
        token: action.data.record.token,
        position: position,
        user: action.data.record.username,
        fullname: action.data.record.fullname,
        email: action.data.record.acc_email,
        shop: action.data.record.shopId,
        isAuthenticated: true,
        error:null,
        loading:false,
    })
}

const authFail=(state, action)=>{
    return updateObject(state, {
        error:action.error,
        loading:false,
        user:'',
        fullname:'',
        email:'',
        position: '', 
        isAuthenticated: false,
        shop:''
    })
}

const authLogout=(state, action)=>{
    return updateObject(state, {
        token: null,
        position: '', 
        user:'',
        fullname:'',
        email:'',
        loading:false, 
        isAuthenticated: false,
        shop:''
    })
}

const authReducer = (state=initialState, action)=>{
    switch (action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        default:
            return state;
    }
}

export default authReducer;