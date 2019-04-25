import React, { PureComponent } from 'react'
import {createSupplier} from '../../store/actions/supplierActions'
import {connect} from 'react-redux'

import { Typography,  Button, Form, Input } from 'antd';


const {  Text } = Typography;

class CreateSupplier extends PureComponent {
    state = {
        supplier_name: '',
        supplier_address: '',
        supplier_contact: '',
        contact_person: '',
        note: ''
    }
   handleChange = (e) => {
       this.setState({
        [e.target.id]: e.target.value
       })
    }


handleSubmit = (e) => {
        e.preventDefault();
        this.props.createSupplier(this.state);
        // console.log(this.state)
        this.setState({
         supplier_name: '',
        supplier_address: '',
        supplier_contact: '',
        contact_person: '',
        note: ''
        })
    }

  render() {
    // console.log(this.props)
    return (

 <div className="grid">

 <div className="column column-12">
          <Text type="secondary" strong >Create new supplier </Text>
    <Form layout="horizontal" onSubmit={this.handleSubmit}>

    <div className="grid">

 <div className="column column-12">
    <Form.Item  label="Supplier Name"  >
            <Input placeholder="Enter Full Name" id="supplier_name"  value={this.state.supplier_name} onChange={this.handleChange}/>
          </Form.Item>
        </div>
 </div>

 <div className="grid">
        <div className="column column-12">
         <Form.Item  label="Address"  >
            <Input placeholder="Enter Address" id="supplier_address"  value={this.state.supplier_address} onChange={this.handleChange}/>
          </Form.Item>
 </div>
 </div>

 <div className="grid">
        <div className="column column-6">
         <Form.Item  label="Supplier Contact"  >
            <Input placeholder="Enter Supplier Contact" id="supplier_contact"  value={this.state.supplier_contact} onChange={this.handleChange}/>
          </Form.Item>
 </div>

        <div className="column column-6">
         <Form.Item  label="Contact Person"  >
            <Input placeholder="Enter Contact Person" id="contact_person"  value={this.state.contact_person} onChange={this.handleChange}/>
          </Form.Item>
 </div>
 </div>

 <div className="grid">
        <div className="column column-12">
         <Form.Item  label="Note"  >
            <Input placeholder="Enter Note" id="note"  value={this.state.note} onChange={this.handleChange}/>
          </Form.Item>
 </div>
 </div>


        <div className="grid">
 <div className="column column-12">
   <Form.Item>
          <Button  type="primary"  htmlType="submit">
            Save
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
    createSupplier: (user) => dispatch(createSupplier(user))
}
}
export default connect(null,mapDispatchToProps)(CreateSupplier);
