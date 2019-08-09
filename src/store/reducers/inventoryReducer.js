
const initState = { 
    kitchen:[],
    kitchenCat:[],
    menu:[], 
    kitchenMenu: [],
    units: [],
    dunits:[],
    menuCategory:[], 
        purchases: [],
        purchaseUsables: [],
    allocations:[], 
    classifications: []
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
                      case 'FETCH_CLASSIFICATION':
                    var classificationsData = action.res.data.data;
                    return {
                            ...state,
                            classifications: classificationsData
                    }
            case 'FETCH_UNIT':
                    var unitData = action.res.data.data;
                    return {
                            ...state,
                            units: unitData
                    } 
                    
        case 'FETCH_DISTINT_UNIT':
                    var dunits = action.res.data.data;
                    return {
                            ...state,
                            dunits 
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

            case 'FETCH_KITCHEN_MENU':
                    var kitchenMenuData = action.res.data.data;
                    return {
                            ...state,
                            kitchenMenu: kitchenMenuData
                    }

            case 'FETCH_PURCHASES':
                    var purchasesData = action.res.data.data;
                    return {
                            ...state,
                            purchases: purchasesData
                    }
            case 'FETCH_USABLE_PURCHASES':
                    var purchaseUsablesData = action.res.data.data;
                    return {
                            ...state,
                            purchaseUsables: purchaseUsablesData
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
 