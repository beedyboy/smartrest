import React, { PureComponent } from 'react'
import * as actions from '../../store/actions/supplierActions'
import SupplierList from './SupplierList'
import {connect} from 'react-redux'

import { Typography,  Button, Alert, Form, Input } from 'antd';


const {  Text } = Typography;

class CreateSupplier extends PureComponent {
    state = {
        supplier_name: '',
        supplier_address: '',
        supplier_contact: '',
        contact_person: '',
        note: '',
        create: true
    }
    reset=()=>{
        this.setState({
            ...this.state,
             supplier_name: '',
        supplier_address: '',
        supplier_contact: '',
        contact_person: '',
        note: '',
        create: true
        })
    }
   handleChange = (e) => {
       this.setState({
        [e.target.id]: e.target.value
       })
    }
 
handleSubmit = (e) => {
        e.preventDefault();
        this.props.createSupplier(this.state);
       if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()
            }
    }

        handleSupplierEdit = (data) => {
             this.setState({
                 id:    data.id,
                supplier_name: data.supplier_name,
                supplier_address: data.supplier_address,
                supplier_contact: data.supplier_contact,
                contact_person: data.contact_person,
                note: data.note,
                create: data.create
             })
        }

        handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateSupplier(this.state)
             if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()
            }
        }
  render() {

      const {suppliers,role, result} = this.props
const {supplier_contact,contact_person,  supplier_name, supplier_address,create} = this.state
    const enabled =    supplier_name && supplier_contact.length>0  && contact_person.length > 0 && supplier_address.length > 0;

    return (

 <div className="grid">
 
 <div className="column column-7">
     <SupplierList suppliers={suppliers} role={role} click={this.handleSupplierEdit} />
 </div>
 <div className="column column-5">
          <Text type="secondary" strong >{create && create? "Create new supplier" :  "Update supplier"} </Text>
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
          <Button  type="primary"  htmlType="submit"  disabled={!enabled}>
            {create? "Save":"Update"}
          </Button>

            <Button style={{ marginLeft: 8 }} onClick={this.reset}>  Clear </Button>
    </Form.Item>
  </div>

 </div>

   </Form>
     {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}
 </div>

 </div>

    )
  }
}

const mapStateToProps = (state)=> {

    return {
        result: state.form.result,
      role: state.auth.role

    }
}
const mapDispatchToProps = (dispatch)=>{
return {
    createSupplier: (data) => dispatch(actions.createSupplier(data)),
    updateSupplier: (data) => dispatch(actions.updateSupplier(data)),

}
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateSupplier);
