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

import {  Button, Select, Form, Input } from 'antd';
const Option = Select.Option;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 },
//   },
// };
class FinishedProduct extends PureComponent {
 state = {
            id:'',
            qty:'',
            added_qty: '',
            kitchen: '',
            create:true
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

        }


        componentDidMount(){
             //    this.props.fetchPurchases()
             // this.props.fetchAllocation()
        }

    render(){
            const {kitchenProducts} = this.props
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
            htmlType="submit"
          >
           Save Quantity
          </Button>
        </Form.Item>
        </Form>

        </div>


</div>
        )
    }
}
    const mapStateToProps = (state)=> {
        // console.log(state)
        return {
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



