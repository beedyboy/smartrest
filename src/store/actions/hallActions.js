
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'

export const createHall = (zone) => {
    return (dispatch, getState) => {  
        //make async call to database
         axios.post(serverUrl + 'hall/save/',{
           ...zone,
           shopId: shopId()
        })
         .then(res => {
             if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchHall());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
            dispatch({type: 'SAVE_ERROR', err});
        })


    }
}

export const updateZone = (zone) => {
    return (dispatch) => {
        //make async call to database
         axios.post(serverUrl + 'hall/update/',{
           ...zone,
             token:token()
        })
         .then(res => {
         if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchHall());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}
export const createTable = (hid,name) => {
    return (dispatch, getState) => {  
        //make async call to database
         axios.post(serverUrl + 'table/save/',{
           hid:hid,
           name:name,
           shopId: shopId()
        })
         .then(res => {
         if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchTable());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}

export const updateTable = (hid,name,id) => {
    return (dispatch) => {
        //make async call to database
         axios.post(serverUrl + 'table/update/',{
           hid:hid,
           name:name,
             id:id
        })
         .then(res => {
         if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchTable());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}

export const fetchHall = () => {
    return (dispatch) => { 
       axios.get( serverUrl + 'hall/list',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => { 
        dispatch({type: 'FETCH_HALL', res}); 
        }) 

    }
}
export const fetchTable = () => { 
    return (dispatch) => { 
       axios.get( serverUrl + 'table/list',{
          params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_TABLE', res}); 
        }) 

    }
}
export const getTableByHall = (hid) => {
    return (dispatch) => {
       axios.get( serverUrl + 'seat/getTableByHall',{
          params : {
            shopId: shopId(),
              hid:hid
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_TABLE_BY_HALL', res});
        })

    }
}
export const getSeatByTable = (tid) => {
    return (dispatch) => {
       axios.get( serverUrl + 'seat/getSeatByTable',{
          params : {
            shopId: shopId(),
              tid:tid
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SEAT_BY_TABLE', res});
        })

    }
}

export const createSeat = (tid,name) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'seat/save/',{
           tid:tid,
           seat:name,
           shopId: shopId()
        })
         .then(res => {
         if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchSeat());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
                dispatch({type: 'CREATE_FORM_ERROR', err});
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}

export const updateSeat = (tid,name,id) => {
    return (dispatch) => {
        //make async call to database
         axios.post(serverUrl + 'seat/update/',{
           tid:tid,
           name:name,
             id:id
        })
         .then(res => {
         if(res.data.status === "success"){
                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                  dispatch(fetchSeat());
           } else {

                dispatch({type: 'CREATE_FORM_ERROR', res});
            dispatch({type: 'SAVE_ERROR', res});

             }
        }).catch((err) => {
            dispatch({type: 'SAVE_ERROR', err});
        })

    }
}

export const fetchSeat = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'seat/list',{
          params : {
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SEAT', res});
        })

    }
}
