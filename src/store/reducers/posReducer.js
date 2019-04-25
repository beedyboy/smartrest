 
import {updateObject} from  '../utility';
const initState = {
    zone:[],
    table:[],
    htables:[],
    cart: [],
    cartTotal: [],
    menu:[],
    waiters:[]
}
const posReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_WAITERS':
      var newWaiter = action.res.data.data;
      return updateObject(state,{ 
                waiters: newWaiter
        })    
        
        case 'FETCH_MENU':
      var newMenu = action.res.data.data;
      return updateObject(state,{ 
                menu: newMenu
        })

        case 'FETCH_CART_ITEM':
              var newCart = action.res.data.data;
      return updateObject(state,{
                cart: newCart
        })

        case 'FETCH_CART_TOTAL':
              var newCartTotal = action.res.data.data;
      return updateObject(state,{
                cartTotal: newCartTotal
        })


        
        default:
        return state;
     
    }
    
}

export default posReducer
