export const updateObject =(oldObject, updatedProperties)=>{
    // console.log("Updated properties",updatedProperties)
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const shopId = localStorage.getItem('shop')
export const token = localStorage.getItem('token')
