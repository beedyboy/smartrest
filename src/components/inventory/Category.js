/**
 * Created by wawooh on 5/27/19.
 */
import React, { PureComponent } from 'react'
import {TableConfig, Styles} from '../../Config'

import { Table, Typography, Button, Input, Form, Divider,Select, Icon, Alert  } from 'antd';
  import * as actions from '../../store/actions/inventoryActions'
import {connect} from 'react-redux'
const {  Text } = Typography;
const Option = Select.Option;


class Kitchen extends PureComponent {
     state = {
        id:'', 
         name:'',
         kitchenId:'',
         create:true

    }
    reset =()=>{
           this.setState({
               ...this.state,
                 id:'',
                 name:'',
               kitchenId:'',
                 create:true
        })
    }

        handleChangeKitchen=(value) => {
              this.setState({
                kitchenId:value
              })
    }
   handleChange = (e) => {
       this.setState({
        name: e.target.value
       })
    }


    handleSubmit = (e) => {
        e.preventDefault();
       this.props.createCategory(this.state);
         if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

    }

        handleEdit = (data) => {
              this.setState({
                  ...this.state,
                        id: data.id,
                        kitchenId: data.kitchenId,
                        name: data.name,
                        create:data.create
              })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateCategory(this.state)
if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }



  componentDidMount(){
 
      this.props.fetchKitchen()
      this.props.fetchCategory()
  }

  render() {
       const { kitchens, kitchenCat, result} = this.props
       const {name,kitchenId} = this.state
       const enabled =    name.length > 0 && kitchenId;

 const columns = [

      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Kitchen Name',
        dataIndex: 'kitchen_name',
        key: 'kitchen_name'
      },

       {
        title: 'Date',
        key: 'date',
           render: (record)=> (
                <Text strong type="primary">{record.date} </Text>
           )
      },
     {
           title: 'Action',
        key: 'key',
           render: (record)=>  (
                <React.Fragment>

                    {/*{record.options}*/}
              <Button type="secondary" onClick={() => {
                const data = {
                    id: record.id,
                    name: record.name,
                    kitchenId: record.kitchenId,
                    create: false,
                };
              this.handleEdit(data)
              }}><Icon type="edit" />Edit</Button>
                </React.Fragment>
           )


          }


    ]
    return (
        <React.Fragment>
 <Divider type="horizontal">>Create a Category</Divider>
<div className="mother">
    <div className="child large-6 med-6 small-6">
 <Form layout="horizontal" onSubmit={this.state.create? this.handleSubmit : this.handleUpdate}>
       <Form.Item label="Select a kitchen" >

              <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a kitchen"
        optionFilterProp="children"
        onChange={this.handleChangeKitchen}
        value={this.state.kitchenId}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
      {kitchens && kitchens.map((kitchen, key) => {
               return (
            <Option key={kitchen.id} value={kitchen.id}> {kitchen.name} </Option>
            )
            }
            )}

      </Select>
             </Form.Item>

 <Form.Item label="Category name">
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
      </Form.Item>

         <Form.Item>
       <Button  type="secondary" style={Styles.button} onClick={this.reset} > Clear Kitchen</Button>

       <Button  type="primary"  style={Styles.button} disabled={!enabled} htmlType="submit">

              {this.state.create? "Add Category" : "Update Category"}
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

    <div className="child large-6 med-6 small-6">

<Table rowKey="id" dataSource={kitchenCat} columns={columns}  {...TableConfig}   bordered   title={() =>  <Text strong type="primary">Category List </Text>} />
    </div>


</div>

        </React.Fragment>
    )
  }
}

const mapStateToProps = (state)=> {

    return {

        result: state.form.result, 
        kitchens: state.inventory.kitchen,
        kitchenCat: state.inventory.kitchenCat,
        role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return { 
    fetchKitchen: ()=> dispatch(actions.fetchKitchen()),
    fetchCategory: ()=> dispatch(actions.fetchCategory()),
    createCategory: (data) => dispatch(actions.createCategory(data)),
    updateCategory: (data) => dispatch(actions.updateCategory(data)),
    // deleteUser: (id) => dispatch(actions.deleteUser(id))
}
}
export default
connect(mapStateToProps, mapDispatchToProps)(Kitchen);
