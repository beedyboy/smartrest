
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createUser = (user) => {
    return (dispatch, getState) => { 
        // console.log(serverUrl)
        //make async call to database
         axios.post(serverUrl + 'user/save/',{
           ...user,
           shopId: shopId()
        })
         .then(res => {
             // console.log(res)
             if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchUsers());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })
    }
}
export const fetchUsers = () => {
    return (dispatch) => {
       // make async call to database
       axios.get( serverUrl + 'user/list',{
           params : {
            shopId: shopId()
          }
       })

           .then(res => {
             
        dispatch({type: 'FETCH_USER', res}); 
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })

    }
}

export const updateUser = (user) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'user/update/',{
           ...user,
           shopId: shopId()
        })
         .then(res => {
             // console.log(res)
            if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchUsers());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })
    }
}

export const logUserOut = (id) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'user/logUserOut/',{
           id:id,
           shopId: shopId()
        })
         .then(res => {
            if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchUsers());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })
    }
}

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'user/destroy/',{
           id:id,
           shopId: shopId()
        })
         .then(res => {
            if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchUsers());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })
    }
}
