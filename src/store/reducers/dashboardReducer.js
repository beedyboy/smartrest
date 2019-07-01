 
import {updateObject} from  '../utility';
const initState = {
    stat:[],
    topFour:[],
    topProd:[]
}
const dashboardReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_STAT':
      var data = action.res.data.data;
    //   console.log(data)
      return updateObject(state,{ 
                stat: data
        })    
        
        case 'FETCH_TOP_PRODUCT':
      var topFourData = action.res.data.data;
      var topData = action.res.data.top;
    //   console.log(topData)
      return updateObject(state,{ 
        topProd: topData,
        topFour:topFourData
        })    
        


        
        default:
        return state;
     
    }
    
}

export default dashboardReducer
