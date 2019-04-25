        import React, { PureComponent } from 'react'
import {Styles} from '../Config'
        import {fetchSupplier} from '../store/actions/supplierActions'
        import {connect} from 'react-redux'
        import {Helmet} from "react-helmet";
// import moment from 'moment';
//         import PageLoading from '../components/loading/PageLoading'
        import PurchaseList from '../components/inventory/PurchaseList'
        import * as actions from '../store/actions/inventoryActions'
        import '../layout.css'

import {Divider,  Button, Select, Form, Input, DatePicker } from 'antd';
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
            purchased_date: '',
            transaction_type:'',
            create:true
        }


        handleTransType = (value)=> {
        this.setState({
        transaction_type:value
        })
        }


        handleEdit = (data) => {
             this.setState({
                 id:    data.id,
                 qty:   data.qty,
                item_name: data.item_name,
                cost_price: data.cost_price,
                supplierId: data.supplierId,
                purchased_date: data.purchased_date,
                transaction_type: data.transaction_type,
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

        handleDateChange = date => {
        let main = date.format('L');
            this.setState({
                purchased_date: main
            })

        };

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.createPurchases(this.state)

        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updatePurchases(this.state)

        }

        render() {
            // console.log(this.props)
        const {purchases,suppliers} = this.props
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
 <div className="column column-7" style={Styles.div}>

      <Form.Item
        validateStatus="error"
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
          label="Quantity" >
         <Input id="qty" value={this.state.qty} onChange={this.handleChange} />
      </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
<Button
            type="primary"
            htmlType="submit"
          >
              {this.state.create ? "Add" : "Save Update"}
          </Button>
        </Form.Item>



  </div>


      <div className="column column-5" style={Styles.div}>
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
           <DatePicker id="purchased_date"
                       onChange={this.handleDateChange}
                       selected={this.state.purchased_date }
                      dateFormat="yyyy/MM/dd"
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-calendar-date" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
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
 </div>
 </div>



 <div className="grid">

 <div className="column column-12">
     {/*<PageLoading/>*/}
<Divider orientation="center">Records</Divider>

 <PurchaseList purchases={purchases} click={this.handleEdit}/>

 </div>


 </div>


</React.Fragment>

        )
        }
        }


        const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        purchases: state.inventory.purchases,
        suppliers: state.supplier.suppliers
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
