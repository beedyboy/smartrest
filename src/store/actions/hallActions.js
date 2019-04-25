
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const createHall = (zone) => {
    return (dispatch, getState) => {  
        //make async call to database
         axios.post(serverUrl + 'hall/save/',{
           ...zone,
           shopId: shopId
        })
         .then(res => {
             console.log(res)
            dispatch(fetchHall());  
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })


    }
}

export const createTable = (hid,name) => {
    return (dispatch, getState) => {  
        //make async call to database
         axios.post(serverUrl + 'table/save/',{
           hid:hid,
           name:name,
           shopId: shopId
        })
         .then(res => {
            dispatch(fetchTable());  
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })


    }
}
export const fetchHall = () => {
    return (dispatch) => { 
       axios.get( serverUrl + 'hall/list',{
        params : {
            shopId:shopId
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
            shopId:shopId
          }
       })
         .then(res => {  
             // console.log(res)
        dispatch({type: 'FETCH_TABLE', res}); 
        }) 

    }
}
export const getTableByHall = (hid) => {
    return (dispatch) => {
       axios.get( serverUrl + 'seat/getTableByHall',{
          params : {
            shopId:shopId,
              hid:hid
          }
       })
         .then(res => {
             console.log(res)
        dispatch({type: 'FETCH_TABLE_BY_HALL', res});
        })

    }
}

export const createSeat = (tid,name) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'seat/save/',{
           tid:tid,
           seat:name,
           shopId: shopId
        })
         .then(res => {
            dispatch(fetchSeat());
        }).catch((err) => {
            dispatch({type: 'CREATE_USER_ERROR', err});
        })
        // dispatch({type: 'CREATE_USER', user});

    }
}

export const fetchSeat = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'seat/list',{
          params : {
            shopId:shopId
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_SEAT', res});
        })

    }
}
