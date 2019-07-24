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

export function invoice() { return localStorage.getItem('receiptNumber')}
