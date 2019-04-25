
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'

export const createProduct = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'product/save/',{
           ...data,
           shopId: shopId,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchBar());
            dispatch(fetchLocal());
            dispatch(fetchContinental());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}

export const updateProduct = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'product/update/',{
           ...data,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                     dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchBar());
            dispatch(fetchLocal());
            dispatch(fetchContinental());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}

export const fetchLocal = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/getDepartmentProducts',{
        params : {
            shopId:shopId,
            kitchen:'Local'
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_LOCAL', res});
        })

    }
}

export const fetchContinental = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/getDepartmentProducts',{
        params : {
            shopId:shopId,
            kitchen:'Continental'
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_CONTINENTAL', res});
        })

    }
}

export const fetchBar = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/getDepartmentProducts',{
        params : {
            shopId:shopId,
            kitchen:'Bar'
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_BAR', res});
        })

    }
}


export const createPurchases = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'purchase/save/',{
           ...data,
           shopId: shopId,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchPurchases());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}

export const updatePurchases = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'purchase/update/',{
           ...data,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                     dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchPurchases());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}

export const fetchPurchases = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'purchase/list',{
        params : {
            shopId:shopId
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_PURCHASES', res});
        })

    }
}



export const createNewAllocation = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'acquisition/save/',{
           ...data,
           shopId: shopId,
             token:token
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
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
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}

export const fetchAllocation = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'acquisition/list',{
        params : {
            shopId:shopId
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_ALLOCATION', res});
        })

    }
}


export const getProductByKitchen = (kitchen) => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/getProductByKitchen',{
        params : {
            shopId:shopId,
            kitchen:kitchen
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_PRODUCT_BY_KITCHEN', res});
        })

    }
}


export const updateFinishedProduct = (data) => {
    // console.log(data)
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'acquisition/updateFinishedProduct/',{
           ...data,
             token:token
        })
         .then(res => {
             // console.log(res)
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_PRODUCT_ERROR', res});
           }
           else{
                     dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_PRODUCT_ERROR', err});
        })


    }
}
