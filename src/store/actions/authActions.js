
import axios from 'axios';
import {serverUrl} from '../../Config'
import {shopId, token, userId, fullname} from '../utility'

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
    
    return (dispatch) => {
           const active = localStorage.getItem('active'); 
        if (active === undefined || active === null){
        axios.post(serverUrl+'login/logout/',{
           userId:userId(),
          token: token(),
          fullname: fullname(),
          shopId: shopId()

        })
        .then(res=>{  
            if(res.data.status === "success"){ 
                localStorage.removeItem('userId');
                localStorage.removeItem('user');
                localStorage.removeItem('fullname');
                localStorage.removeItem('position');
                localStorage.removeItem('email'); 
                localStorage.removeItem('token');
                localStorage.removeItem('shop');
                localStorage.removeItem('joined');
                localStorage.removeItem('phone');
                localStorage.removeItem('status');
                localStorage.removeItem('expirationDate')
                localStorage.removeItem('receiptNumber');
                dispatch({type:'AUTH_LOGOUT'});
             
        }
        else{

            dispatch({type:'AUTH_LOGOUT'});
               dispatch({type: 'CREATE_FORM_ERROR', res});
        }


        })
    }
    else {
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('expirationDate', expirationDate);
    }
    }
}

export const hotLogout = () => {

    return (dispatch) => {
        
            axios.post(serverUrl + 'login/logout/', {
                userId: userId(),
                token: token(),
                fullname: fullname(),
                shopId: shopId()

            })
                .then(res => {
                    if (res.data.status === "success") {
                        localStorage.removeItem('active');
                        localStorage.removeItem('userId');
                        localStorage.removeItem('user');
                        localStorage.removeItem('fullname');
                        localStorage.removeItem('position');
                        localStorage.removeItem('email');
                        localStorage.removeItem('token');   
                        localStorage.removeItem('shop');
                        localStorage.removeItem('joined');
                        localStorage.removeItem('phone');
                        localStorage.removeItem('status');
                        localStorage.removeItem('expirationDate')
                        localStorage.removeItem('receiptNumber');
                        dispatch({ type: 'AUTH_LOGOUT' });

                    }
                    else {

                        dispatch({ type: 'AUTH_LOGOUT' });
                        dispatch({ type: 'CREATE_FORM_ERROR', res });
                    }


                })
        
    }
}

export const authLogin =(username, password)=>{
    return dispatch =>{
       
       dispatch(authStart());
       axios.post(serverUrl+'login/authenticate/',{
           username:username,
           acc_password:password
       }) 
           .then(res=>{ 
            //    console.log(res)
               if(res.data.status === "green"){
                 const username = res.data.record.username; 
               const token = res.data.record.token;
               const expirationDate = new Date(new Date().getTime()+3600 * 1000);
               if(localStorage.getItem('token') !== null){
                   localStorage.removeItem('token');
               }
               localStorage.setItem('token', token);
               localStorage.setItem('position', res.data.record.position);
               localStorage.setItem('fullname', res.data.record.fullname);
               localStorage.setItem('userId', res.data.record.id);
               localStorage.setItem('user', username);
               localStorage.setItem('email', res.data.record.acc_email);
               localStorage.setItem('joined', res.data.record.date_joined);
               localStorage.setItem('phone', res.data.record.acc_phone);
               localStorage.setItem('status', res.data.record.acc_status);
               localStorage.setItem('shop', res.data.record.shopId);
               localStorage.setItem('expirationDate', expirationDate);
               dispatch(authSuccess(res.data));
               dispatch({type: 'SAVE_SUCCESS', res});
                  dispatch({type: 'CREATE_SHOP', res});
               dispatch(checkAuthTimeout(3700));
           } 
           else if(res.data.status === "red"){
            dispatch({type: 'CREATE_FORM_ERROR', res});
           }
           else{

                  dispatch({type: 'CREATE_FORM_ERROR', res});
           }


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
        if (token === undefined || token === null){
            // dispatch(logout());
        } else{

            const expirationDate = new Date(localStorage.getItem('expirationDate')); 
            if (expirationDate && expirationDate <= new Date())
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
                // role:localStorage.getItem('role').replace(/(\r\n|\n|\r)/gm, "").trim().split(','),
                email:localStorage.getItem('acc_email')
            }
        }
                dispatch(authSuccess(data)); 
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
