 
import {updateObject} from  '../utility';
const initState = {
    zone:[],
    table:[],
    htables:[],
    cart: [],
    cartTotal: [],
    menu:[],
    waiters:[],
    basket: [],
    kitBasket: [],
    receivable: [],
    kitchenReceivable: [],
    orderDetails: [],
    invoiceDetails: [],
    savedOrder:[],
    Order:[],
    plateArray:[],
    OrderPlateItem:[],
    receiptNumber:''
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
        
        case 'PLATE_ITEM_DATA':
      var newOrderArray = action.res.data.data; 
      var newItem = action.res.data.item; 
//       console.log("NEW ITEM", newItem)
      return updateObject(state,{ 
                plateArray: newOrderArray,
                OrderPlateItem: newItem
        })
        
        case 'FETCH_ORDER':
      var newOrder = action.res.data.data; 
      return updateObject(state,{ 
                Order: newOrder
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

        case 'FETCH_BASKET':
              var newBasket = action.res.data.data;
      return updateObject(state,{
                basket: newBasket
        })

        case 'FETCH_KITCHEN_BASKET':
              var newKitBasket = action.res.data.data;
      return updateObject(state,{
                kitBasket: newKitBasket
        })

        case 'FETCH_SAVED_ORDER':
              var newD = action.res.data.data;
      return updateObject(state,{
                savedOrder: newD
        })

        case 'FETCH_RECEIVABLE':
              var newReceivable = action.res.data.data;
      return updateObject(state,{
                receivable: newReceivable
        })
        case 'FETCH_KITCHEN_RECEIVABLE':
              var newKitReceivable = action.res.data.data;
      return updateObject(state,{
                kitchenReceivable: newKitReceivable
        })

        case 'FETCH_ORDER_INVOICE':
              var newOrderDetails = action.res.data.data;
      return updateObject(state,{
                orderDetails: newOrderDetails
        })
        case 'FETCH_INVOICE_DETAILS':
              var newInvoiceDetails = action.res.data.data;
      return updateObject(state,{
                invoiceDetails: newInvoiceDetails
        })

        case 'CREATE_RECEIPT':
              var newReceiptNumber = action.number;
              localStorage.removeItem('receiptNumber')
              localStorage.setItem('receiptNumber', newReceiptNumber)
      return updateObject(state,{
                receiptNumber: newReceiptNumber
        })


        
        default:
        return state;
     
    }
    
}

export default posReducer
