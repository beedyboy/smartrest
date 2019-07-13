
const initState = {
    shops:[],
    shopDetails:[]
}
const shopReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_SHOP':
         var shopData = action.res.data.data;
        return {
                ...state,
                shops: shopData
        }
      case 'FETCH_SHOP_DETAILS':
         var shopDetails = action.res.data.data;
        return {
                ...state,
                shopDetails: shopDetails
        }

        default:
        return state;

    }

}

export default shopReducer
