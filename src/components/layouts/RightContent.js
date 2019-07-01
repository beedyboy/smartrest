/**
 * Created by wawooh on 4/30/19.
 */
import React, {PureComponent} from 'react';
import {Styles} from '../../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Button, Select, Form,  Spin, Divider, Icon, Row, Col } from 'antd';
 import * as actions from '../../store/actions/posActions'
        import * as hactions from '../../store/actions/hallActions'
import CartList from './CartList'
import CartTotal from './CartTotal'


const Option = Select.Option;

class Sales extends PureComponent {
  state = {
            type: true,
            waiter: '',
            menu:[],
            seat:'',
            invoice: '',
            tables: '',
            data: [],
            value: '',
            name: '',
            tname: '',
            fetching: false,
  }

  fetchMenu = (value) => {

    this.setState({ data: [], fetching: true });
   let data= this.props.fetchMenu(value)
    this.setState({ data, fetching: false });
 console.log('datas',data)
  }


handleChange = (value) => {
    this.setState({
      value,initLoading: true,
    loading: false,
    data: [],
    list: [],
      fetching: false,
    });
    // console.log(value)
    this.props.addToCart(value)
  }

    handleOrderType = (e) => {
        console.log(e)
        this.setState({
            type: e
        })
    }

      handleChangeWaiter=(value) => {
              this.setState({
                waiter:value
              })
    }

        getTableByZone = (value) => {
            this.setState({
                name:value
             })
            this.props.getTableByHall(value)
        }
        handleChangeZone=(value) => {
              this.setState({
                name:value
              })
    }


        handleSubmit=(e)=>{
        e.preventDefault();
        // this.props.createTable(this.state.name, this.state.tname)
        //     this.handleOk('table')
        }


 componentDidMount(){
      if("receiptNumber" in localStorage){
             this.props.fetchWaiters()
     this.props.getCartItem()
     this.props.getCartTotal()
      } else{
this.handleReceipt()
      }

 }

 handleReceipt= ()=>{
     this.props.receiptNumber()
 }

    render() {
     const {waiters,  data, menu, summary, zones,tables, htables} = this.props
         const { fetching, value } = this.state;
        return (

        <div className="">
       <Helmet>
        <title>Sales</title>
        <meta name="description" content="Sales" />
    </Helmet>
            <div className="grid">
                <div className="column column-12">
                      {/*<Divider orientation="right"/>*/}
<Form layout="inline">
<Form.Item label="Order Type" >
      <Switch onChange={this.handleOrderType} checkedChildren="Dine-In" unCheckedChildren="Take-Out" defaultChecked className="m-t-1" />
</Form.Item>


<Button  onClick={this.handleReceipt} style={Styles.button} >
    <Icon type="retweet" />New Order</Button>


</Form>


                </div>
            </div>
 <div className="grid">


 <div className="column column-8" style={Styles.div}>
    <CartList data={data} />
     <CartTotal summary={summary}/>
<Row gutter={16}>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
   <Form.Item label="Assign Waiter" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Assign a waiter"
    optionFilterProp="children"
    onChange={this.handleChangeWaiter}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {waiters && waiters.map((waiter, key) => {
           return (
        <Option key={waiter.id} value={waiter.id}> {waiter.fullname} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>
      </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>

             <Form.Item label="Zones" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a zone"
    optionFilterProp="children"
    onChange={this.getTableByZone}
    value={this.state.name}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {zones && zones.map((zone, key) => {
           return (
        <Option key={zone.id} value={zone.id}> {zone.name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>

      </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
             <Form.Item label="Tables" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a table"
    optionFilterProp="children"
    onChange={this.handleChangeTable}
    value={this.state.tname}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {htables.map((table, key) => {
           return (
        <Option key={table.id} value={table.id}> {table.name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>
      </Col>
</Row>

<Button type="danger" style={Styles.button} >Empty Cart</Button>

<Button type="primary" style={Styles.button} >Send Order</Button>

 </div>




 <div className="column column-4" style={Styles.div}>
     <Divider type="horizontal">Search Menu</Divider>
<Form.Item label="Search menu by name" >
     <Select
         showSearch
        value={value}
        placeholder="Select by menu name"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchMenu}
        onChange={this.handleChange}
         style={Styles.select}
      >
        {menu && menu.map(d => <Option key={d.id}>{d.product_name}-{d.price}</Option>)}
      </Select>
</Form.Item>


 </div>

 </div>


        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        waiters:state.pos.waiters,
        menu: state.pos.menu,
        data: state.pos.cart,
        summary: state.pos.cartTotal,
        receiptNumber: state.pos.receiptNumber,
        zones: state.hall.zone,
        htables: state.hall.htables,
    };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaiters: ()=> dispatch(actions.fetchWaiters()),
      fetchMenu: (value)=> dispatch(actions.fetchMenu(value)),
      getCartItem: ()=> dispatch(actions.getCartItem()),
      addToCart: (data)=> dispatch(actions.addToCart(data)),
      getCartTotal:()=> dispatch(actions.getCartTotal()),
      receiptNumber:()=> dispatch(actions.receiptNumber()),
        getTableByHall:(hid)=>dispatch(hactions.getTableByHall(hid))

  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(Sales);

