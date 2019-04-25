/**
 * Created by wawooh on 4/17/19.
 */
        import React, {PureComponent} from 'react'
        import {connect} from 'react-redux'
        import * as actions from '../../store/actions/inventoryActions'
        import AllocationList from './AllocationList'
        import '../../layout.css'

import {  Button, Select, Form, Input } from 'antd';
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
class Allocate extends PureComponent {
 state = {
            id:'',
            qty:'',
            itemId: '',
            kitchen: '',
            create:true
        }


        handleKitchen = (value)=> {
        this.setState({
        kitchen:value
        })
        }


        handleChange = (e)=> {
        this.setState({
        [e.target.id]: e.target.value
        })

        }

        handleItemChange=(value) => {
              this.setState({
                itemId:value
              })
    }

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.createNewAllocation(this.state)

        }

        handleEdit = (data) => {
             this.setState({
                 id:    data.id,
                 qty:   data.qty,
                itemId: data.itemId,
                 kitchen:data.kitchen,
                create: data.create
             })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateAllocation(this.state)
        }

        componentDidMount(){
                this.props.fetchPurchases()
             this.props.fetchAllocation()
        }

    render(){
            const {items, allocations} = this.props
        return (
<div className="grid">
      <div className="column column-6">
      <Form   {...formItemLayout}  onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>
 <Form.Item label="Item Name">

           <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select an Item"
    optionFilterProp="children"
    onChange={this.handleItemChange}
    value={this.state.itemId}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {items && items.map((item, key) => {
           return (
        <Option key={item.id} value={item.id}> {item.item_name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>

             <Form.Item label="Kitchen" >
          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a kitchen"
    optionFilterProp="children"
    onChange={this.handleKitchen}
    value={this.state.kitchen}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
        <Option value="Bar">Bar</Option>
        <Option value="Continental">Continental</Option>
        <Option value="Local">Local</Option>

  </Select>
         </Form.Item>


 <Form.Item label="Quantity">
         <Input id="qty" value={this.state.qty} onChange={this.handleChange} />
      </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
              <Button type="primary" htmlType="submit" >
              {this.state.create ? "Add" : "Save Update"}
           </Button>
        </Form.Item>

      </Form>
        </div>

    <div className="column column-6">
<AllocationList allocation={allocations} click={this.handleEdit}/>
        </div>

</div>
        )
    }
}
    const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        items: state.inventory.purchases,
        allocations: state.inventory.allocations
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        createNewAllocation:(data)=>dispatch(actions.createNewAllocation(data)),
        updateAllocation:(data)=>dispatch(actions.updateAllocation(data)),
        fetchPurchases: ()=> dispatch(actions.fetchPurchases()),
        fetchAllocation: ()=> dispatch(actions.fetchAllocation())
        }
        }

export default  connect(mapStateToProps, mapDispatchToProps)(Allocate);
