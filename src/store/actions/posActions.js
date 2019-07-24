import React from 'react'
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token, invoice, position} from '../utility'
import { Redirect } from 'react-router-dom';         

export const addToCart = (menuId) => {
    return (dispatch, getState) => {
        //make async call to database
         const invoice = localStorage.getItem('receiptNumber')
         axios.post(serverUrl + 'pos/save/',{
          menuId:menuId,
          invoice:invoice,
          shopId: shopId()
        })
         .then(res => {
           if(res.data.status === "error"){
                 dispatch({type: 'SAVE_ERROR', res});
           }
           else if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(getCartItem());
                dispatch(getCartTotal());
           }
        }).catch((err) => {
             console.log(err)
             dispatch({type: 'SAVE_ERROR', err});
        })


    }
}
export const addBaseToCart = (localOrder,localQty) => {
    return (dispatch, getState) => {
        //make async call to database
         const invoice = localStorage.getItem('receiptNumber')
         axios.post(serverUrl + 'pos/saveBase/',{
          localOrder:localOrder,
          localQty:localQty,
          invoice:invoice,
          shopId: shopId()
        })
         .then(res => {
          //  console.log(res)
           if(res.data.status === "error"){
                 dispatch({type: 'SAVE_ERROR', res});
           }
           else if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(getCartItem());
                dispatch(getCartTotal());
           }
        }).catch((err) => {
             console.log(err)
             dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const fetchWaiters = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchWaiters',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_WAITERS', res});
        })

    }
}

export const fetchMenu = (id,value) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchMenu',{
        params : {
            shopId: shopId(),
            id:id,
            value:value
          }
       })
         .then(res => {
        // console.log(res)
        dispatch({type: 'FETCH_MENU', res});
        })

    }
}

export const fetchOrder = (value) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchOrder',{
        params : {
            shopId: shopId(),
            value:value
          }
       })
         .then(res => {
        // console.log(res)
        dispatch({type: 'FETCH_ORDER', res});
        })

    }
}

export const getCartItem = () => {
    return (dispatch) => {
         const invoice = localStorage.getItem('receiptNumber')
       axios.get( serverUrl + 'pos/getCartItem',{
        params : {
            shopId: shopId(),
            invoice:invoice
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_CART_ITEM', res});
        })

    }
}

export const getPlate = (plate,invoice) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/getPlate',{
        params : {
            shopId: shopId(),
            plate:plate,      
            invoice:invoice      
              }
       })
         .then(res => {
            //  console.log(res)
        dispatch({type: 'FETCH_PLATE_ITEM', res});
        })

    }
}

export const editPlateItem = (plate) => {
    return (dispatch) => {
        
       axios.get( serverUrl + 'pos/editPlateItem',{
        params : {
            shopId: shopId(),
            invoice:invoice(),
            plate:plate
          }
       })
         .then(res => {
        dispatch({type: 'PLATE_ITEM_DATA', res});
        })

    }
}

export const getCartTotal = () => {
    return (dispatch) => {
         const invoice = localStorage.getItem('receiptNumber')
       axios.get( serverUrl + 'pos/getCartTotal',{
        params : {
            shopId: shopId(),
            invoice:invoice
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_CART_TOTAL', res});
        })

    }
}

export const saveOrder = (data) => {
    return (dispatch, getState) => {
        // console.log(data)
        //make async call to database
           const invoice = localStorage.getItem('receiptNumber')
         axios.post(serverUrl + 'pos/saveOrder/',{
           ...data,
             token:token(),
            shopId: shopId(),
            invoice:invoice
        })
         .then(res => {
            //  console.log(res)
           if(res.data.status === "success"){

                     dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(receiptNumber());
                dispatch(fetchBasket());
                if(data.segment === "edit"){ 
                    // eslint-disable-next-line no-unused-expressions
                    <Redirect to = '/pos' />

                }

           }
           else {
                 dispatch({type: 'SAVE_ERROR', res});
                 console.log(res)
           }
        }).catch((err) => {
             dispatch({type: 'SAVE_ERROR', err});
                 console.log(err)
        })


    }
}

export const fetchSavedInvoice = () => {
    return  (dispatch) => {
       axios.get( serverUrl + 'pos/fetchSavedInvoice',{
         params : {
            shopId: shopId(),
            invoice:invoice()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_SAVED_ORDER', res});
        }).catch((error) => {
           console.log(error);
       })

    }
}


export const fetchBasket = () => {
    return  (dispatch) => {
       axios.get( serverUrl + 'pos/fetchBasket',{
        params : {
             token: token(),
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_BASKET', res});
        }).catch((error) => {
           console.log(error);
       })

    }
}

export const fetchKitchenBasket = () => {
    return  (dispatch) => {
       axios.get( serverUrl + 'pos/fetchKitchenBasket',{
        params : {
             token: token(),
            shopId: shopId()
          }
       })
         .then(res => {
            //  console.log(res)
        dispatch({type: 'FETCH_KITCHEN_BASKET', res});
        }).catch((error) => {
           console.log(error);
       })

    }
}

export const emptyCart = () => {
    return (dispatch) => {
           const invoice = localStorage.getItem('receiptNumber')
       axios.get( serverUrl + 'pos/emptyCart',{
        params : {
             invoice:invoice,
            shopId: shopId()
          }
       })
         .then(res => {
              if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
               dispatch(getCartItem());
                dispatch(getCartTotal());
           }
           else{

               dispatch({type: 'SAVE_ERROR', res});
           }

        })

    }
}

export const deleteCartItem = (id, ord_type, plate,invoice) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/deleteCartItem',{
        params : {
             id:id,
             ord_type:ord_type,
             plate:plate,
             invoice: invoice,
            shopId: shopId()
          }
       })
         .then(res => {
              if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
               dispatch(getCartItem());
                dispatch(getCartTotal());
           }
           else{

              dispatch({type: 'SAVE_ERROR', res});

           }

        })

    }
}

