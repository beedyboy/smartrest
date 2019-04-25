 import { notification } from 'antd';
const initState = {
    products:[],
    continental:[],
    local:[],
    bar:[],
    purchases: [],
    allocations:[],
    kitchenProducts: []
}
const inventoryReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_LOCAL':
         var localData = action.res.data.data;
        return {
                ...state,
                local: localData
        }

        case 'FETCH_CONTINENTAL':
         var continentalData = action.res.data.data;
        return {
                ...state,
                continental: continentalData
        }

        case 'FETCH_BAR':
         var barData = action.res.data.data;
        return {
                ...state,
                bar: barData
        }

        case 'FETCH_PURCHASES':
              var purchasesData = action.res.data.data;
        return {
                ...state,
                purchases: purchasesData
        }

          case 'FETCH_ALLOCATION':
              var allocationData = action.res.data.data;
        return {
                ...state,
                allocations: allocationData
        }

        case 'FETCH_PRODUCT_BY_KITCHEN':
              var kitchenProductsData = action.res.data.data;
        return {
                ...state,
                kitchenProducts: kitchenProductsData
        }
        case 'CREATE_PRODUCT':
        console.log(' product', action.res.data);
        return state;

        case 'CREATE_PRODUCT_ERROR':
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

        case 'SAVE_SUCCESS':
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
        // console.log('Error creating product', action)
        return state;

        default:
        return state;

    }

}

export default inventoryReducer
/**
 * Created by wawooh on 4/15/19.
 */
