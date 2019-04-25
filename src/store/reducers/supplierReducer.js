
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

        case 'CREATE_SUPPLIER':
        console.log(' project', action.res.data);
        return state;

        case 'CREATE_USER_ERROR':
        console.log('Error creating user', action.err)
        return state;

        default:
        return state;

    }

}

export default supplierReducer
