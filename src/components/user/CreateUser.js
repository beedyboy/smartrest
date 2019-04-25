import React, { PureComponent } from 'react'
import {createUser} from '../../store/actions/userActions'
// import {serverUrl} from '../../Config'
import {connect} from 'react-redux'

import { Typography,  Button, Select, Form, Input, Icon  } from 'antd';

const Option = Select.Option;
const {  Text } = Typography;

class CreateUser extends PureComponent {
    state = {
        fullname: '',
        username: '',
        acc_email: '',
        acc_password: '',
        sales:[], 
        menu:[], 
        user:[], 
        supplier:[], 
        hall:[], 
        seat:[], 
        position: '',
        role: []
        // server:serverUrl
    }
   handleChange = (e) => {  
       this.setState({
        [e.target.id]: e.target.value
       })
    }
    
    handleChangeUser=(value) => {
      this.setState({
        user:value
      })
    }
    
    handleChangeSales=(value) => {
      this.setState({
        sales:value
      })
    }
    
    handleChangeMenu=(value) => {
      this.setState({
        menu:value
      })
    }
  
    
    handleChangeSupplier=(value) => {
      this.setState({
        supplier:value
      })
    }
  
    
    handleChangeHall=(value) => {
      this.setState({
        hall:value
      })
    }
  
    
    handleChangeSeat=(value) => {
      this.setState({
        seat:value
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
        this.setState({
          fullname: '',
        username: '',
        acc_email: '',
        acc_password: '',
        sales:[], 
        menu:[], 
        user:[], 
        supplier:[], 
        hall:[], 
        seat:[], 
        position: '',
        role: []
        })
    }

  render() {
    // console.log(this.props)
    return (
     
 <div className="grid">
 
 <div className="column column-12"> 
    <Form layout="horizontal" onSubmit={this.handleSubmit}> 

    <div className="grid">
 
 <div className="column column-6"> 
    <Form.Item  label="Full Name"  >
            <Input name="fullname" placeholder="Enter Full Name" id="fullname"  value={this.state.fullname} onChange={this.handleChange}/>
          </Form.Item>
        </div>
      
        <div className="column column-6"> 
         <Form.Item  label="Username"  >
            <Input name="username" placeholder="Enter Username" id="username"  value={this.state.username} onChange={this.handleChange}/>
          </Form.Item>
 </div>
 </div>

 <div className="grid">
 <div className="column column-6"> 
         <Form.Item  label="Password"  >
            <Input name="acc_password" type="password" placeholder="Enter Password" id="acc_password"  value={this.state.acc_password} onChange={this.handleChange}/>
          </Form.Item>
      </div>
 <div className="column column-6"> 
        <Form.Item label="Position" >
          <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a position"
        optionFilterProp="children"   id="position" name="position"
        onChange={this.handlePosition} value={this.state.position}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >  
      <Option value="Admin">Admin</Option>
      <Option value="Cashier">Cashier</Option>
      <Option value="Mobile Attendant">Mobile Attendant</Option>
      <Option value="Supervisor">Supervisor</Option>
      <Option value="Waiter">Waiter</Option>
      {/*<Option value="Waitress">Waitress</Option> */}
  </Select>
         </Form.Item>
         </div>
 </div>

 
  <div className="grid">
         <div className="column column-12"><Text mark type="secondary">Select to Assign Task </Text>  </div>
         </div>
         <div className="grid"> 
          <div className="column column-4">  
        <Form.Item label="User Management">
          <Select
              mode="multiple" id="user"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChangeUser} >  
                <Option value="addUser">Add User</Option>
                <Option value="editUser">Edit User</Option> 
                <Option value="delUser">Delete User</Option> 
        </Select>
        </Form.Item> 
       </div>

       <div className="column column-4">  
        <Form.Item label="Sales">
            <Select
                  mode="multiple" id="sales"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChangeSales}> 
        
                    <Option value="addSales">Add Sales</Option>
                    <Option value="editSales">Edit Sales</Option> 
                    <Option value="delSales">Delete Sales</Option>
            </Select>
        </Form.Item> 
        </div>
       
        <div className="column column-4">    
            <Form.Item label="Menu">
                <Select
                      mode="multiple" id="menu"
                      style={{ width: '100%' }}
                      placeholder="Please select" 
                       onChange={this.handleChangeMenu}> 
            
                    <Option value="addMenu">Add Menu</Option>
                    <Option value="editMenu">Edit Menu</Option> 
                    <Option value="delMenu">Delete Menu</Option>  
                </Select>
            </Form.Item> 
       </div>

  </div> 
  
  <div className="grid">
          
      <div className="column column-4">    
        <Form.Item label="Supplier">
            <Select id="supplier" 
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                  onChange={this.handleChangeSupplier}  > 
              
              <Option value="addSupplier">Add Supplier</Option>
              <Option value="editSupplier">Edit Supplier</Option> 
              <Option value="delSupplier">Delete Supplier</Option>  
          </Select>
        </Form.Item> 
       </div>
        
       <div className="column column-4">    

          <Form.Item label="Hall">
                  <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select" 
                        id="hall" onChange={this.handleChangeHall}>  
                    <Option value="addHall">Add Hall</Option>
                    <Option value="editHall">Edit Hall</Option> 
                    <Option value="delHall">Delete Hall</Option>  
                </Select>
            </Form.Item> 
       </div>
       <div className="column column-4">  
        <Form.Item label="Seat">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select" 
                  id="seat"  onChange={this.handleChangeSeat}>  
              <Option value="addSeat">Add Seat</Option>
              <Option value="editSeat">Edit Seat</Option> 
              <Option value="delSeat">Delete Seat</Option>  
          </Select>
        </Form.Item> 
       
        </div>

 </div>
        <div className="grid">
 <div className="column column-12"> 
   <Form.Item>
          <Button  type="primary"  htmlType="submit">
         <Icon type="user-add" />   Save
          </Button>
    </Form.Item>  
  </div>
  
 </div> 
   
   </Form>
 </div>

 </div> 
   
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
return {
    createUser: (user) => dispatch(createUser(user))
}
}
export default connect(null,mapDispatchToProps)(CreateUser);
