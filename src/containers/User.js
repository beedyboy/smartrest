import React, { PureComponent } from 'react'
import { Tabs, Icon } from 'antd';
import CreateUser from '../components/user/CreateUser'
import * as actions from '../store/actions/userActions'
import UserList from '../components/user/UserList'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import moment from 'moment';
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
const TabPane = Tabs.TabPane;
class User extends PureComponent {
     state = {
        id:'',
        fullname: '',
        username: '',
        acc_email: '',
        acc_password: '',
        sales:[],
        menu:[],
        user:[],
        supplier:[],
        purchases:[],
        acquisition:[],
        table:[],
        hall:[],
        seat:[],
        position: '',
        date_joined: moment().format('YYYY-MM-DD'),
        role: [],
         create:true

    }
    reset =()=>{
           this.setState({
               ...this.state,
                 id:'',
                fullname: '',
                username: '',
                acc_email: '',
                acc_password: '',
                sales:[],
                menu:[],
                user:[],
                supplier:[],
                purchases:[],
                acquisition:[],
                table:[],
                hall:[],
                seat:[],
                position: '',
                date_joined: moment().format('YYYY-MM-DD'),
                role: [],
                create:true
        })
    }
   handleChange = (e) => {
       this.setState({
        [e.target.id]: e.target.value
       })
    }
   handleChangeDate = (evt, date) => {
    this.setState({
        date_joined:date
    })
  }
    
    handlePosition=(value) => {
      this.setState({
        position:value
      })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
        // console.log(this.state)
        this.reset()

    }

        handleEdit = (data) => {
         // console.log(data.user)
              this.setState({
                  ...this.state,
                        id: data.id,
                        fullname: data.fullname,
                        username: data.username,
                        acc_email: data.acc_email,
                        position: data.position,
                        date_joined:data.date_joined,
                        // menu:data.menu,
                        // supplier:data.supplier,
                        // purchases:data.purchases,
                        // acquisition:data.acquisition,
                        // table:data.table,
                        // hall:data.hall,
                        // seat:data.seat,
                        // sales:data.sales,
                        create:data.create
              })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateUser(this.state)

        }

        handleDelete = (id) => {
            this.props.deleteUser(id)
        }
    
        handleLogOutUser=(id)=>{
          
            this.props.logUserOut(id)

      }

  componentDidMount(){
     
    this.props.fetchUsers()
  }

  render() {
       if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
       const {users, role} = this.props
    return (
        
        <div className="">
       <Helmet>
        <title>User Management</title>
        <meta name="description" content="User Management" />
    </Helmet>

 <div className="grid">
 
 <div className="column column-12">

        <Tabs type="card" defaultKey="3">
    <TabPane tab={<span><Icon type="usergroup-add" />User Form</span>} key="1">


             <CreateUser
                 handleChange={this.handleChange}

                handlePosition={this.handlePosition}
                handleSubmit={this.handleSubmit}
                 handleUpdate={this.handleUpdate}
                 reset={this.reset}
                 state={this.state}

             />


    </TabPane>

            <TabPane tab={<span><Icon type="team" />User Record </span>}   key="2">

       <UserList users={users && users} edit={this.handleEdit} del={this.handleDelete} logout={this.handleLogOutUser} role={role} />


    </TabPane>

  </Tabs>

  </div>

 </div>
 

        </div> 
    )
            }
           return <NoAccess name={fullname()}/>
        }
        }

const mapStateToProps = (state)=> {
    
    return {
        users: state.user.users,
        auth: state.auth,
      role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: ()=> dispatch(actions.fetchUsers()),
    createUser: (user) => dispatch(actions.createUser(user)),
    updateUser: (user) => dispatch(actions.updateUser(user)),
    logUserOut: (id) => dispatch(actions.logUserOut(id)),
    deleteUser: (id) => dispatch(actions.deleteUser(id))
}
}
export default
connect(mapStateToProps, mapDispatchToProps)(User);
