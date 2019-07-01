 
import {updateObject} from  '../utility';
const initState = {
    settings:[]
}
const settingsReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_SETTINGS':
      var data = action.res.data.data;
      // console.log(data)
      return updateObject(state,{ 
                settings: data
        })
        
        default:
        return state;
     
    }
    
}

export default settingsReducer
