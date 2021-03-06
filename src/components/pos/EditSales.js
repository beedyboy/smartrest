 
import React, {PureComponent,Suspense } from 'react';  
import {Styles} from '../../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Modal, Button, Tabs, Select, Form, Card,Pagination, Spin, notification, Divider, Icon } from 'antd';
import * as actions from '../../store/actions/posActions'
import * as hactions from '../../store/actions/hallActions'
import * as iactions  from '../../store/actions/inventoryActions'
import {getSystemSettings} from '../../store/actions/settingsActions'
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

class EditSales extends PureComponent {
    state = {
        id:'',
        done: false,
        type: '',  
        waiter: '',
        menu: [],
        menuFrame:[],
        seat: '',
        ord_type:'',
        invoice: '',
         table: '',
        data: [], 
        localOrder:[],
        localQty:[],
        qty: 1,
        value: '',
        tname: '',
        kitchen: '',
        modal: {
            add:false,
            edit: false,
            title: '', 
            id: ''
        },
        base:false,
        fetching: false,
        loading:false
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
}
     

    handleChange = (value, base, item, price) => { 
        let local =[...this.state.localOrder] 
        if(base === 'Yes'){
             var index  = local.indexOf(value);
            if(index === -1){
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
                let arr = local.splice(index,1); 
                let Qty =[...this.state.localQty]
                 Qty.splice(index,1);
                itemCount-=1 
                this.setState({
                    ...this.state,  
                    localOrder:local,
                    localQty:Qty
                });
                console.log(" REMOVED", arr)
                console.log("NEW AFTER REMOVED", local) 
            }
            
        

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
                qty:1,
            modal:{
                ...this.state.modal,
                add:false,
                title:'',
                id: '',
            },
            localQty:Qty,
            localOrder:local
        });
        console.log("DATA", this.state.localOrder)
        console.log("QTY", this.state.Qty)
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
                        id:'',
                      } 
                });
    }
     editPlate = (plate) => {
         newplate = plate
         this.props.editPlateItem(plate)
         setTimeout(this.resolvePlate(), 3000)
     }

     resolvePlate = () => {
         let dd = this.props.OrderPlateItem
         if (dd.length < 1) {
             this.handleOk('edit')
         }
         this.showModal('edit')
        
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
        const tid = parseInt(value)
         console.log("TABLE", tid)
        this.setState({
            table: tid
        })
        // this.props.getSeatByTable(value)
        // console.log("STATE",this.state)
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
                this.props.saveEditOrder(this.state)
                 setTimeout(() => {
                    this.setState({ 
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
            this.props.saveEditOrder(this.state)
        }
    }

    emptyCart = () => {
        this.props.emptyCart()
    }
    removeCartItem = (data) => {
        this.props.deleteCartItem(data.id, data.ord_type, data.plate, data.invoice)

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

        componentDidMount(){ 
           this.props.getSystemSettings()
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

    newMethod=()=> {
        
        const order = this.props.order; 
        let datas = [];
        order && order.forEach(function (val, index) {
            datas['id'] = order[index].id;
            datas['period'] = order[index].period;
            datas['table'] = order[index].tid; 
            datas['amount'] = order[index].amount;
            datas['kitchen'] = order[index].kitchen;
            datas['waiter'] = order[index].waiterId;
            datas['ord_type'] = order[index].ord_type;
            datas['created_at'] = order[index].created_at;
            datas['created_by'] = order[index].created_by;
            datas['updated_by'] = order[index].updated_by;
            datas['updated_at'] = order[index].updated_at;
            console.log("ord_type", order[index].ord_type);
        });
        this.handleOrder(datas);
    }

         componentWillMount(){
            this.props.fetchWaiters()
            this.props.fetchTable()
            this.props.getKitchenFromMenu()
            this.props.fetchSavedInvoice()
         }
     
         handleReceipt= ()=>{
            
             this.props.receiptNumber()
         }
        handleOrder = (data)=>{
            var ord = data.ord_type

            let ord_type = '';
            if(ord === "Dine-In"){
                ord_type= true
            }
            else{
                ord_type=false

            }
            const count = this.props.order.length
            let done = false
            if(count > 0){  done= true}
            this.setState({
                ...this.state,
                id:data.id,
                done: done,
                waiter:data.waiter? data.waiter: '', 
                table:data.table? data.table: '',
                kitchen:data.kitchen,
                ord_type:ord_type
            })
            console.log("Data count", ord_type)

        }
        
        componentDidUpdate(){
            const order = this.props.order;
            const done = this.state.done;
        // console.log("ORDER", order);
        let datas = [];
        order && order.forEach(function (val, index) {
            datas['id'] = order[index].id;
            datas['period'] = order[index].period;
            datas['table'] = order[index].tid; 
            datas['amount'] = order[index].amount;
            datas['kitchen'] = order[index].kitchen;
            datas['waiter'] = order[index].waiterId;
            datas['ord_type'] = order[index].ord_type;
            datas['created_at'] = order[index].created_at;
            datas['created_by'] = order[index].created_by;
            datas['updated_by'] = order[index].updated_by;
            datas['updated_at'] = order[index].updated_at;
            console.log("i", order[index].ord_type);
        });

        if(done === false ){ 
            this.handleOrder(datas);
            // console.log("False Data", datas)
        }
           
        }
    render() {
        //  console.log("DONE", this.state.done);

         const {waiters,  data,  summary, OrderPlateItem,  htables, settings, menuCategory} = this.props
         const { fetching, localOrder , type, loading} = this.state;
     const enabled = data && data.length > 0;
     const plated = itemCount && itemCount > 0 && localOrder.length > 0; 
     plateOrder = OrderPlateItem 


        let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})
        // console.log(settings)
 
const en = type === true?'Dine-In': 'Take-Out';

   
        return (

        <React.Fragment>
       <Helmet>
        <title>Edit Sales</title>
        <meta name="description" content="Sales" />
    </Helmet>
     <div className="mother">
    <div className="child large-12 med-12 small-12
    ">
                      {/*<Divider orientation="right"/>*/}
            <Form layout="inline">
            <Form.Item label="Order Type" >
                  <Switch onChange={this.handleOrderType} checkedChildren={en} unCheckedChildren={en}  className="m-t-1" />
            </Form.Item>


            <Button  onClick={this.handleReceipt} style={Styles.button} >
                <Icon type="retweet" />New Order</Button>


            </Form>
    </div>
     </div>




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



<div className="child  large-8 med-8 small-8">

                        <CartList settings={settingsData} data={data} useDiscount={this.processDiscount}  remove={this.removeCartItem} localPlusMinus={this.localPlusMinus}  changeQty={this.quantityChange}  editPlate={this.editPlate}  />
     <CartTotal settings={settingsData} summary={summary}/>
          {this.state.type ?
  <React.Fragment>

      <div className="mother">
        <div className="child  large-3 med-3 small-12">
            <Form.Item label="Assign Waiter" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Assign a waiter"
    optionFilterProp="children"
    onChange={this.handleChangeWaiter}
    value={this.state.waiter}
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
        settings: state.setting.settings,
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
        seats: state.hall.seat,
        order:state.pos.savedOrder
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSystemSettings:(data)=>dispatch(getSystemSettings()),
      fetchSavedInvoice: ()=> dispatch(actions.fetchSavedInvoice()),
    fetchWaiters: ()=> dispatch(actions.fetchWaiters()),
    fetchMenu: (id,value)=> dispatch(actions.fetchMenu(id,value)),
    fetchAllMenu: ()=> dispatch(iactions.fetchMenu()),
    getKitchenFromMenu: ()=> dispatch(iactions.getKitchenFromMenu()),
      getCartItem: ()=> dispatch(actions.getCartItem()),
      addToCart: (data) => dispatch(actions.addToCart(data)),
      editPlateItem: (plate) => dispatch(actions.editPlateItem(plate)),
      getCartTotal: () => dispatch(actions.getCartTotal()),
     addBaseToCart: (order, quantity) => dispatch(actions.addBaseToCart(order, quantity)),
      receiptNumber:()=> dispatch(actions.receiptNumber()),
        fetchTable: ()=> dispatch(hactions.fetchTable()),
        getSeatByTable:(tid)=>dispatch(hactions.getSeatByTable(tid)),
      saveEditOrder:(data)=>dispatch(actions.saveEditOrder(data)),
      emptyCart:()=> dispatch(actions.emptyCart()),
    deleteCartItem:(id, ord_type, plate, invoice)=>dispatch(actions.deleteCartItem(id, ord_type, plate, invoice)),
        quantityChange: (data) => dispatch(actions.quantityChange(data)),
      processDiscount:(data)=>dispatch(actions.processDiscount(data)),
            localPlusMinus: (plate, invoice) => dispatch(actions.localPlusMinus(plate, invoice))


  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(EditSales);

