import React, { PureComponent } from 'react'
import { authLogin } from '../../store/actions/authActions'; 
import {
  Form, Icon, Input, Button,  Alert} from 'antd';
import {connect} from 'react-redux';
import { Redirect, withRouter} from 'react-router-dom';
import Background from '../../asset/images/bg-01.jpg'

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
          const { result } = this.props;
// console.log(result)
const {from} = this.props.location.state || {from : {pathname: '/'}}
    if(this.props.isAuthenticated === true){
    return (
      <Redirect to={from} />
    )
  }
   
// else {
  return (

    <div className="container-login100" style={{backgroundImage: `url(${Background})`}}>
      <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<Form className="login100-form validate-form" onSubmit={this.handleSubmit}>
				<span className="login100-form-title p-b-37">
					Sign In
				</span>

<div className="wrap-input100 validate-input m-b-20" >
            <Input prefix={<Icon type="user"
            style={{color: 'rgba(0,0,0,.25)'}}/>} className="input100"
            placeholder="Username"  id="username" onChange={this.handleChange} />

</div>

<div className="wrap-input100 validate-input m-b-25" >
<Input prefix={<Icon type="lock"
style={{color: 'rgba(0,0,0,.25)'}}/>}  className="input100"
type="password" placeholder="Password" id="password" onChange={this.handleChange} />

</div>

<div className="container-login100-form-btn">
<Button type="primary" htmlType="submit"  className="login100-form-btn"
style={{marginRight: '10px'}}>Login</Button>
{/*or*/}
{/*<NavLink style={{marginRight: '10px'}} to="/signup/">*/}
{/*Signup*/}
{/*</NavLink>*/}
</div>
           <div className="wrap-input100 p-t-57 m-b-25" >
               {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}
                </div>


                {/*<div className="text-center p-t-57 p-b-20">*/}
					{/*<span className="txt1">*/}
						{/*Or login with*/}
					{/*</span>*/}
				{/*</div>*/}

				{/*<div className="flex-c p-b-112">*/}
					{/*<a href="#" className="login100-social-item">*/}
						{/*<i className="fa fa-facebook-f"></i>*/}
					{/*</a>*/}

					{/*<a href="#" className="login100-social-item">*/}
						{/*<img src="images/icons/icon-google.png" alt="GOOGLE">*/}
					{/*</a>*/}
				{/*</div>*/}

				{/*<div className="text-center">*/}
					{/*<a href="#" class="txt2 hov1">*/}
						{/*Sign Up*/}
					{/*</a>*/}
				{/*</div>*/}
            </Form>
      </div>



    
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
      error: state.auth.error,
        result: state.form.result,
  }
}
const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password)=>dispatch(authLogin(username,password)) 
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn))
