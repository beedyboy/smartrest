
const initState = {
    acquisition: [],
    storeUsables: [], 
    allocations: [],
    stockList: [],
    linkers:[],
    requests:[]
}
const storeReducer = (state = initState, action) => {
    switch (action.type) {

        case 'FETCH_RECEIVED_STORE_ITEMS':
            var ctData = action.res.data.data;
            return {
                ...state,
                acquisition: ctData
            }
        case 'FETCH_STORE_USABLE':
            var Data = action.res.data.data;
            return {
                ...state,
                storeUsables: Data
            }
 case 'FETCH_STORE_LIST':
            var SData = action.res.data.data;
            return {
                ...state,
                stockList: SData
            }

        case 'FETCH_LINKER_LIST':
            var lData = action.res.data.data;
            return {
                ...state,
                linkers: lData
            }
        case 'FETCH_REQUEST_LIST':
            var requestData = action.res.data.data;
            return {
                ...state,
                requests: requestData
            }
        case 'FETCH_STORE_REQUEST_LIST':
            var allocations = action.res.data.data;
            return {
                ...state,
                allocations
            }

        
        default:
            return state;

    }

}

export default storeReducer
