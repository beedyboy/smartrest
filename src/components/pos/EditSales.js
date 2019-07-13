/**
 * Created by wawooh on 4/30/19.
 */
import React, {PureComponent,Suspense} from 'react';
import {Styles} from '../../Config'
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { Switch, Modal, Button, InputNumber, Select, Form, Card,Pagination, Spin, Divider, Icon } from 'antd'; 
import {getSystemSettings} from '../../store/actions/settingsActions'
import * as actions from '../../store/actions/posActions'
import * as hactions from '../../store/actions/hallActions'
import PageLoading from '../loading/PageLoading'
import CartList from './CartList'
import CartTotal from './CartTotal'
import shortId from 'shortid'
// import Styles from 'st'


const Option = Select.Option;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
      backgroundColor:'#85a5ff'
  }; 
const numEachPage = 10
let itemCount = 0;

class EditSales extends PureComponent {
    state = {
        id:'',
        type: '',
        waiter: '',
        minValue:0,
        maxValue: 10,
        menu: [],
        seat: '',
        ord_type:'',
        invoice: '',
         table: '',
        data: [], 
        localOrder:[],
        localQty:[],
        value: '',
        tname: '',
        kitchen: '',
        modal: {
          show: false,
          title: '',
          qty:1,
          id: ''
        },
        base:false,
        fetching: false,
    }

    fetchMenu = (value) => {

        this.setState({data: [], fetching: true});
        let data = this.props.fetchMenu(value)
        this.setState({data, fetching: false});
        console.log('datas', data)
    }


    handleChange = (value, base, item, price) => { 
        let local =[...this.state.localOrder]
        // console.log(e)
        if(base === 'Yes'){
            // console.log("VALUE", this.state.localOrder.filter((item) => value === item))
            var index  = local.indexOf(value);
            if(index === -1){
                // console.log("Does not exist") 
                let title = item+ " "+price
                this.setState({
                    ...this.state, 
                    modal:{
                        show:true,
                        id: value,
                        title:title
                    },
                    localOrder:local
                });
            
            }
            else{
                // console.log("INDEX", index)
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
                // this.state.localOrder.splice(index, 1)
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
                show:false,
                title:'',
                id: '',
                qty:1
            },
            localQty:Qty,
            localOrder:local
        });
        console.log("DATA", this.state.localOrder)
        console.log("QTY", this.state.Qty)
    }
    makePlate =(e) => {
        console.log(this.state.localOrder) 
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
    handleOk = () => {
        this.setState({
                ...this.state,
          modal:{
            ...this.state.modal,
            title:'',
            id:'',
            qty:1,
          show: false
          } 
        });
      }
  
    handleOrderType = (e) => {
        console.log(e)
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

    emptyCart = () => {
        this.props.emptyCart()
    }
    removeCartItem = (data) => {
        this.props.deleteCartItem(data.id)
    }
    quantityChange = (data) => {
                if (data.newQty !== ''){
                    this.props.quantityChange(data)
            }
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
               // console.log(this.props.order)
               // this.handleOrder()
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
            this.setState({
                ...this.state,
                id:data.id,
                waiter:data.waiter? data.waiter: '',
                seat:data.seat? data.seat:'',
                table:data.table? data.table: '',
                kitchen:data.kitchen,
                ord_type:ord_type
            })
            // console.log(data.table)

        }
        componentWillMount(){
            this.props.fetchSavedInvoice()

        }
        componentDidUpdate(){
            // console.log(this.props.order)
            const order = this.props.order
             let datas = []
                      order && order.forEach(function(val,index) {
                          datas['id'] = order[index].id
                          datas['period'] = order[index].period
                          datas['table'] = order[index].tid
                          datas['seat'] = order[index].sid
                          datas['amount'] = order[index].amount
                          datas['kitchen'] = order[index].kitchen
                          datas['waiter'] = order[index].waiter
                          datas['ord_type'] = order[index].ord_type
                          datas['created_at'] = order[index].created_at
                          datas['created_by'] = order[index].created_by
                          datas['updated_by'] = order[index].updated_by
                          datas['updated_at'] = order[index].updated_at
                    })
            this.handleOrder(datas)
        }
    render() {
    

         const {waiters,  data, menu, summary,  htables, settings} = this.props
         const { fetching, localOrder , type} = this.state;
     const enabled = data && data.length > 0;
     const plated = itemCount && itemCount > 0 && localOrder.length > 0; 


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
          onChange={this.handlePageChange}
          total={menu.length} //total number of card data available
        />

    </div>



<div className="child  large-8 med-8 small-8">

   <CartList settings={settingsData} data={data} remove={this.removeCartItem} changeQty={this.quantityChange} />
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
        visible={this.state.modal.show}
        onOk={this.handleOk}
        onCancel={this.handleOk} 
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


        </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        settings: state.setting.settings,
        waiters:state.pos.waiters,
        menu: state.pos.menu,
        data: state.pos.cart,
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
      fetchMenu: (value)=> dispatch(actions.fetchMenu(value)),
      getCartItem: ()=> dispatch(actions.getCartItem()),
      addToCart: (data)=> dispatch(actions.addToCart(data)),
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
    mapStateToProps,mapDispatchToProps)(EditSales);

