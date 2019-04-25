
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'

export const addToCart = (productId) => {
    return (dispatch, getState) => {
        //make async call to database
       const invoice = 'invoice'
         axios.post(serverUrl + 'pos/save/',{
          productId:productId,
          invoice:invoice,
          shopId: shopId
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(getCartItem());
                dispatch(getCartTotal());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}


export const fetchWaiters = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchWaiters',{
        params : {
            shopId:shopId
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_WAITERS', res});
        })

    }
}

export const fetchMenu = (value) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchMenu',{
        params : {
            shopId:shopId,
            value:value
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_MENU', res});
        })

    }
}

export const getCartItem = () => {
    return (dispatch) => {
         const invoice = 'invoice'
       axios.get( serverUrl + 'pos/getCartItem',{
        params : {
            shopId:shopId,
            invoice:invoice
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_CART_ITEM', res});
        })

    }
}

export const getCartTotal = () => {
    return (dispatch) => {
         const invoice = 'invoice'
       axios.get( serverUrl + 'pos/getCartTotal',{
        params : {
            shopId:shopId,
            invoice:invoice
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_CART_TOTAL', res});
        })

    }
}

export const updateAllocation = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'acquisition/update/',{
           ...data,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                     dispatch({type: 'SAVE_SUCCESS', res});
                // dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}
