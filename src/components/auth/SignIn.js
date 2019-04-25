import React, { PureComponent } from 'react'
import { authLogin } from '../../store/actions/authActions'; 
import {
  Form, Icon, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {NavLink, Redirect, withRouter} from 'react-router-dom';

class SignIn extends PureComponent {

    state = {
            username: '',
            password: '' 
    }

        handleChange = (e) => {
            this.setState({
                    [e.target.id]: e.target.value
            })
        }

        handleSubmit = (e) => {
            e.preventDefault();

            this.props.onAuth(this.state.username, this.state.password)

            }

  render() {

// console.log('login level',this.props )
const {from} = this.props.location.state || {from : {pathname: '/'}}
    if(this.props.isAuthenticated === true){
    return (
      <Redirect to={from} />
    )
  }
   
// else {
  return (

    <div className="container">


                 <Form onSubmit={this.handleSubmit} className="login-form">

                     <Form.Item>

                             <Input prefix={<Icon type="user"
                                                  style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"  id="username" onChange={this.handleChange} />

                     </Form.Item>

                     <Form.Item>

                             <Input prefix={<Icon type="lock"
                                                  style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password" placeholder="Password" id="password" onChange={this.handleChange} />

                     </Form.Item>

                     <Form.Item>
                         <Button type="primary" htmlType="submit"
                                 style={{marginRight: '10px'}}>Login</Button>
                         or
                         <NavLink style={{marginRight: '10px'}} to="/signup/">
                             Signup
                         </NavLink>
                     </Form.Item>

                 </Form>


    
    </div>
   
  )
// }
  
  }
}

const mapStateToProps = (state)=>{
  // console.log(state)
  return {  
     users: state.user.users,
      
      loading: state.auth.loading,
      error: state.auth.error 
  }
}
const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password)=>dispatch(authLogin(username,password)) 
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn))
