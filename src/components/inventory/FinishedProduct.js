/**
 * Created by wawooh on 4/17/19.
 */
/**
 * Created by wawooh on 4/17/19.
 */
        import React, {PureComponent} from 'react'
        import {connect} from 'react-redux'
        import * as actions from '../../store/actions/inventoryActions'
        // import AllocationList from './AllocationList'
        import '../../layout.css'

import {  Button, Select, Alert, Form, Input } from 'antd';
const Option = Select.Option;

class FinishedProduct extends PureComponent {
 state = {
            id:'',
            qty:'',
            added_qty: '',
            kitchen: '',
            create:true
        }


    reset=()=>{
            this.setState({
                ...this.state,
               id:'',
            qty:'',
            added_qty: '',
            kitchen: '',
            create:true
            })
    }
        getProductByKitchen = (value) => {
        this.setState(({
             kitchen: value
             }))
            this.props.getProductByKitchen(value)
        }

        handleChange = (e)=> {
        this.setState({
        [e.target.id]: e.target.value
        })

        }

        handleProductChange=(value) => {
              this.setState({
                id:value
              })
    }

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.updateFinishedProduct(this.state)
              if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()
            }


        }


        componentDidMount(){
             //    this.props.fetchPurchases()
             // this.props.fetchAllocation()
        }

    render(){
            const {kitchenProducts, result} = this.props
const {id,qty, kitchen} = this.state
    const enabled =    qty  && id && kitchen.length > 0;
        return (
<div className="grid">
      <div className="column column-6">


        <Form layout="horizontal" onSubmit={this.handleSubmit}>


             <Form.Item label="Kitchen" >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a kitchen"
            optionFilterProp="children"
            onChange={this.getProductByKitchen}
            value={this.state.kitchen}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
        <Option value="Bar">Bar</Option>
        <Option value="Continental">Continental</Option>
        <Option value="Local">Local</Option>

  </Select>
         </Form.Item>


             <Form.Item label="Products" >

          <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a product"
                optionFilterProp="children"
                onChange={this.handleProductChange}
                 value={this.state.id}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {kitchenProducts.map((product, key) => {
           return (
        <Option key={product.id} value={product.id}> {product.product_name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>


         <Form.Item  label="Quantity"  >
            <Input id="qty" placeholder="Enter Quantity"  value={this.state.qty} onChange={this.handleChange} />
          </Form.Item>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit" disabled={!enabled}
          >
           Save Quantity
          </Button>

<Button style={{ marginLeft: 8 }} onClick={this.reset}>  Clear </Button>
        </Form.Item>
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
        items: state.inventory.purchases,
        kitchenProducts: state.inventory.kitchenProducts
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        updateFinishedProduct:(data)=>dispatch(actions.updateFinishedProduct(data)),
          getProductByKitchen: (kitchen)=> dispatch(actions.getProductByKitchen(kitchen))
        }
        }

export default  connect(mapStateToProps, mapDispatchToProps)(FinishedProduct);



