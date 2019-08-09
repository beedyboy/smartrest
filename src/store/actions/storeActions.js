
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'
 
  

export const askWareHouse = (data) => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'store/askWareHouse/',{
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
               dispatch(fetchStoreItems());
               dispatch(fetchStoreUsable());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const updateStoreItem = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'store/updateStoreItem/',{
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
               dispatch(fetchStoreItems());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchStoreItems = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'store/receivedList',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_RECEIVED_STORE_ITEMS', res});
        })

    }
}

export const fetchStoreUsable = () => {
    return (dispatch) => {
        axios.get(serverUrl + 'store/storeUsable', {
            params: {
                shopId: shopId()
            }
        })
            .then(res => {
                // console.log(res)
                dispatch({ type: 'FETCH_STORE_USABLE', res });
            })

    }
}

export const fetchStockList = () => {
    return (dispatch) => {
        axios.get(serverUrl + 'stock/stockList', {
            params: {
                shopId: shopId()
            }
        })
            .then(res => {
                // console.log(res)
                dispatch({ type: 'FETCH_STORE_LIST', res });
            })

    }
}



export const saveStock = (data) => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'stock/saveStock/',{
           ...data,
           shopId: shopId(),
             token:token()
        })
         .then(res => {
               dispatch(fetchStoreUsable());
           if(res.data.status === "error"){
                 dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});
           }
           else{
                    dispatch({type: 'SAVE_SUCCESS', res});
               dispatch({ type: 'CREATE_FORM', res });
               dispatch(fetchStoreItems());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}


export const linkerStockList = () => {
    return (dispatch) => {
        axios.get(serverUrl + 'supervisor/linkerStockList', {
            params: {
                shopId: shopId()
            }
        })
            .then(res => {
                // console.log(res)
                dispatch({ type: 'FETCH_LINKER_LIST', res });
            })

    }
}


export const requestRefill = (id,  qty) => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'supervisor/requestRefill/', {
            id:id, 
             qty:qty,
            shopId: shopId(),
            token: token()
        })
            .then(res => {
                dispatch(fetchStoreUsable());
                if (res.data.status === "error") {
                    dispatch({ type: 'CREATE_FORM_ERROR', res });
                    dispatch({ type: 'SAVE_ERROR', res });
                }
                else {
                    dispatch({ type: 'SAVE_SUCCESS', res });
                    dispatch({ type: 'CREATE_FORM', res });
                    dispatch(fetchStoreItems());
                }
            }).catch((err) => {
                dispatch({ type: 'CREATE_FORM_ERROR', err });
                dispatch({ type: 'SAVE_ERROR', err });
            })


    }
}

export const stockRequest = () => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'supervisor/stockRequest/', {  
            shopId: shopId(),
            token: token()
        })
            .then(res => {
                dispatch(fetchStoreUsable());
                if (res.data.status === "error") {
                    dispatch({ type: 'CREATE_FORM_ERROR', res });
                    dispatch({ type: 'SAVE_ERROR', res });
                }
                else {
                    dispatch({ type: 'SAVE_SUCCESS', res });
                    dispatch({ type: 'CREATE_FORM', res });

                    dispatch({ type: 'FETCH_REQUEST_LIST', res });
                }
            }).catch((err) => {
                dispatch({ type: 'CREATE_FORM_ERROR', err });
                dispatch({ type: 'SAVE_ERROR', err });
            })


    }
}





export const stockRequestProcess = (data) => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'stock/stockRequestProcess/', {
            ...data,
            shopId: shopId(),
            token: token()
        })
            .then(res => {
                dispatch(fetchStoreUsable());
                if (res.data.status === "error") {
                    dispatch({ type: 'CREATE_FORM_ERROR', res });
                    dispatch({ type: 'SAVE_ERROR', res });
                }
                else {
                    dispatch({ type: 'SAVE_SUCCESS', res });
                    dispatch({ type: 'CREATE_FORM', res });
                    dispatch(stockRequest());
                }
            }).catch((err) => {
                dispatch({ type: 'CREATE_FORM_ERROR', err });
                dispatch({ type: 'SAVE_ERROR', err });
            })


    }
}



export const storeRequest = () => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'purchase/storeRequest/', {
            shopId: shopId(),
            token: token()
        })
            .then(res => {
                dispatch(fetchStoreUsable());
                if (res.data.status === "error") {
                    dispatch({ type: 'CREATE_FORM_ERROR', res });
                    dispatch({ type: 'SAVE_ERROR', res });
                }
                else {
                    dispatch({ type: 'SAVE_SUCCESS', res });
                    dispatch({ type: 'CREATE_FORM', res });

                    dispatch({ type: 'FETCH_STORE_REQUEST_LIST', res });
                }
            }).catch((err) => {
                dispatch({ type: 'CREATE_FORM_ERROR', err });
                dispatch({ type: 'SAVE_ERROR', err });
            })


    }
}


export const storeRequestProcess = (data) => {
    return (dispatch, getState) => {
        //make async call to database
        axios.post(serverUrl + 'purchase/storeRequestProcess/', {
            ...data,
            shopId: shopId(),
            token: token()
        })
            .then(res => {
                dispatch(storeRequest());
                if (res.data.status === "error") {
                    dispatch({ type: 'CREATE_FORM_ERROR', res });
                    dispatch({ type: 'SAVE_ERROR', res });
                }
                else {
                    dispatch({ type: 'SAVE_SUCCESS', res });
                    dispatch({ type: 'CREATE_FORM', res });
                    dispatch(stockRequest());
                }
            }).catch((err) => {
                dispatch({ type: 'CREATE_FORM_ERROR', err });
                dispatch({ type: 'SAVE_ERROR', err });
            })


    }
}
