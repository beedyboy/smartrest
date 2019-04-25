/**
 * Created by wawooh on 4/24/19.
 */
import React, {PureComponent} from 'react';
import {Styles} from '../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Button, Select, Form,  Spin } from 'antd';
// import shortid from 'shortid'
 import * as actions from '../store/actions/posActions'
import CartList from '../components/pos/CartList'
import CartTotal from '../components/pos/CartTotal'


const Option = Select.Option;

class POS extends PureComponent {
    constructor(props) {
    super(props);
    // this.lastFetchId = 0;
    // console.log(props);
    // props.fetchUser = debounce(props.fetchMenu, 800);
  }
  state = {
            type: true,
            waiter: '',
            menu:[],
            seat:'',
            invoice: '',
            tables: '',
            data: [],
            value: '',
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
    console.log(value)
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

        handleSubmit=(e)=>{
        e.preventDefault();
        // this.props.createTable(this.state.name, this.state.tname)
        //     this.handleOk('table')
        }


 componentDidMount(){
       this.props.fetchWaiters()
     this.props.getCartItem()
     this.props.getCartTotal()
 }


    render() {
     const {waiters,  data, menu, summary} = this.props
         const { fetching, value } = this.state;

        return (

        <div className="">
       <Helmet>
        <title>POS</title>
        <meta name="description" content="Sales Window" />
    </Helmet>

 <div className="grid" style={Styles.div}>

 <div className="column column-4" style={Styles.div}>


      <Switch onChange={this.handleOrderType} checkedChildren="Dine-In" unCheckedChildren="Take-Out" defaultChecked className="m-t-1" />

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
        {menu.map(d => <Option key={d.id}>{d.product_name}-{d.price}</Option>)}
      </Select>

   <Form.Item label="Assign Waiter" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Assign a waiter"
    optionFilterProp="children"
    onChange={this.handleChangeWaiter}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {waiters.map((waiter, key) => {
           return (
        <Option key={waiter.id} value={waiter.id}> {waiter.fullname} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>


<Button type="primary" style={Styles.button} >New Order</Button>

 </div>

 <div className="column column-4" style={Styles.div}>
    <CartList data={data} />
     <CartTotal summary={summary}/>

<Button type="danger" style={Styles.button} >Empty Cart</Button>

<Button type="primary" style={Styles.button} >Send Order</Button>

 </div>




 <div className="column column-4" style={Styles.div}>
Basket here
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
        summary: state.pos.cartTotal
    };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaiters: ()=> dispatch(actions.fetchWaiters()),
      fetchMenu: (value)=> dispatch(actions.fetchMenu(value)),
      getCartItem: ()=> dispatch(actions.getCartItem()),
      addToCart: (data)=> dispatch(actions.addToCart(data)),
      getCartTotal:()=> dispatch(actions.getCartTotal())

  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(POS);

