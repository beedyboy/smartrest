/**
 * Created by wawooh on 4/30/19.
 */
import React, {PureComponent,Suspense } from 'react';
import {Styles} from '../../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Modal, Button, InputNumber, Select, Form, Card,Pagination, Spin, Divider, Icon } from 'antd';
import * as actions from '../../store/actions/posActions'
import * as hactions from '../../store/actions/hallActions'
import {fetchMenu}   from '../../store/actions/inventoryActions'
import PlateItem from '../utility/PlateItem'
import PageLoading from '../loading/PageLoading'
import CartList from './CartList'
import CartTotal from './CartTotal'
import shortId from 'shortid' 


const Option = Select.Option;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
      backgroundColor:'#85a5ff'
  }; 
const numEachPage = 10
let itemCount = 0;
let newplate = 0;
let plateOrder= [];
class Sales extends PureComponent {
    state = {
        type: true,
        minValue:0,
        maxValue: 10,
        waiter: '',
        menu: [],
        seat: '',
        invoice: '',
        table: '',
        data: [],
        localOrder:[],
        localQty:[],
        value: '',
        tname: '',
        plate:'',
        kitchen: '',
        modal: {
          add:false,
          edit: false,
          title: '',
          qty:1,
          id: ''
        },
        base:false,
        fetching: false,
    }


    showModal = (field) => {
        this.setState({
                ...this.state,
          modal:{
            ...this.state.modal,
          [field]: true
          }
        });
      }
    fetchMenu = (value) => { 
        this.setState({data: [], fetching: true});
        let data = this.props.fetchMenu(value)
        this.setState({data, fetching: false});
        // console.log('datas', data)
    }


    handleChange = (value, base, item, price) => { 
        let local =[...this.state.localOrder]
        // console.log(e)
        if(base === 'Yes'){
               var index  = local.indexOf(value);
            if(index === -1){
                // console.log("Does not exist") 
                let title = item+ " "+price
                this.setState({
                    ...this.state, 
                    modal:{
                        add:true,
                        id: value,
                        title:title
                    },
                    localOrder:local
                });
            
            }
            else{
                // console.log("INDEX", index)
                 local.splice(index,1); 
                let Qty =[...this.state.localQty]
                  Qty.splice(index,1);
                itemCount-=1 
                this.setState({
                    ...this.state,  
                    localOrder:local,
                    localQty:Qty
                });
                 
            }
            // console.log("ORDER", this.state.localOrder)
            // console.log("QTY", this.state.localQty)
        

        }
        else {
            this.setState({
                ...this.state,
                value, initLoading: true, 
                loading: false,
                data: [],
                list: [],
                fetching: false,
            });
            // console.log(e)
            this.props.addToCart(value)
        }
        
        
    }

    handleBaseQty = (value) => {  
        this.setState({
            ...this.state,  
            modal:{
                ...this.state.modal, 
                qty: value
            } 
        });
       
    }
    handleSubmitBase= (e) => { 
        e.preventDefault();
        let local =[...this.state.localOrder]
        let Qty =[...this.state.localQty]
        let value = this.state.modal.id
        itemCount+=1
        local.push(value)
        Qty.push(this.state.modal.qty? this.state.modal.qty: 1)
        this.setState({
            ...this.state, 
            base:true,
            modal:{
                ...this.state.modal,
                add:false,
                title:'',
                id: '',
                qty:1
            },
            localQty:Qty,
            localOrder:local
        });
        // console.log("DATA", this.state.localOrder)
        // console.log("QTY", this.state.Qty)
    }
    makePlate =(e) => {
        // console.log(this.state.localOrder) 
        this.props.addBaseToCart(this.state.localOrder, this.state.localQty)

            this.handleOk();
            let arr = []; 
                let Qty =[] 
                itemCount=0 
                this.setState({
                    ...this.state,  
                    localOrder:arr,
                    localQty:Qty,
                     modal:{
                        ...this.state.modal,
                        title:'',
                        id:'',
                        qty:1
                      } 
                });
    }
    editPlate = (plate)=> {
        newplate= plate
        // console.log("PLATE", plate)
        this.props.editPlateItem(plate)
       setTimeout(this.resolvePlate(),3000)
    }

    resolvePlate =()=>{
         let dd = this.props.OrderPlateItem
        if(dd.length < 1){
            this.handleOk('edit')
        }
        this.showModal('edit')
        console.log("DATA",dd)
        // let data = this.props.data && this.props.data.filter(d=> d.plate === parseInt(plate))
        
        // plateOrder= data
     
        // console.log(this.state)
        console.log("DATA",this.props.plateArray)
    }
    handleOk = (field) => {
        this.setState({
                ...this.state,
          modal:{
            ...this.state.modal,
            title:'',
            id:'',
            qty:1,
          [field]: false
          } 
        });
      }
    handleOrderType = (e) => {
        // console.log(e)
        this.setState({
            type: e
        })
    }


