
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createShop = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'shop/save/',{
           ...data
        })
         .then(res => {
             // console.log(res)
             if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchShop());
           }

        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchShop = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'shop/list')
         .then(res => {
        dispatch({type: 'FETCH_SHOP', res});
        })

    }
}

export const getShopDetails = (invoice) => {
    return (dispatch) => {
       axios.get( serverUrl + 'shop/getShopDetails',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SHOP_DETAILS', res});
        })

    }
}
