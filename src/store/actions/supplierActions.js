
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createSupplier = (supplier) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'supplier/save/',{
           ...supplier,
           shopId: shopId()
        })
         .then(res => {
       if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchSupplier());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}

export const fetchSupplier = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'supplier/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SUPPLIER', res});
        })

    }
}


export const updateSupplier = (supplier) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'supplier/update/',{
           ...supplier,
           shopId: shopId()
        })
        .then(res => {
       if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchSupplier());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })
    }
}

