 
import {updateObject} from  '../utility';
const initState = {
    salesTrails:[],
    salesTotal:'',
    departments:[],
    staffs:[],
    stockReport: [],
    stockRefillReport: [],
    purchaseReport: [],
  storeReport:[]
}
const reportReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_SALES_REPORT':
            var newSales = action.res.data.data;
            var salesTotal = action.res.data.totalAmount;
    //   console.log(salesTotal)
      return updateObject(state,{ 
                sales: newSales,
                salesTotal
        })
        case 'FETCH_SALES_TRAIL_REPORT':
      var newSalesTrail = action.res.data.data;
      return updateObject(state,{
                salesTrails: newSalesTrail
        })

 case 'FETCH_DEPT_REPORT':
      var newDept = action.res.data.data;
      return updateObject(state,{
                departments: newDept
        })

 case 'FETCH_STAFF_REPORT':
      var newStaff = action.res.data.data;
      return updateObject(state,{
                staffs: newStaff
        })
 case 'FETCH_STOCK_SALES_REPORT':
            var stockReport = action.res.data.data; 
      return updateObject(state,{ 
                 
          stockReport
        })

      case 'FETCH_STOCK_REFILL_REPORT':
        var stockRefillReport = action.res.data.data;
        return updateObject(state, {

          stockRefillReport
        })

         case 'FETCH_PURCHASE_REPORT':
        var purchaseReport = action.res.data.data;
        // console.log("purchaseReport", purchaseReport)
        return updateObject(state, {

          purchaseReport: purchaseReport
        })
      case 'FETCH_STORE_REPORT':
        var storeReport = action.res.data.data; 
        return updateObject(state, {

          storeReport: storeReport
        })
        default:
        return state;
     
    }
    
}

export default reportReducer