export const quantityChange = (data) => {
    return (dispatch) => {
           const invoice = localStorage.getItem('receiptNumber')
       axios.get( serverUrl + 'pos/quantityChange',{
        params : {
            ...data,
            shopId: shopId(),
            invoice:invoice
          }
       })
         .then(res => {
              if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
               dispatch(getCartItem());
                dispatch(getCartTotal());
           }
           else{

                dispatch({type: 'CREATE_PRODUCT_ERROR', res});

           }
 
        })

    }
}

export const localPlusMinus = (plate, invoice) => {
    return (dispatch) => { 
       axios.get( serverUrl + 'pos/localPlusMinus',{
        params : {
            plate: plate,
              invoice: invoice, 
            shopId: shopId()
          }
       })
         .then(res => {
           console.log("localPlusMinus", res)
              if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
               dispatch(getCartItem());
                dispatch(getCartTotal());
           }
           else{

                dispatch({type: 'CREATE_PRODUCT_ERROR', res});

           }
 
        })

    }
}
export const fetchReceivable = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchReceivable',{
        params : {
             token:token(),
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_RECEIVABLE', res});
        })

    }
}

export const fetchKitchenReceivable = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchKitchenReceivable',{
        params : {
          position:position(),
            shopId: shopId()
          }
       })
         .then(res => {
          //  console.log(res)
        dispatch({type: 'FETCH_KITCHEN_RECEIVABLE', res});
        })

    }
}


export const fetchOrderByInvoice = (invoice) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/getCartItem',{
        params : {
             invoice:invoice,
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_ORDER_INVOICE', res});
        })

    }
}

export const getInvoiceDetails = (invoice) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/fetchSavedInvoice',{
        params : {
             invoice:invoice,
            shopId: shopId()
          }
       })
         .then(res => {

            //  console.log(res)
        dispatch({type: 'FETCH_INVOICE_DETAILS', res});
        })

    }
}


export const mergeOrder = (data) => {
    return (dispatch) => {
       axios.post( serverUrl + 'pos/mergeInvoice',{
           ...data,
           shopId:shopId(),
           token:token()
       })
         .then(res => {
         if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});

                dispatch(fetchReceivable());
           }

        })

    }
}

export const cancelOrder = (id,invoice) => {
  return (dispatch) => {
     axios.get( serverUrl + 'pos/cancelOrder',{
      params : {
          id:id,
           invoice:invoice,
          shopId: shopId()
        }
     })
       .then(res => {

          //  console.log(res)
           if(res.data.status === "success"){
            dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchReceivable());

        }
        else {
                dispatch({type: 'SAVE_ERROR', res});
          }
      
      })

  }
}

export const kitchenApprove = (menu_id,accept,invoice,base) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/kitchenApprove',{
        params : {
          menu_id:menu_id,
            base:base,
            accept:accept,
            invoice:invoice,
            token:token(),
            shopId: shopId()
          }
       })
         .then(res => {
          //  console.log(res)
             if(res.data.status === "success"){
               dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchKitchenReceivable());
                dispatch(fetchKitchenBasket());

           }
           else {
                   dispatch({type: 'SAVE_ERROR', res});
             }

        })
    }
}


export const payNow = (id) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/payNow',{
        params : {
            id:id,
            token:token()
          }
       })
         .then(res => {
        dispatch(fetchReceivable());
        })

    }
}

export const payAllBalances = (kitchen) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/payAllBalances',{
        params : {
            kitchen:kitchen,
            shopId:shopId(),
            token:token()
          }
       })
         .then(res => {
             if(res.data.status === "success"){
               dispatch({type: 'SAVE_SUCCESS', res});
                dispatch(fetchReceivable());

           }
           else {
                   dispatch({type: 'SAVE_ERROR', res});
             }

        })

    }
}

export const receiptNumber=()=> {
 return (dispatch) => {
         // const invoice = Math.floor(Math.random()*89999+10000)
        var array = new Uint32Array(10);
        window.crypto.getRandomValues(array);

        var number =''
        for (var i = 0; i < array.length; i++) {
            number = array[i]
        }
         dispatch({type: 'CREATE_RECEIPT', number});
        // console.log('invoice', number)
            dispatch(getCartItem());
                dispatch(getCartTotal());
             }
  }
