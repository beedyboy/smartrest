
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createUser = (user) => {
    return (dispatch, getState) => { 
        // console.log(serverUrl)
        //make async call to database
         axios.post(serverUrl + 'user/save/',{
           ...user,
           shopId: shopId
        })
         .then(res => {
             // console.log(res)
            dispatch(fetchUsers());    
        // dispatch({type: 'FETCH_USER'}); 
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })
        // dispatch({type: 'CREATE_USER', user}); 

    }
}
export const fetchUsers = () => {
    return (dispatch) => {
        // console.log('called')
       // make async call to database
       axios.get( serverUrl + 'user/list')
         .then(res => {
             
        dispatch({type: 'FETCH_USER', res}); 
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })

    }
}
