
import React, {PureComponent,Suspense } from 'react';
import {Styles} from '../../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Modal, Button, Tabs, Select, Form, Card, notification, Pagination, Spin, Divider, Icon } from 'antd';
import * as actions from '../../store/actions/posActions'
import * as hactions from '../../store/actions/hallActions'
import * as iactions  from '../../store/actions/inventoryActions'
import PlateItem from '../utility/PlateItem'
import PageLoading from '../loading/PageLoading'
import CartList from './CartList'
import CartTotal from './CartTotal'
import shortId from 'shortid' 


const TabPane = Tabs.TabPane;

const Option = Select.Option;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
      backgroundColor:'#85a5ff'
  };
  const input = {
    width: '30%',
    fontSize: '15',
    border:'2px solid #000',
      backgroundColor:'#85a5ff',
      color:'white'
  }; 
const numEachPage = 10
let itemCount = 0;
let newplate = 0;
let plateOrder= [];

function callback(key) {
    console.log(key);
  }
  let menuFrame = []
class Sales extends PureComponent {
    state = {
        type: true,  
        waiter: '',
        menu: [],
        menuFrame:[],
        seat: '',
        invoice: '',
        table: '',
        data: [],
        localOrder:[],
        localQty:[],
        qty: 1,
        value: '',
        tname: '',
        plate:'',
        kitchen: '',
        modal: {
          add:false,
          edit: false,
          title: '', 
          id: ''
        },
        base:false,
        fetching: false,
    loading: false
    }

    reset = () => {

       this.setState({
           ...this.state,
            type: true,  
        waiter: '',
        menu: [],
        menuFrame:[],
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
        qty: 1,
        modal: {
          add:false,
          edit: false,
          title: '', 
          id: ''
        },
        base:false,
        fetching: false, 
    loading: false
       });
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
    fetchMenu = (id,value) => { 
        let data = this.props.fetchMenu(id,value)
        this.setState({data: [], fetching: true});
        menuFrame['menu'+id] = this.props.menu
        this.setState({data, fetching: false, menuFrame:menuFrame});
        // console.log('datas', data)
        // console.log('v', menuFrame.menu5)
    }


    handleChange = (value, base, item, price) => { 
        let local =[...this.state.localOrder] 
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

   
    handleBaseQty = (e) => {  
       
       let { value, min, max} = e.target;
       value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({
            ...this.state,  
           qty: value
        });
        // console.log(value)
       
    }
    handleSubmitBase= (e) => { 
        e.preventDefault();
        let local =[...this.state.localOrder]
        let Qty =[...this.state.localQty]
        let value = this.state.modal.id
        itemCount+=1
        local.push(value)
        Qty.push(this.state.qty? this.state.qty: 1)
        this.setState({
            ...this.state, 
            base:true,
            qty: 1,
            modal:{
                ...this.state.modal,
                add:false,
                title:'',
                id: '' 
            },
            localQty:Qty,
            localOrder:local
        });
        
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
                    qty:1,
                     modal:{
                        ...this.state.modal,
                        title:'',
                        id:''
                      } 
                });
    }
    editPlate = (plate)=> {
        newplate= plate 
        this.props.editPlateItem(plate)
       setTimeout(this.resolvePlate(),3000)
    }

