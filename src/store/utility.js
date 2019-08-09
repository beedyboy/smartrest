export const updateObject =(oldObject, updatedProperties)=>{
    // console.log("Updated properties",updatedProperties)
    return {
        ...oldObject,
        ...updatedProperties
    }
}

// export const shopId = localStorage.getItem('shop')
export function shopId() {
    return localStorage.getItem('shop')
}
export function userId() {
    return localStorage.getItem('userId')
}

export function token(){return localStorage.getItem('token')}

export function position(){return localStorage.getItem('position')}
export function fullname(){return localStorage.getItem('fullname')}
export function phone(){return localStorage.getItem('phone')}
export function status(){return localStorage.getItem('status')}
export function user(){return localStorage.getItem('user')} 
export function joined(){return localStorage.getItem('joined')} 

export function invoice() { return localStorage.getItem('receiptNumber')}
