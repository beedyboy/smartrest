import React, { PureComponent } from 'react'
import moment from 'moment';
import {Styles} from '../Config'
import {fetchSupplier} from '../store/actions/supplierActions'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import SaveButton from '../components/utility/SaveButton'
import PurchaseList from '../components/inventory/PurchaseList'
import * as actions from '../store/actions/inventoryActions'
import '../layout.css'

import {Divider,  Select, Form, Alert, Button,  Input, DatePicker } from 'antd';
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
class Purchases extends PureComponent {
        state = {
            id:'',
            qty:'',
            item_name: '',
            cost_price: '',
            supplierId:'',
            purchased_date: moment().format('YYYY-MM-DD'),
            transaction_type:'',
            note:'',
            unit:'',
            unitValue:'',
            create:true,
            redirect: false
  }


    reset=()=>{
            this.setState({
                ...this.state,
                 id:'',
            qty:'',
            item_name: '',
            cost_price: '',
            supplierId:'',
            purchased_date: moment().format('YYYY-MM-DD'),
            transaction_type:'',
            note:'',
            unit:'',
            unitValue:'',
            create:true,
            redirect: false
            })
    }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
        handleTransType = (value)=> {
        this.setState({
        transaction_type:value
        })
        }

     handleUnit = (value)=> {

        this.setState({
        unit:value
        })
        }

        handleEdit = (data) => {
             this.setState({
                 id:    data.id,
                 qty:   data.qty,
                item_name: data.item_name,
                cost_price: data.cost_price,
                supplierId: data.supplierId,
                purchased_date:data.purchased_date,
                transaction_type: data.transaction_type,
                unit: data.unit,
                note: data.note,
                create: data.create
             })
        }

        componentDidMount(){
                this.props.fetchPurchases()
             this.props.fetchSupplier()
        }

        handleChange = (e)=> {

        this.setState({
        [e.target.id]: e.target.value
        })

        }

        handleChangeSupplier=(value) => {
              this.setState({
                supplierId:value
              })
    }


        handleChangeStartDate = (evt, date) => {

    this.setState({
        purchased_date:date
    })
  }

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.createPurchases(this.state)
               if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updatePurchases(this.state)
             if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }
        }
            renderRedirect = () => {
                if (this.state.redirect) {
                  return <Redirect to='/pos' />
                }
  }
        render() {
 if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor" || position() === "StoreKeeper") {
    const dateFormat = 'YYYY/MM/DD';
   const {result,purchases,suppliers} = this.props

  const {item_name,qty, cost_price, supplierId,purchased_date, transaction_type,unit} = this.state
    const enabled =    item_name && supplierId && purchased_date.length > 0
                        && transaction_type.length > 0 &&
                           qty  && unit.length > 0 &&
                            cost_price.length > 0;
const selectAfter = (
  <Select defaultValue="Kg" value={this.state.unit} onChange={this.handleUnit} id="unit" style={{ width: 100 }}>
    <Option value="Bottle">Bottle(s)</Option>
    <Option value="Crate">Crate</Option>
    <Option value="Cup">Cup(s)</Option>
    <Option value="Carton">Carton</Option>
    <Option value="Dozen">Dozen</Option>
    <Option value="Gallon">Gallon</Option>
    <Option value="Kg">Kg</Option>
    <Option value="Litre">Litre</Option>
    <Option value="Pack">Pack</Option>
    <Option value="Piece">Piece(s)</Option>
    <Option value="Roll">Roll</Option>
  </Select>
);
 return (


<React.Fragment>
<Helmet>
       <title>Purchases | Raw Material</title>
       <meta name="description" content="Purchases Management" />
         </Helmet>
 <div className="grid" style={Styles.div}>
      <div className="column column-12">

     <Form  {...formItemLayout} onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>

 <div className="grid">
 <div className="column column-7">
      <Form.Item
        label="Item Name"
      >
         <Input id="item_name" value={this.state.item_name}  onChange={this.handleChange} />
      </Form.Item>

      <Form.Item
          label="Cost Price"
      >
         <Input id="cost_price" value={this.state.cost_price} onChange={this.handleChange} />
      </Form.Item>

 <Form.Item
          label="Quantity Purchased" >
         <Input id="qty"  addonAfter={selectAfter} value={this.state.qty} onChange={this.handleChange} />
      </Form.Item>


 <Form.Item
          label="Note" >
         <Input id="note" value={this.state.note} onChange={this.handleChange} />
      </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
              {this.state.create ?
                <SaveButton  buttonType="primary"  disabled={!enabled} name="Add" permission="addPurchases"/>
                    :
                  <SaveButton  buttonType="primary"  disabled={!enabled} name="Save Update" permission="editPurchases" />}
<Button style={{ marginLeft: 8 }} onClick={this.reset}>
              Clear
            </Button>
        </Form.Item>



  </div>


      <div className="column column-5">
  <Form.Item label="Transaction Type">
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a kitchen"
    optionFilterProp="children"
    onChange={this.handleTransType} id="transaction_type"
    value={this.state.transaction_type}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
        <Option value="Cash">Cash</Option>
        <Option value="Credit">Credit</Option>

  </Select>
               </Form.Item>


  <Form.Item label="Date">
           <DatePicker
          hintText="Date début"
          okLabel="OK"
          cancelLabel="cancel" selected={this.state.purchased_date }
          locale="fr" id="purchased_date"
         defaultValue={this.state.purchased_date? moment(this.state.purchased_date, dateFormat): moment()}

          onChange={this.handleChangeStartDate}
        />

      {/*<DatePicker*/}
                       {/*onChange={this.handleDateChange}*/}
                      {/**/}
                      {/*dateFormat="yyyy/MM/dd"*/}
      {/*dateRender={(current) => {*/}
        {/*const style = {};*/}
        {/*if (current.date() === 1) {*/}
          {/*style.border = '1px solid #1890ff';*/}
          {/*style.borderRadius = '50%';*/}
        {/*}*/}
        {/*return (*/}
          {/*<div className="ant-calendar-date" style={style}>*/}
            {/*{current.date()}*/}
          {/*</div>*/}
        {/*);*/}
      {/*}}*/}
    {/*/>*/}
          </Form.Item>

             <Form.Item label="Supplier">

           <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a supplier"
    optionFilterProp="children"
    onChange={this.handleChangeSupplier}
    value={this.state.supplierId}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {suppliers.map((supplier, key) => {
           return (
        <Option key={supplier.id} value={supplier.id}> {supplier.supplier_name} </Option>
        )
        }
        )}

  </Select>
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

 <div className="grid">

 <div className="column column-12">

    <Divider orientation="center">Records</Divider>

    <PurchaseList purchases={purchases} click={this.handleEdit}/>

 </div>

 </div>

</React.Fragment>
 )
            }
           return <NoAccess name={fullname()}/>
        }
        }

        const mapStateToProps = (state)=> {
        return {
        result: state.form.result,
        purchases: state.inventory.purchases,
        suppliers: state.supplier.suppliers,
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        createPurchases:(data)=>dispatch(actions.createPurchases(data)),
        updatePurchases:(data)=>dispatch(actions.updatePurchases(data)),
        fetchPurchases: ()=> dispatch(actions.fetchPurchases()),
        fetchSupplier: ()=> dispatch(fetchSupplier())
        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Purchases);
