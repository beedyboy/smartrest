
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'
 
export const getKitchenFromMenu = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'kitchen/getKitchenFromMenu',{
        params : {
            shopId: shopId() 
          }
       })
         .then(res => { 
        dispatch({type: 'KITCHEN_MENU_CATEGORY', res});
        })

    }
}

export const saveClassification = (data) => {

  return (dispatch, getState) => {
    dispatch({ type: 'START_FORM' });
    axios.post(serverUrl + 'classification/save/', {
      ...data,
      shopId: shopId()
    })
      .then(res => {

        if (res.data.status === "success") {
          dispatch({ type: 'CREATE_FORM', res });
          dispatch({ type: 'SAVE_SUCCESS', res });
          dispatch(fetchClassification());
        }
        else {
          dispatch({ type: 'CREATE_FORM_ERROR', res });
          dispatch({ type: 'SAVE_ERROR', res });
        }
      }).catch((err) => {
        dispatch({ type: 'CREATE_FORM_ERROR', err });
        dispatch({ type: 'SAVE_ERROR', err });
      })


  }
}

export const fetchClassification = () => {
  return (dispatch) => {
    axios.get(serverUrl + 'classification/list', {
      params: {
        shopId: shopId()
      }
    })
      .then(res => {
        dispatch({ type: 'FETCH_CLASSIFICATION', res });
      })

  }
}
export const updateClassification = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'classification/update/',{
           ...data,
           shopId: shopId()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchClassification());
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

export const createUnit = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'unit/save/',{
           ...data,
           shopId: shopId()
        })
         .then(res => {

           if(res.data.status === "success"){
               dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchUnit());
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

export const updateUnit = (data) => {

    return (dispatch, getState) => {
          dispatch({type: 'START_FORM'});
         axios.post(serverUrl + 'unit/update/',{
           ...data,
           shopId: shopId()
        })
         .then(res => {

           if(res.data.status === "success"){
            dispatch({type: 'CREATE_FORM', res});
                dispatch({type: 'SAVE_SUCCESS', res});
             dispatch(fetchUnit());
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

export const fetchUnit = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'unit/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_UNIT', res});
        })

    }
}


export const fetchDistintUnit = (sub) => {
  return (dispatch) => {
    axios.get(serverUrl + 'classification/distData', {
      params: {
        shopId: shopId(),
        sub: sub
      }
    })
      .then(res => {
        dispatch({ type: 'FETCH_DISTINT_UNIT', res });
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
         axios.post(serverUrl + 'linker/save/',{
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

export const getKitchenMenu = (kitchenId) => {
  return (dispatch) => {
    axios.get(serverUrl + 'menu/getKitchenMenu', {
      params: {
        kitchenId:kitchenId,
        shopId: shopId()
      }
    })
      .then(res => {
        // console.log(res)
        dispatch({ type: 'FETCH_KITCHEN_MENU', res });
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

export const fetchUsablePurchases = () => {
    return (dispatch) => {
        axios.get(serverUrl + 'purchase/UsablePurchases', {
            params: {
                shopId: shopId()
            }
        })
            .then(res => {
                // console.log(res)
                dispatch({ type: 'FETCH_USABLE_PURCHASES', res });
            })

    }
}



// export const createNewAllocation = (data) => {
//     return (dispatch, getState) => {
//         //make async call to database
//          axios.post(serverUrl + 'acquisition/save/',{
//            ...data,
//            shopId: shopId(),
//              token:token()
//         })
//          .then(res => {
//            if(res.data.status === "error"){
//                   dispatch({type: 'CREATE_FORM_ERROR', res});
//             dispatch({type: 'SAVE_ERROR', res});
//            }
//            else{
//                   dispatch({type: 'SAVE_SUCCESS', res});
//                   dispatch({type: 'CREATE_FORM', res});
//                 dispatch(fetchAllocation());
//            }
//         }).catch((err) => {
//                dispatch({type: 'CREATE_FORM_ERROR', err});
//             dispatch({type: 'SAVE_ERROR', err});
//         })


//     }
// }

// export const updateAllocation = (data) => {
//     return (dispatch, getState) => {
//         //make async call to database
//          axios.post(serverUrl + 'acquisition/update/',{
//            ...data,
//              token:token()
//         })
//          .then(res => {
//            if(res.data.status === "error"){
//                   dispatch({type: 'CREATE_FORM_ERROR', res});
//             dispatch({type: 'SAVE_ERROR', res});
//            }
//            else{
//                     dispatch({type: 'SAVE_SUCCESS', res});
//                   dispatch({type: 'CREATE_FORM', res});
//                 dispatch(fetchAllocation());
//            }
//         }).catch((err) => {
//             dispatch({type: 'CREATE_FORM_ERROR', err});
//             dispatch({type: 'SAVE_ERROR', err});
//         })


//     }
// }

// export const fetchAllocation = () => {
//     return (dispatch) => {
//        axios.get( serverUrl + 'acquisition/list',{
//         params : {
//             shopId: shopId()
//           }
//        })
//          .then(res => {
//         dispatch({type: 'FETCH_ALLOCATION', res});
//         })

//     }
// }
 
// export const updateFinishedProduct = (data) => {
//     // console.log(data)
//     return (dispatch, getState) => {
//         //make async call to database
//          axios.post(serverUrl + 'acquisition/updateFinishedProduct/',{
//            ...data,
//              token:token()
//         })
//          .then(res => {
//            if(res.data.status === "error"){
//                  dispatch({type: 'CREATE_FORM_ERROR', res});
//             dispatch({type: 'SAVE_ERROR', res});
//            }
//            else{
//                     dispatch({type: 'SAVE_SUCCESS', res});
//                   dispatch({type: 'CREATE_FORM', res});
//                 dispatch(fetchAllocation());
//            }
//         }).catch((err) => {
//             dispatch({type: 'CREATE_FORM_ERROR', err});
//             dispatch({type: 'SAVE_ERROR', err});
//         })


//     }
// }
