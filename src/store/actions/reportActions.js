
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'


export const salesReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/salesReport', {
              params : {
                  ...data,
            shopId: shopId()
          }
       })
         .then(res => {
            //  console.log(res)
        dispatch({type: 'FETCH_SALES_REPORT', res});
        })

    }
}


export const departmentReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/departmentReport', {
              params : {
                  ...data,
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_DEPT_REPORT', res});
        })

    }
}


export const salesTrailReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/salesTrailReport', {
              params : {
                  ...data,
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_SALES_TRAIL_REPORT', res});
        })

    }
}

export const staffReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'pos/staffReport', {
              params : {
                  ...data,
            shopId: shopId()
          }
       })
         .then(res => {
        dispatch({type: 'FETCH_STAFF_REPORT', res});
        })

    }
}


