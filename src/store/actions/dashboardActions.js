
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId} from '../utility'

export const getSystemStat = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'home/getSystemStat',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
            //  console.log(res)
        dispatch({type: 'FETCH_STAT', res});
        })

    }
}
export const topProduct = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'home/topProduct',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
            //  console.log(res)
        dispatch({type: 'FETCH_TOP_PRODUCT', res});
        })

    }
}
 
