/**
 * Created by wawooh on 5/27/19.
 */
import React, { PureComponent } from 'react'
import {TableConfig, Styles} from '../../Config'

import { Table, Typography, Radio, Button, Input, Select, Form, Icon, Alert  } from 'antd';
  import * as actions from '../../store/actions/inventoryActions'
import {connect} from 'react-redux'
const {  Text } = Typography;


const Option = Select.Option;
class Kitchen extends PureComponent {
     state = {
        id:'', 
        accept:'',
        type: 'No',
         name:'',
         create:true

    }
    reset =()=>{
           this.setState({
               ...this.state,
                 id:'',
        accept:'',
                 type: 'No',
                 name:'',
                 create:true
        })
    }
    handleAccept=(value) => {
      this.setState({
        accept:value
      })
    }

   handleChange = (e) => {
       this.setState({
        name: e.target.value
       })
    }
    handleBaseType = (e) => {
      const value = e.target.value
      this.setState({
          ...this.state,
          type:value
      })
  }


    handleSubmit = (e) => {
        e.preventDefault();
       this.props.createKitchen(this.state);
         if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

    }

        handleEdit = (data) => { 
              this.setState({
                  ...this.state,
                        id: data.id,
                        accept:data.accept,
                        name: data.name,
                        type: data.type,
                        create:data.create
              })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
            // console.log(this.state)
       this.props.updateKitchen(this.state)
if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }
        

  componentDidMount(){
 
      this.props.fetchKitchen()
  }

  render() {
       const { kitchen,  result} = this.props
       const {name, accept } = this.state;
       const enabled =    name.length > 0 &&  accept.length > 0; 
 const columns = [

      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Base',
        dataIndex: 'base',
        key: 'base'
      },
      {
        title: 'Accepts?',
        dataIndex: 'accept',
        key: 'accept'
      },
       {
        title: 'Date',
        key: 'created_at',
           render: (record)=> (
                <Text strong type="primary">{record.created_at} </Text>
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
                    accept: record.accept,
                    type: record.base,
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

<div className="mother">
    <div className="child large-5 med-5 small-5">
 <Text strong type="primary">Create a Kitchen </Text>
 <Form layout="horizontal" onSubmit={this.state.create? this.handleSubmit : this.handleUpdate}>

 <Form.Item label="Kitchen Name">
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
      </Form.Item>
      <Form.Item label="Make base Kitchen" >
        <Radio.Group defaultValue={this.state.type} value={this.state.type} buttonStyle="solid" onChange={this.handleBaseType}>
          <Radio.Button value="Yes">Yes</Radio.Button>
          <Radio.Button value="No">No</Radio.Button> 
        </Radio.Group>
       </Form.Item>
       <Form.Item label="Who Accepts?">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a position"
              optionFilterProp="children"   id="accept" name="accept"
              onChange={this.handleAccept} value={this.state.accept}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

            <Option value="Admin">Admin</Option>
            <Option value="Bartender">Bartender</Option>
            <Option value="Cashier">Cashier</Option>
            <Option value="KitchenAttendant">Kitchen Attendant</Option>
            <Option value="MobileAttendant">Mobile Attendant</Option>
            <Option value="Storekeeper">Store keeper</Option>
            <Option value="Supervisor">Supervisor</Option>
            <Option value="Waiter">Waiter</Option>
            {/*<Option value="Waitress">Waitress</Option> */}
        </Select>
       </Form.Item>
         <Form.Item>
       <Button  type="secondary" style={Styles.button} onClick={this.reset} > Clear Kitchen</Button>

       <Button  type="primary"  style={Styles.button} disabled={!enabled} htmlType="submit">

              {this.state.create? "Add Kitchen" : "Update Kitchen"}
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

    <div className="child large-7 med-7 small-7">

<Table rowKey="id" dataSource={kitchen} columns={columns}  {...TableConfig}   bordered   title={() =>  <Text strong type="primary">Kitchen List </Text>} />
    </div>


</div>

        </React.Fragment>
    )
  }
}

const mapStateToProps = (state)=> {

    return {

        result: state.form.result, 
        kitchen: state.inventory.kitchen,
        role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return { 
    fetchKitchen: ()=> dispatch(actions.fetchKitchen()),
    createKitchen: (data) => dispatch(actions.createKitchen(data)),
    updateKitchen: (data) => dispatch(actions.updateKitchen(data)),
    // deleteUser: (id) => dispatch(actions.deleteUser(id))
}
}
export default
connect(mapStateToProps, mapDispatchToProps)(Kitchen);
