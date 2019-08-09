
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'
  
export const createProduct = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'product/save/',{
           ...data,
           token: token(),
           shopId: shopId()
        })
         .then(res => {

           if(res.data.status === "success"){
               dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchProduct());
           }
           else {
                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
        }).catch((err) => {
              dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const updateProduct = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'product/update/',{
           ...data,
           shopId: shopId()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchProduct());
           }
           else {
                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
        }).catch((err) => {
              dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchProduct = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_PRODUCT', res});
        })

    }
}


 