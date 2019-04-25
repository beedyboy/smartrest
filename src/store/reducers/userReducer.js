 
const initState = {
    users:[]
}
const userReducer =(state=initState, action) => {
    switch (action.type){
        case 'FETCH_USER':
      var newUser = action.res.data.data;
        return {
                ...state,
                users: newUser
        }    
        
        case 'CREATE_USER':
        console.log(' project', action.res.data);
        return state; 

        case 'CREATE_USER_ERROR':
        console.log('Error creating user', action.err)
        return state;
        
        default:
        return state;
     
    }
    
}

export default userReducer
