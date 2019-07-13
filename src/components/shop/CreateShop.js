import React, { PureComponent } from 'react'
import {createShop} from '../../store/actions/shopActions'
import {connect} from 'react-redux'
import { Typography,  Button, Form, Input,  Alert } from 'antd';


const {  Text } = Typography;

class WrappedForm extends PureComponent {
    state = {
        shopName: '',
        shopPhoneNum: '',
        shopEmail: '',
        address: '',
        fullname:'',
        username:'',
        acc_password:'',
        id: '',
        loading: false

    }
    reset=()=>{
        this.setState({
            ...this.state,
            shopName: '',
        shopPhoneNum: '',
        shopEmail: '',
        address: '',
        fullname:'',
        username:'',
        acc_password:'',
        id: '',
        loading: false
        })
    }
   handleChange = (e) => {
     e.persist()
    this.props.form.setFieldsValue({
            [e.target.id]: e.target.value,
          });
       this.setState({
        [e.target.id]: e.target.value
       })
    }

handleSubmit = (e) => {
        e.preventDefault();
          this.props.form.validateFields(
      (err) => {
        if (!err) {
        this.props.createShop(this.state);
        if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()
            }
        }
      },
    );
    }

  render() {
       const { getFieldDecorator } = this.props.form;
       const { result } = this.props;
const {shopName,shopPhoneNum,  shopEmail, address,fullname, username, acc_password} = this.state
    const enabled =    shopName && shopPhoneNum.length>0  && shopEmail.length > 0 && address.length > 0 && fullname.length > 0 && username.length > 0 && acc_password.length > 0;

    return (
<React.Fragment>
 <div className="grid">

 <div className="column column-12">
   <Text type="secondary" strong >Create new shop </Text>
    <Form layout="horizontal" onSubmit={this.handleSubmit}>

 <div className="grid">

 <div className="column column-12">

    <Form.Item  label="Shop Name"  >
        {getFieldDecorator('shopName', {
            rules: [{
              required: true,
              message: 'Please input your shop name',
            }],
          })(
            <Input placeholder="Enter Shop Name"  onChange={this.handleChange}/>
                  )}
          </Form.Item>

         <Form.Item  label="Email" >
              {getFieldDecorator('shopEmail', {
            rules: [ {
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input   placeholder="Enter Email" id="shopEmail"    onChange={this.handleChange}/>
                  )}
          </Form.Item>


         <Form.Item  label="Phone Number"  >
               {getFieldDecorator('shopPhoneNum', {
            rules: [  {
              required: true, message: 'Please input your phone number',
            }],
          })(
            <Input placeholder="Enter Phone Number" id="shopPhoneNum"   onChange={this.handleChange}/>
                      )}
          </Form.Item>


         <Form.Item  label="Address"  >
             {getFieldDecorator('address', {
            rules: [{
              required: true,
              message: 'Please input your shop address',
            }],
          })(
            <Input placeholder="Enter Shop Address" id="address"  onChange={this.handleChange}/>
                   )}
          </Form.Item>
 </div>
 </div>



    <div className="grid">

    <div className="column column-12">
    <Form.Item  label="Full Name"  >
           {getFieldDecorator('fullname', {
            rules: [{
              required: true,
              message: 'Please enter your fullname',
            }],
          })(
            <Input name="fullname" placeholder="Enter Full Name" id="fullname"  onChange={this.handleChange}/>
                     )}
          </Form.Item>
        </div>

 </div>

 <div className="grid">
 <div className="column column-6">
         <Form.Item  label="Password"  >
             {getFieldDecorator('acc_password', {
            rules: [{
              required: true,
              message: 'Please input your password',
            }],
          })(
            <Input name="acc_password" type="password" placeholder="Enter Password" id="acc_password" onChange={this.handleChange}/>
             )}
          </Form.Item>
      </div>

        <div className="column column-6">
         <Form.Item  label="Username" >
                {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Please input your username',
            }],
          })(
            <Input name="username" placeholder="Enter Username" id="username"  onChange={this.handleChange}/>
                     )}
          </Form.Item>
 </div>
 </div>
             <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!enabled}>
                    Save
                </Button>
                   <Button style={{ marginLeft: 8 }} onClick={this.reset}>  Clear </Button>
            </Form.Item>
   </Form>
  </div>

 </div>


 <div className="grid">

     <div className="column column-12">

     {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}

      </div>
 </div>

</React.Fragment>
    )
  }
}
const mapStateToProps = (state)=> {
// console.log(state)
    return {
        result: state.form.result,
        auth: state.auth

    }
}
const mapDispatchToProps = (dispatch)=>{
return {
    createShop: (data) => dispatch(createShop(data))
}
}

const CreateShop = Form.create({  })(WrappedForm);
export default connect(mapStateToProps,mapDispatchToProps)(CreateShop);


