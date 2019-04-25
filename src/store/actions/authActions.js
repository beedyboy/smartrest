 import { notification } from 'antd';

import axios from 'axios';
import {serverUrl} from '../../Config'

export const authStart =()=>{
    return (dispatch)=> {
        dispatch({type: 'AUTH_START'}); 
    }
     
}

export const authSuccess = (data)=>{
    return (dispatch)=> {
        dispatch({type: 'AUTH_SUCCESS', data}); 
    }
     
}

export const authFail =error=>{
    return (dispatch)=> {
        dispatch({type: 'AUTH_FAIL', error}); 
    }
        
}

export const checkAuthTimeout = expirationTime =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('fullname');
    localStorage.removeItem('position');
    localStorage.removeItem('email'); 
    localStorage.removeItem('token');
    localStorage.removeItem('shop');
    localStorage.removeItem('expirationDate');
    return (dispatch) => {
       dispatch({type:'AUTH_LOGOUT'});
    }
}

export const authLogin =(username, password)=>{
    return dispatch =>{
        // console.log(password)
       dispatch(authStart());
       axios.post(serverUrl+'login/authenticate/',{
           username:username,
           acc_password:password
       })
           .then(res=>{ 
            //    console.log(res);
               const username = res.data.record.username;
               const token = res.data.record.token;
               const expirationDate = new Date(new Date().getTime()+3600 * 1000);
               localStorage.setItem('token', token);
               localStorage.setItem('position', res.data.record.position);
               localStorage.setItem('fullname', res.data.record.fullname);
               localStorage.setItem('user', username);
               localStorage.setItem('email', res.data.record.acc_email);
               localStorage.setItem('shop', res.data.record.shopId);
               localStorage.setItem('expirationDate', expirationDate);
               dispatch(authSuccess(res.data));
                notification.success({
                     placement: 'topRight',
                      top: 24,
                    message: 'Login Message',
                    description: res.data.msg,
                    style: {
                     width: 400,
                     backgroundColor:'green',
                        color:'white'
                 },
                  });
               dispatch(checkAuthTimeout(3700));
           })
           .catch(err=>{
               dispatch(authFail(err));
                console.log("There is no user with the given username and password");
           })
    }
}



// export const authSignup =(email, username, password1, password2)=>{
//     return dispatch =>{
//        dispatch(authStart());
//        axios.post(serverUrl+'user/authentication/',{
//            email:email,
//            username:username,
//            password1:password1,
//            password2:password2
//        })
//            .then(res=>{
//                const token = res.data.key;
//                const expirationDate = new Date(new Date().getTime()+3600 * 1000);
//                localStorage.setItem('token', token);
//                localStorage.setItem('expirationDate', expirationDate);
//                dispatch(authSuccess(token));
//                dispatch(checkAuthTimeout(3700));
//            })
//            .catch(err=>{
//                dispatch(authFail(err));
//            })
//     }
// }

export const authCheckState=()=>{ 
    return dispatch=>{
        const token = localStorage.getItem('token'); 
        if (token === undefined){
            dispatch(logout());
        } else {

            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date())
            {
                dispatch(logout());
            } else {

        const position = localStorage.getItem('position'); 
        const data = {
            record: {
                position: position,
                token: token,
                shopId:localStorage.getItem('shop'),
                username:localStorage.getItem('user'),
                fullname:localStorage.getItem('fullname'),
                email:localStorage.getItem('acc_email')
            }
        }
                dispatch(authSuccess(data)); 
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
