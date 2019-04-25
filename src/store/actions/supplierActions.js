
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createSupplier = (supplier) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'supplier/save/',{
           ...supplier,
           shopId: shopId
        })
         .then(res => {
             console.log(res)
            dispatch(fetchSupplier());
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })


    }
}

export const fetchSupplier = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'supplier/list',{
        params : {
            shopId:shopId
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SUPPLIER', res});
        })

    }
}
