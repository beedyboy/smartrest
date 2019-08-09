 
import {updateObject} from  '../utility';
const initState = {
    products:[], 
}
const productReducer =(state=initState, action) => {
    switch (action.type){
       
 case 'FETCH_PRODUCT':
        var products = action.res.data.data;
      return updateObject(state,{
        products 
        }) 
        default:
        return state;
     
    }
    
}

export default productReducer
