/**
 * Created by wawooh on 4/17/19.
 */
        import React, {PureComponent} from 'react'
        import {connect} from 'react-redux'
        import * as actions from '../../store/actions/inventoryActions'
        import AllocationList from './AllocationList'
        import SaveButton from '../../components/utility/SaveButton'
        import '../../layout.css'

import {  Typography, Select, Button,Alert,  Form, Input } from 'antd';
const {  Text } = Typography;
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
            unit: '',
            create:true
        }


        reset=()=> {
            this.setState({
                ...this.state,
             id:'',
            qty:'',
            itemId: '',
            kitchen: '',
            unit: '',
            create:true
            })
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

 handleUnit = (value)=> {
            console.log(value)
        this.setState({
        unit:value
        })
        }

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.createNewAllocation(this.state)
              if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }


        }

        handleEdit = (data) => {
             this.setState({
                 id:    data.id,
                 qty:   data.qty,
                 unit:   data.unit,
                itemId: data.itemId,
                 kitchen:data.kitchen,
                create: data.create
             })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateAllocation(this.state)
              if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }

        componentDidMount() {
            this.props.fetchPurchases()
            this.props.fetchAllocation()
        }

    render(){
const {itemId,qty, kitchen,unit} = this.state
    const enabled =    itemId &&   qty  && unit.length > 0 && kitchen.length > 0;
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
 const {items, allocations, role, result} = this.props
        return (
<div className="grid">
      <div className="column column-6">
          <Text strong type="primary">Allocate to Kitchens</Text>

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
          <Input id="qty"  addonAfter={selectAfter} value={this.state.qty} onChange={this.handleChange} />
      </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
           {this.state.create ?
                <SaveButton role={role} disabled={!enabled} buttonType="primary" name="Add" permission="addToKitchen"/>
                    :
                  <SaveButton role={role} disabled={!enabled} buttonType="primary" name="Save Update" permission="addPurchases" />}

<Button style={{ marginLeft: 8 }} onClick={this.reset}>
              Clear
            </Button>
        </Form.Item>

      </Form>
          {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}
        </div>

    <div className="column column-6">
<AllocationList role={role} allocation={allocations} click={this.handleEdit}/>
        </div>

</div>
        )
    }
}
    const mapStateToProps = (state)=> {
        return {
        result: state.form.result,
        items: state.inventory.purchases,
        allocations: state.inventory.allocations,
        role: state.auth.role
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
