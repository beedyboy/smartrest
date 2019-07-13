 
import {updateObject} from  '../utility';
const initState = {
    zone:[],
    table:[],
    htables:[],
    seat:[]
}
const hallReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_HALL':
      var newZone = action.res.data.data;
      return updateObject(state,{ 
                zone: newZone
        })    
        
        case 'FETCH_TABLE':
      var newTable = action.res.data.data;
      return updateObject(state,{ 
                table: newTable
        })

        case 'FETCH_TABLE_BY_HALL':
              var newHallTable = action.res.data.data;
      return updateObject(state,{
                htables: newHallTable
        })

        case 'FETCH_SEAT_BY_TABLE':
              var newTableSeat = action.res.data.data;
      return updateObject(state,{
                seat: newTableSeat
        })
        case 'CREATE_ZONE':
        // console.log(' zone', action.res.data);
        return state; 

        case 'CREATE_ZONE_ERROR':
        console.log('Error creating zone', action.err)
        return state;

        
        case 'CREATE_TABLE':
        console.log(' table', action.res.data);
        return state; 


        case 'CREATE_SEAT':
        console.log(' seat', action.res.data);
        return state;

         case 'FETCH_SEAT':
             var newSeat = action.res.data.data;
             // console.log(action.res)
             return updateObject(state,{
                seat: newSeat
        })
        
        default:
        return state;
     
    }
    
}

export default hallReducer
