
const initState = {
    products:[],
    kitchen:[],
    kitchenCat:[],
    menu:[],
    continental:[],
    menuCategory:[],
    bar:[],
    purchases: [],
    allocations:[],
    kitchenProducts: []
}
const inventoryReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_ALL_PRODUCT':
            var allData = action.res.data.data;
        return {
                ...state,
                products: allData
        }
        case 'KITCHEN_MENU_CATEGORY':
         var ctData = action.res.data.data;
        return {
                ...state,
                menuCategory: ctData
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
        case 'FETCH_KITCHEN':
         var kitchenData = action.res.data.data;
        return {
                ...state,
                kitchen: kitchenData
        }
        case 'FETCH_KITCHEN_CATEGORY':
                 var kitchenCatData = action.res.data.data;
                return {
                        ...state,
                        kitchenCat: kitchenCatData
                }

        case 'FETCH_MENU':
              var menuData = action.res.data.data;
        return {
                ...state,
                menu: menuData
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

        default:
        return state;

    }

}

export default inventoryReducer
/**
 * Created by wawooh on 4/15/19.
 */
