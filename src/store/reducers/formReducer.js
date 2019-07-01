/**
 * Created by wawooh on 5/6/19.
 */
 import { notification } from 'antd';
const initState = {
    result:{
        sending: false,
        success:false,
        error: false,
        message: []
    }
}
const formReducer =(state=initState, action) => {
    switch (action.type){

        case 'START_FORM':
         return {
             ...state,
             result:{
                 sending:false,
                 success:true,
                 error: false,
                 message: []
             }
         }
          case 'CREATE_FORM':
         var msg = action.res.data.msg;
         return {
             ...state,
             result:{
                 sending:false,
                 success:false,
                 error: false,
                 message: msg
             }
         }
        case 'SAVE_SUCCESS':
            // console.log(action.res.data.msg)
            notification.success({
                     placement: 'topRight',
                      top: 24,
                    message: 'Message',
                    description: action.res.data.msg,
                    style: {
                     width: 400,
                     backgroundColor:'green',
                        color:'white'
                 },
                  });

        return state;
        case 'CREATE_FORM_ERROR':
              var message = action.res.data.msg;
         return {
             ...state,
             result:{
                 sending:true,
                 success:false,
                 error: true,
                 message: message
             }
         }
         case 'SAVE_ERROR':
            notification.error({
                     placement: 'topRight',
                      top: 24,
                    message: 'Message',
                    description: action.res.data.msg,
                    style: {
                     width: 400,
                     backgroundColor:'red',
                        color:'white'
                 },
                  });
        return state;
        default:
        return state;

    }

}

export default formReducer
