
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'


export const salesReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'report/salesReport', {
              params : {
                  ...data,
            shopId: shopId()
          }
       })
         .then(res => {
            
           localStorage.setItem('active', 'Yes');
        dispatch({type: 'FETCH_SALES_REPORT', res});
        })

    }
}


export const departmentReport = (data) => {
    return (dispatch) => {
       axios.get( serverUrl + 'report/departmentReport', {
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
       axios.get( serverUrl + 'report/salesTrailReport', {
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
       axios.get( serverUrl + 'report/staffReport', {
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




export const stockSalesReport = (data) => {
  return (dispatch) => {
    axios.get(serverUrl + 'report/stockReport', {
      params: {
        ...data,
        shopId: shopId()
      }
    })
      .then(res => {

        localStorage.setItem('active', 'Yes');
        dispatch({ type: 'FETCH_STOCK_SALES_REPORT', res });
      })

  }
}

export const stockRequestRefillReport = (data) => {
  return (dispatch) => {
    axios.get(serverUrl + 'report/StockRefillReport', {
      params: {
        ...data,
        shopId: shopId()
      }
    })
      .then(res => {

        localStorage.setItem('active', 'Yes');
        dispatch({ type: 'FETCH_STOCK_REFILL_REPORT', res });
      })

  }
}
export const getPurchaseReport = (data) => {
  return (dispatch) => {
    axios.get(serverUrl + 'report/purchaseReport', {
      params: {
        ...data,
        shopId: shopId()
      }
    })
      .then(res => {

        localStorage.setItem('active', 'Yes');
        dispatch({ type: 'FETCH_PURCHASE_REPORT', res });
      })

  }
}

export const getStoreReport = (data) => {
  return (dispatch) => {
    axios.get(serverUrl + 'report/storeReport', {
      params: {
        ...data,
        shopId: shopId()
      }
    })
      .then(res => {

        localStorage.setItem('active', 'Yes');
        dispatch({ type: 'FETCH_STORE_REPORT', res });
      })

  }
}