    resolvePlate =()=>{
         let dd = this.props.OrderPlateItem
        if(dd.length < 1){
            this.handleOk('edit')
        }
        this.showModal('edit')
        // console.log("DATA",dd)
        // let data = this.props.data && this.props.data.filter(d=> d.plate === parseInt(plate))
        
        // plateOrder= data
     
        // console.log(this.state)
        // console.log("DATA",this.props.plateArray)
    }
    handleOk = (field) => {
        this.setState({
                ...this.state,
            qty:1,
          modal:{
            ...this.state.modal,
            title:'',
            id:'',
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
        let type = this.state.type;
     
        if(type === true){
        let table = this.state.table;
        let waiter = this.state.waiter;
            if(table  && waiter)
            {
        this.setState({ loading: true }); 
                this.props.saveOrder(this.state)
                   setTimeout(() => {
                    this.setState({
                      selectedMenu: [],
                      loading: false,
                    });
                  }, 1000);
            }else {
                notification.success({
                    placement: 'topRight',
                    top: 44,
                    message: 'Error Message',
                    description: 'Waiter and table name cannot be empty',
                    style: {
                        width: 400,
                        backgroundColor: 'red',
                        color: 'white'
                    },
                });
            }

        }  else { //take out
            this.props.saveOrder(this.state)
        }


        
    }

   

    emptyCart = () => {
        this.props.emptyCart()
    }
    removeCartItem = (data) => {
        this.props.deleteCartItem(data.id,  data.ord_type, data.plate, data.invoice)
         
    }

    removePlateItem = (data) => {
      this.props.deleteCartItem(data.id, data.ord_type, data.plate, data.invoice)
      setTimeout(this.editPlate(newplate), 3000)
       
    }
    localPlusMinus = (plate, invoice_number) => {
                 this.props.localPlusMinus(plate, invoice_number)
    }

     quantityChange = (data) => {
                if (data.newQty !== ''){
                    this.props.quantityChange(data)
            }
    }
processDiscount = (data) => {
                   this.props.processDiscount(data)
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
                    //  this.props.getKitchenFromMenu()
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
    this.props.getKitchenFromMenu()
 }

         handleReceipt= ()=>{
             console.log("ORDER", "order");
             this.props.receiptNumber()
         }

    render() {
     const {waiters,  data, summary, OrderPlateItem,  htables, settings, menuCategory} = this.props
         const { fetching, localOrder,loading } = this.state;
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
    <div className="child large-12 med-12 small-12">
                    <Tabs type="card" defaultKey="11">
                                <TabPane tab={<span><Icon type="shopping-cart" />Sales Point</span>} key="11">
                                 
                                <div className="mother">
 <div className="child large-12 med-12 small-12">
            <Form layout="inline">
            <Form.Item label="Order Type" >
                  <Switch onChange={this.handleOrderType} checkedChildren="Dine-In" unCheckedChildren="Take-Out" defaultChecked className="m-t-1" />
            </Form.Item>
  
            <Button  onClick={this.handleReceipt} style={Styles.button} >
                <Icon type="retweet" />New Order</Button>

 
            </Form>
 
    </div>

</div>

{/* dowm part */}
<div className="mother">
    <div className="child  large-4 med-4 small-4">
 <Tabs onChange={callback} type="card" style={{backgroundColor:'#08979c', fontWeight: 'bolder'}} defaultKey="1">
    {menuCategory && menuCategory.map(data=>(
    <TabPane tab={<span><Icon type="coffee" /> {data.kitchen}</span>}   key={data.id}>

<Divider type="horizontal">Search  {data.kitchen} Menu</Divider>
<Form.Item label="Search menu by name" >
     <Select
         showSearch
        // value={value}
        placeholder="Select by menu name"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        // onSearch={this.fetchMenu}
        onSearch={(value)=>this.fetchMenu(data.id,value)}
        // onChange={this.handleChange}
         style={Styles.select}
      >
        {menuFrame['menu'+data.id] && menuFrame['menu'+data.id].map(d => <Option key={d.id}>{d.item}-{d.price}  {settings.currency}</Option>)}
      </Select>
</Form.Item> 
 
{plated?  <Button  type="primary" onClick={this.makePlate} style={Styles.button} htmlType="submit">Make Plate</Button>: 
    ''}
     <Card title="Menu List">
        
         {menuFrame['menu'+data.id] &&
          menuFrame['menu'+data.id].length > 0 &&
          menuFrame['menu'+data.id].slice(this.state.minValue, this.state.maxValue).map(val => (
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
          total={menuFrame['menu'+data.id] && menuFrame['menu'+data.id].length} //total number of card data available
        />

    </TabPane>
        ))}
  </Tabs>

   

    </div>

{/* right hand */}

<div className="child  large-8 med-8 small-8">
                                        

   <CartList settings={settings} data={data} remove={this.removeCartItem} localPlusMinus={this.localPlusMinus} useDiscount={this.processDiscount} changeQty={this.quantityChange} editPlate={this.editPlate} />
     <CartTotal settings={settings} summary={summary}/>
          {this.state.type ?
  <React.Fragment>
{/* save button and assign */}
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

<Button type="primary" style={Styles.button} disabled={!enabled}  loading={loading} onClick={this.handleSendOrder} >Send Order</Button>
            </React.Fragment>

    </div>

</div>
  </TabPane>
   <TabPane tab={<span><Icon type="shopping-cart" />Cart</span>} key="12">
                                <CartList settings={settings} data={data} remove={this.removeCartItem} localPlusMinus={this.localPlusMinus} useDiscount={this.processDiscount} changeQty={this.quantityChange} editPlate={this.editPlate} />
                                <CartTotal settings={settings} summary={summary} />
       </TabPane>                        
</Tabs>
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
                 
        <input id="qty" style={input} type="number" min="1" max="20"
                 value={this.state.qty}   onChange={this.handleBaseQty}/>
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
        menuCategory: state.inventory.menuCategory,
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
      fetchMenu: (id,value)=> dispatch(actions.fetchMenu(id,value)),
      fetchAllMenu: ()=> dispatch(iactions.fetchMenu()),
      getKitchenFromMenu: ()=> dispatch(iactions.getKitchenFromMenu()),
      getCartItem: ()=> dispatch(actions.getCartItem()), 
      addToCart: (data)=> dispatch(actions.addToCart(data)),
      editPlateItem: (plate)=> dispatch(actions.editPlateItem(plate)),
      addBaseToCart: (order, quantity)=> dispatch(actions.addBaseToCart(order, quantity)),
      getCartTotal:()=> dispatch(actions.getCartTotal()),
      receiptNumber:()=> dispatch(actions.receiptNumber()),
        fetchTable: ()=> dispatch(hactions.fetchTable()),
        getSeatByTable:(tid)=>dispatch(hactions.getSeatByTable(tid)),
      saveOrder:(data)=>dispatch(actions.saveOrder(data)),
      emptyCart:()=> dispatch(actions.emptyCart()),
      deleteCartItem:(id, ord_type, plate, invoice)=>dispatch(actions.deleteCartItem(id, ord_type, plate, invoice)),
      quantityChange:(data)=>dispatch(actions.quantityChange(data)),
      processDiscount:(data)=>dispatch(actions.processDiscount(data)),
      localPlusMinus:(plate, invoice)=>dispatch(actions.localPlusMinus(plate, invoice))


  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(Sales);

