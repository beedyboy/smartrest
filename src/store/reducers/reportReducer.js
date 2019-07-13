 
import {updateObject} from  '../utility';
const initState = {
    salesTrails:[],
    salesTotal:'',
    departments:[],
    staffs:[]
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


        default:
        return state;
     
    }
    
}

export default reportReducer
