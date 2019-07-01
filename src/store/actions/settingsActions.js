
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token} from '../utility'

export const getSystemSettings = () => {
    return (dispatch) => {
       axios.get( serverUrl + 'settings/getSystemSettings',{
        params : {
            shopId: shopId()
          }
       })
         .then(res => {
             // console.log(res)
        dispatch({type: 'FETCH_SETTINGS', res});
        })

    }
}



export const updateSettings = (data) => {
    return (dispatch, getState) => {
        //make async call to database
         axios.post(serverUrl + 'settings/update/',{
           ...data,
             token:token()
        })
         .then(res => {
           if(res.data.status === "error"){
                dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{

                  dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_FORM', res});
                dispatch(getSystemSettings());
           }
        }).catch((err) => {
            dispatch({type: 'CREATE_FORM_ERROR', err});
        })


    }
}