    handleChangeWaiter = (value) => {
        this.setState({
            waiter: value
        })
    }

    handleKitchen = (value) => {
        this.setState({
            kitchen: value
        })
    }

    getSeatByTable = (value) => {
        this.setState({
            table: value
        })
        this.props.getSeatByTable(value)
    }

    handleChangeSeat = (value) => {
        this.setState({
            seat: value
        })
    }


    handleSendOrder = (e) => {
        e.preventDefault();
        this.props.saveOrder(this.state)
    }

    // handlegetPlate = (plate,invoice) => {
        
    //     this.props.getPlate()
    // }

    emptyCart = () => {
        this.props.emptyCart()
    }
    removeCartItem = (data) => {
        this.props.deleteCartItem(data.id)
         
    }

    removePlateItem = (data) => {
        this.props.deleteCartItem(data.id)
        setTimeout(this.editPlate(newplate),3000)
       
    }
    quantityChange = (data) => {
                if (data.newQty !== ''){
                    this.props.quantityChange(data)
            }
    }

handlePageChange = value => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage
    });
  };
        componentDidMount(){

              if("receiptNumber" in localStorage)
              {
                     this.props.fetchWaiters()
                     this.props.getCartItem()
                     this.props.getCartTotal()
                     this.props.fetchTable()
              }
              else
                  {
                 this.handleReceipt()
               }
               this.props.fetchAllMenu()
 }
 componentWillMount(){

    this.props.fetchWaiters()
    this.props.fetchTable()
 }

         handleReceipt= ()=>{
             this.props.receiptNumber()
         }

    render() {
     const {waiters,  data, menu, summary, OrderPlateItem,  htables, settings} = this.props
         const { fetching, localOrder } = this.state;
     const enabled = data && data.length > 0;
     const plated = itemCount && itemCount > 0 && localOrder.length > 0;  
        plateOrder = OrderPlateItem 

        return (

        <React.Fragment>
       <Helmet>
        <title>Sales</title>
        <meta name="description" content="Sales" />
    </Helmet>

<div className="mother">
    <div className="child large-12 med-12 small-12
    ">
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


<div className="mother">
    <div className="child  large-4 med-4 small-4">

  <Divider type="horizontal">Search Menu</Divider>
<Form.Item label="Search menu by name" >
     <Select
         showSearch
        // value={value}
        placeholder="Select by menu name"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchMenu}
        // onClick={()=>this.handleChange(d.id, d.base)}
        // onChange={this.handleChange}
         style={Styles.select}
      >
        {menu && menu.map(d => <Option key={d.id}>{d.item}-{d.price}  {settings.currency}</Option>)}
      </Select>
</Form.Item> 
 
{plated?  <Button  type="primary" onClick={this.makePlate} style={Styles.button} htmlType="submit">Make Plate</Button>: 
    ''}
     <Card title="Menu List">
        
         {menu &&
          menu.length > 0 &&
          menu.slice(this.state.minValue, this.state.maxValue).map(val => (
              val.base === 'Yes'?  
              <React.Fragment  key={shortId.generate()} > 
    <Card.Grid className={this.state.localOrder.indexOf(val.id) > -1 ? "box green": "box"} key={shortId.generate()} onClick={(e)=>this.handleChange(val.id, val.base, val.item, val.price)}>
       {val.item} - {val.price} {settings.currency} 
        </Card.Grid>
         
             </React.Fragment> :
              <React.Fragment  key={shortId.generate()} >
                  <Card.Grid style={gridStyle}  key={shortId.generate()} onClick={()=>this.handleChange(val.id, val.base, val.item, val.price)}>
       {val.item} - {val.price} {settings.currency}
        </Card.Grid>
              </React.Fragment>
              
        ) )}

  </Card>
   
  
     <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          pageSize={numEachPage}
          onChange={this.handlePageChange}
          total={menu.length} //total number of card data available
        />

    </div>



<div className="child  large-8 med-8 small-8">

   <CartList settings={settings} data={data} remove={this.removeCartItem} changeQty={this.quantityChange} editPlate={this.editPlate} />
     <CartTotal settings={settings} summary={summary}/>
          {this.state.type ?
  <React.Fragment>

      <div className="mother">
        <div className="child  large-3 med-3 small-12">
            <Form.Item label="Assign Waiter" >

          <Select 
    showSearch
    style={{ width: 200}}
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
        </div>
        <div className="child  large-1 med-1 small-12">
            </div>
        <div className="child  large-3 med-3 small-12">
                  <Form.Item label="Tables" >

          <Select
    showSearch
    style={{ width: 150 }}
    placeholder="Select a table"
    optionFilterProp="children"
    onChange={this.getSeatByTable}
    value={this.state.table}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {htables && htables.map((table, key) => {
           return (
        <Option key={table.id} value={table.id}> {table.tname} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>
        </div>

       

    </div>




 </React.Fragment> : ''
          }

            <React.Fragment>
<Button type="danger" style={Styles.button} onClick={this.emptyCart} >Empty Cart</Button>

<Button type="primary" style={Styles.button} disabled={!enabled} onClick={this.handleSendOrder} >Send Order</Button>
            </React.Fragment>

    </div>

</div>


<React.Fragment>
<Suspense fallback={<PageLoading/>}>
    <Modal
        title={this.state.modal.title}
        visible={this.state.modal.add} 
        onOk={() => this.handleOk('add')} 
        onCancel={() => this.handleOk('add')} 
        okText=""
        width="240px"
    >
        <Form layout="horizontal"
              onSubmit={this.handleSubmitBase}>

            <Form.Item label="Quantity">
                <InputNumber id="qty"
                      min={1} max={10} defaultValue="1"
                       onChange={this.handleBaseQty}/>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit" 
                >
                    Add
                </Button>
            </Form.Item>
        </Form>

      
    </Modal>
</Suspense>
</React.Fragment>


<React.Fragment>
<Suspense fallback={<PageLoading/>}>
    <Modal
        title="Plate Details"
        visible={this.state.modal.edit} 
        onOk={() => this.handleOk('edit')} 
        onCancel={() => this.handleOk('edit')} 
        okText=""
        width="340px"
    >

    <PlateItem remove={this.removePlateItem} plateOrder={plateOrder}/>  

    {/* <table>
    <thead>
                         <tr className="tabletitle" key={shortId.generate()}> 
                            <td className="item"><h2>Item</h2></td>
                            <td className="item"><h2>Qty</h2></td>
                            <td className="item"><h2>Amount</h2></td>
                            <td className="item"><h2>Action</h2></td>
                          </tr>
                       </thead>

                       <tbody>

    {plateOrder && plateOrder.map((order, key) => {
           return (
        <tr key={shortId.generate()}>
            <td>{order.menu_name}</td>
            <td>{order.qty}</td>
            <td>{order.total}</td>
            <td>
            <Button type="danger" onClick={() => {
                    const data = { id: order.id };  
                    this.removePlateItem(data)  
                } } >
                  <Icon type="delete" theme="twoTone" />
                  </Button>  
               
               </td>

        </tr>
        )
        }
        )}

</tbody>
    </table>

       */}
    </Modal>
</Suspense>
</React.Fragment>


        </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        waiters:state.pos.waiters,
        menu: state.pos.menu,
        allMenuList: state.inventory.menu,
        data: state.pos.cart,
        plateArray: state.pos.plateArray,
        OrderPlateItem: state.pos.OrderPlateItem,
        summary: state.pos.cartTotal,
        receiptNumber: state.pos.receiptNumber,
        htables: state.hall.table,
        seats: state.hall.seat
    };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaiters: ()=> dispatch(actions.fetchWaiters()),
      fetchMenu: (value)=> dispatch(actions.fetchMenu(value)),
      fetchAllMenu: ()=> dispatch(fetchMenu()),
      getCartItem: ()=> dispatch(actions.getCartItem()),
    //   getPlate: ()=> dispatch(actions.getPlate()),
      addToCart: (data)=> dispatch(actions.addToCart(data)),
      editPlateItem: (plate)=> dispatch(actions.editPlateItem(plate)),
      addBaseToCart: (order, quantity)=> dispatch(actions.addBaseToCart(order, quantity)),
      getCartTotal:()=> dispatch(actions.getCartTotal()),
      receiptNumber:()=> dispatch(actions.receiptNumber()),
        fetchTable: ()=> dispatch(hactions.fetchTable()),
        getSeatByTable:(tid)=>dispatch(hactions.getSeatByTable(tid)),
      saveOrder:(data)=>dispatch(actions.saveOrder(data)),
      emptyCart:()=> dispatch(actions.emptyCart()),
      deleteCartItem:(id)=>dispatch(actions.deleteCartItem(id)),
      quantityChange:(data)=>dispatch(actions.quantityChange(data))


  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(Sales);

