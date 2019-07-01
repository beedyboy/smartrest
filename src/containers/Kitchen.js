/**
 * Created by wawooh on 5/20/19.
 */
import React, { PureComponent, Suspense } from 'react'
import {getSystemSettings} from '../store/actions/settingsActions'
 import * as actions from '../store/actions/posActions'
 import PageLoading from '../components/loading/PageLoading'
 import OrderDetails from '../components/pos/OrderDetails'
 import Basket from '../components/kitchen/Basket'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import {TableConfig2} from '../Config'
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
import { Tabs,Table , Typography, Button, Modal, Icon,   message} from 'antd';
// import shortId from 'shortid' 
const {  Text } = Typography;

const TabPane = Tabs.TabPane;

function callback(key) {
  // console.log(key);
}
class Kitchen extends PureComponent {
             state = {
            id:'',
           confirm: false,
            receipt: '',
            invoice: '',
            modal:   false
        }
        showModal = (value) => {
          this.props.fetchOrderByInvoice(value)
          this.setState({
           ...this.state,
              receipt: value,
            modal: true
          });
        }

        handleOk = (field) => {
          this.setState({
                    ...this.state,
            [field]:false

          });
        }

          cancel = (field) => {
                this.setState({
                          ...this.state,
                    [field]: false
                });
                message.error('Transaction cancelled.');
          }


    handleApprove=(menu_id,accept,invoice,base)=>{
        this.props.kitchenApprove(menu_id,accept,invoice,base)
    }
 
  componentDidMount(){
   
      this.props.getSystemSettings()
      this.props.fetchKitchenReceivable()
      this.props.fetchReceivable()
       setInterval( this.props.fetchKitchenReceivable, 3000); 
}


componentWillUnmount() {
clearInterval(this.intervalId);
}

  render() {
     if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor"  || position() === "Bartender" || position() === "KitchenAttendant") {
         const {kitchenReceivable, settings,orderDetails,role} = this.props

        let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})
      // const data = receivable.filter((d)=>{
      //      return d.kitchen_status === "Pending"
      // })

      // let i =0;
      // console.log(settingsData.currency)
 const columns = [
  {
    title: 'Order Number',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  },
  {
    title: 'Order Type',
    dataIndex: 'orderType',
    key: 'orderType',
  },
     {
        title: 'Invoice No',
        key: 'invoice',
         render: (record)=>  (
                <React.Fragment>

              <Button type="primary" onClick={() =>this.showModal(record.invoice)}>
                  <Icon type="eye" />{record.invoice}</Button>
                </React.Fragment>
           )
      }, 
     {
        title: 'Item',
        dataIndex: 'menu_name',
        key: 'menu_name',
      },
        {
        title: 'QTY',
        dataIndex: 'qty',
        key: 'qty',
      } ,
      {
        title: 'Amount (' +settingsData.currency+')',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Waiter',
        dataIndex: 'waiter',
        key: 'waiter',
      } ,
      {
        title: 'Table',
        dataIndex: 'table',
        key: 'table',
      } ,
       {
           title: 'Action',
        key: 'key',
           render: (record)=>  (
                <React.Fragment>
                    <Button onClick={()=>this.handleApprove(record.menu_id,record.accept, record.invoice,record.base)}><Icon type="check-circle" />Approve </Button>
 
                </React.Fragment>
           )


          }


    ]
    return (

      <React.Fragment>
       <Helmet>
        <title>Kitchen</title>
        <meta name="description" content="Kitchen" />
    </Helmet>
 

        <div className="mother">
    <div className="child large-12 med-12 small-12">

    <Tabs onChange={callback} type="card" defaultKey="1">
    <TabPane tab={<span><Icon type="shopping-cart" />Items to Approve</span>} key="1">
        
 <Table rowKey="id" dataSource={kitchenReceivable} columns={columns}  {...TableConfig2}   bordered   title={() =>  <Text strong type="primary">Kitchen list to be approved </Text>} /> 

        </TabPane>
    <TabPane tab={<span><Icon type="shopping" />Approved Item</span>}   key="2">

        <Basket settings={settingsData} />

    </TabPane>
          
  </Tabs>
   </div>
    
    {/* <div className="child large-12 med-12 small-12">
    <table>
    <thead>
                         <tr className="tabletitle" key={shortId.generate()}>
                            <td className="item"><h2>S/N</h2></td>
                            <td className="item"><h2>Invoice</h2></td>
                            <td className="item"><h2>Item</h2></td>
                            <td className="item"><h2>Qty</h2></td>
                            <td className="item"><h2>Amount</h2></td>
                            <td className="item"><h2>Action</h2></td>
                          </tr>
                       </thead>

                       <tbody>
                       {kitchenReceivable.map((d)=> {
                         i++
                           return (
                               <tr className="service" key={shortId.generate()}>
                                 <td>
                                   {i}
                                 </td>
                                <td className="">
                                    <p className="">{d.invoice}</p>
                                </td>
                                <td className="">
                                    <p className="">{d.menu_name}</p>
                                </td>
                        <td className="">
                            <p className="itemtext">{d.qty}</p>
                        </td>


                        <td className="">
                     <p className="">{d.total}</p>
                 </td>
                 
                 <td className="">
                     <p className=""><Button onClick={()=>this.handleApprove(d.menu_id,d.accept, d.invoice,d.base)}>Approve {d.base}</Button></p>
                 </td>
                                            </tr>
                           )
                       })}
                       </tbody>
    </table>

    </div> */}
        </div>


    <React.Fragment>
<Modal
          title="Order Details"
          visible={this.state.modal}
          onOk={()=>this.handleOk('modal')}
           onCancel={()=>this.handleOk('modal')}
        >
        <Suspense fallback={<PageLoading/>}>
<OrderDetails  role={role}  redirect={this.setRedirect} order={orderDetails} currency={settingsData.currency} invoice={this.state.receipt}/>

</Suspense>

        </Modal>
        </React.Fragment>


      </React.Fragment>

 )
            }
           return <NoAccess name={fullname()}/>
        }
        }

const mapStateToProps = (state)=> {

    return {
        role: state.auth.role,
         receivable: state.pos.receivable,
         kitchenReceivable: state.pos.kitchenReceivable,
        settings: state.setting.settings,
        orderDetails: state.pos.orderDetails


    }
}
const mapDispatchToProps = (dispatch) => {
  return {
        fetchReceivable: ()=> dispatch(actions.fetchReceivable()),
        fetchKitchenReceivable: ()=> dispatch(actions.fetchKitchenReceivable()),
        kitchenApprove:(menu_id,accept, invoice, base)=>dispatch(actions.kitchenApprove(menu_id,accept,invoice,base)),
        getSystemSettings:(data)=>dispatch(getSystemSettings()),
        fetchOrderByInvoice: (invoice)=> dispatch(actions.fetchOrderByInvoice(invoice))

  }
}

export default
connect(mapStateToProps, mapDispatchToProps)(Kitchen);