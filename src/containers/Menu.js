/**
 * Created by wawooh on 5/20/19.
 */
import React, { PureComponent } from 'react'
import {TableConfig, Styles} from '../Config'
import Kitchen from '../components/inventory/Kitchen'
import Category from '../components/inventory/Category'
import { Table, Typography, Button, Select, Form, Input, Divider, Icon, Alert  } from 'antd';
  import * as actions from '../store/actions/inventoryActions'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
const {  Text } = Typography;

const Option = Select.Option;
class Menu extends PureComponent {
     state = {
        id:'',
         category:'',
        price:'',
         item:'',
         create:true

    }
    reset =()=>{
           this.setState({
               ...this.state,
                 id:'',
                 item:'',
               price:'',
               category:'',
                 create:true
        })
    }
   handleChange = (e) => {
       this.setState({
        [e.target.id]: e.target.value
       })
    }

    handleChangeCategory=(value) => {
      this.setState({
        category:value
      })
    }
    handleSubmit = (e) => {
        e.preventDefault();
       this.props.createMenu(this.state);
         if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

    }

        handleEdit = (data) => {
              this.setState({
                  ...this.state,
                        id: data.id,
                        item: data.item,
                        price: data.price,
                        category: data.catId,
                        create:data.create
              })
        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateMenu(this.state)
if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }

  componentDidMount(){

      this.props.fetchCategory()
      this.props.fetchMenu()
  }

  render() {
      if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
          const {kitchenCat, menu,  result} = this.props

       const {item,price,category} = this.state
       const enabled =    category && item && price;

 const columns = [

      {
        title: 'Menu Name',
        dataIndex: 'item',
        key: 'item'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
     {
        title: 'Category',
        dataIndex: 'catName',
        key: 'catName'
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
                    item: record.item,
                    price: record.price,
                    catId: record.catId,
                    create: false
                };
              this.handleEdit(data)
              }}><Icon type="edit" />Edit</Button>
                </React.Fragment>
           )


          }


    ]
    return (
        <React.Fragment>

       <Helmet>
        <title>Menu Management</title>
        <meta name="description" content="Menu Management" />
    </Helmet>


<div className="mother">
    <div className="child large-12 med-12 small-12">

 <Kitchen />
    </div>
<div className="child large-12 med-12 small-12">

 <Category />
    </div>


    <div className="child large-4 med-4 small-4">

 <Divider type="horizontal">Create a Menu</Divider>
 <Form layout="vertical" onSubmit={this.state.create? this.handleSubmit : this.handleUpdate}>
          <Form.Item label="Select a category">
          <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a category"
        optionFilterProp="children"
        onChange={this.handleChangeCategory}
        value={this.state.category}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
      {kitchenCat && kitchenCat.map((category, key) => {
               return (
            <Option key={category.id} value={category.id}> {category.name} - {category.kitchen_name} </Option>
            )
            }
            )}

      </Select>
          </Form.Item>
 <Form.Item label="Menu Item">
          <Input id="item" value={this.state.item} onChange={this.handleChange} />
      </Form.Item>


             <Form.Item label="Price">
          <Input id="price" value={this.state.price} onChange={this.handleChange} />
      </Form.Item>


         <Form.Item>
       <Button  type="secondary" style={Styles.button} onClick={this.reset} > Clear Menu</Button>

       <Button  type="primary"  style={Styles.button} disabled={!enabled} htmlType="submit">
         <Icon type="user-add" />
              {this.state.create? "Add Menu" : "Update Menu"}
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

    <div className="child large-8 med-8 small-8">
<Table rowKey="id" dataSource={menu} columns={columns}  {...TableConfig}   bordered   title={() =>  <Text strong type="primary">Menu List </Text>} />
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
        products: state.inventory.products,
        menu: state.inventory.menu,
        kitchenCat: state.inventory.kitchenCat,
        role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: ()=> dispatch(actions.fetchCategory()),
    fetchAllProduct: ()=> dispatch(actions.fetchAllProduct()),
    fetchMenu: ()=> dispatch(actions.fetchMenu()),
    createMenu: (data) => dispatch(actions.createMenu(data)),
    updateMenu: (data) => dispatch(actions.updateMenu(data)),
    // deleteUser: (id) => dispatch(actions.deleteUser(id))
}
}
export default
connect(mapStateToProps, mapDispatchToProps)(Menu);
