
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'
export const createProduct = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'product/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
               dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchBar());
            dispatch(fetchLocal());
            dispatch(fetchContinental());
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
        //make async call to database
         axios.post(serverUrl + 'product/update/',{
           ...data,
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
               dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchBar());
            dispatch(fetchLocal());
            dispatch(fetchContinental());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchLocal = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/getDepartmentProducts',{
        params : {
            shopId: shopId(),
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
            shopId: shopId(),
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
            shopId: shopId(),
            kitchen:'Bar'
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_BAR', res});
        })

    }
}

export const fetchAllProduct = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'product/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_ALL_PRODUCT', res});
        })

    }
}


export const createKitchen = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'kitchen/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
               dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchKitchen());
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

export const updateKitchen = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'kitchen/update/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchKitchen());
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

export const fetchKitchen = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'kitchen/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_KITCHEN', res});
        })

    }
}



export const createCategory = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'category/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
               dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchCategory());
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

export const updateCategory = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'category/update/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchCategory());
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

export const fetchCategory = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'category/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
          //  console.log(res)
        dispatch({type: 'FETCH_KITCHEN_CATEGORY', res});
        })

    }
}


export const createMenu = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'menu/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchMenu());
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

export const fetchMenu = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'menu/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_MENU', res});
        })

    }
}

export const updateMenu = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'menu/update/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchMenu());
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

export const createPurchases = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'purchase/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchPurchases());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const updatePurchases = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'purchase/update/',{
           ...data,
             token:token()
        })
        .then(res => {
           if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchPurchases());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchPurchases = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'purchase/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_PURCHASES', res});
        })

    }
}



export const createNewAllocation = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'acquisition/save/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
                  dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
               dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const updateAllocation = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'acquisition/update/',{
           ...data,
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
                  dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchAllocation = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'acquisition/list',{
        params : {
            shopId: shopId()
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
            shopId: shopId(),
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
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(fetchAllocation());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}
