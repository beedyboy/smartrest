
const initState = { 
    kitchen:[],
    kitchenCat:[],
    menu:[], 
    menuCategory:[], 
    purchases: [],
    allocations:[], 
}
const inventoryReducer =(state=initState, action) => {
    switch (action.type){
         
        case 'KITCHEN_MENU_CATEGORY':
         var ctData = action.res.data.data;
        return {
                ...state,
                menuCategory: ctData
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

        
        default:
        return state;

    }

}

export default inventoryReducer
 