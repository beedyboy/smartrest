import React, { PureComponent } from 'react' 
import CreateUser from '../components/user/CreateUser'
import {fetchUsers} from '../store/actions/userActions'
import UserList from '../components/user/UserList'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";

class User extends PureComponent {
   
  componentDidMount(){
     
    this.props.fetchUsers()
  }

  render() {
       const {users} = this.props
    return (
        
        <div className="">
       <Helmet>
        <title>User Management</title>
        <meta name="description" content="User Management" />
    </Helmet>

 <div className="grid">
 
 <div className="column column-6"> 
 <UserList users={users} />
 </div>   

 <div className="column column-6"> 
 <CreateUser/>
 </div>

 </div>
 

        </div> 
    )
  }
}

const mapStateToProps = (state)=> {
    
    return {
        users: state.user.users,
        auth: state.auth 
        // users: []
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: ()=> dispatch(fetchUsers())
  }
}

export default
connect(mapStateToProps, mapDispatchToProps)(User);
