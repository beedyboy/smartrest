
const initState = {
    suppliers:[]
}
const supplierReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_SUPPLIER':
         var supplierData = action.res.data.data;
        return {
                ...state,
                suppliers: supplierData
        }

        default:
        return state;

    }

}

export default supplierReducer
