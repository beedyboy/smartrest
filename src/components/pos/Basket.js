/**
 * Created by wawooh on 4/30/19.
 */
import React, {PureComponent,Suspense,lazy} from 'react';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
 import * as actions from '../../store/actions/posActions'
 import PageLoading from '../loading/PageLoading'
import {TableConfig} from '../../Config'
import { Table , Typography, Button,Modal, Icon} from 'antd';
const {  Text } = Typography;

const OrderDetails = lazy(() => import('./OrderDetails'));

class Basket extends PureComponent {

      state = {
            id:'',
            receipt: '',
            modal:   false,
            visible : false
        } 
 showModal = (id,value) => {
          this.props.fetchOrderByInvoice(value)
          this.setState({
           ...this.state,
              receipt: value,
              id:id,
            modal: true
          });
        }

        handleOk = () => {
          this.setState({
                    ...this.state,
            modal:false

          });
        }
     componentDidMount(){
         this.props.fetchBasket()
     }
    render() {
        const {basket,orderDetails,redirect, role,settings} = this.props

 const columns = [
     {
        title: 'Invoice No',
            render:(text,record)=> {
          return {
            props: {
              style: {background: record.color},
            },
            children:   <React.Fragment>

              <Button type="primary" onClick={() =>this.showModal(record.id, record.invoice_number)}>
                  <Icon type="eye" />{record.invoice_number}</Button>
                </React.Fragment>,
          };
        },
        // key: 'invoice_number',
         
      },
      {
        title: 'Order Number',
        dataIndex: 'order_number',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.order_number}</span>,
          };
        },
        // key: 'order_number',
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'gtotal',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.gtotal}</span>,
          };
        },
        // key: 'amount',
      },
      {
        title: 'Balance (' +settings.currency+')',
        dataIndex: 'gtotal',
        render(text, record) {
          return {
            props: {
              style: { background: record.color },
            },
            children: < span>  {record.balance}</span>,
          };
        },
        // key: 'balance',
      },
   {
     title: 'Waiter',
     dataIndex: 'waiter',
     render(text, record) {
       return {
         props: {
           style: { background: record.color },
         },
         children: < span>  {record.waiter}</span>,
       };
     },
     // key: 'waiter',
   },
   {
     title: 'Type',
     dataIndex: 'ord_type',
     render(text, record) {
       return {
         props: {
           style: { background: record.color },
         },
         children: < span>  {record.ord_type}</span>,
       };
     },
     // key: 'ord_type',
   },
        {
        title: 'Table',
        dataIndex: 'table',
         render(text, record) {
       return {
         props: {
           style: { background: record.color },
         },
         children: < span>  {record.table}</span>,
       };
     },
        // key: 'table',
      },
   {
     title: 'Date',
     // key: 'created_at',
     render(text, record) {
       return {
         props: {
           style: { background: record.color },
         },
         children: <Text strong type="primary">{record.created_at} </Text>,
       };
     },

   },

    ]
        return (

        <React.Fragment>

        <React.Fragment>
               <Helmet>
                        <title>Basket</title>
                        <meta name="description" content="Basket" />
                 </Helmet>
        </React.Fragment>
        <React.Fragment>
 <Table rowKey="id" dataSource={basket} columns={columns}  {...TableConfig}   bordered
    title={() =>  <Text strong type="primary">Basket </Text>}
 />
            </React.Fragment>



    <React.Fragment>
<Modal
          title="Order Details"
          visible={this.state.modal}
          onOk={()=>this.handleOk()}
           onCancel={()=>this.handleOk()}
        >
        <Suspense fallback={<PageLoading/>}>
<OrderDetails order={orderDetails}  role={role} redirect={redirect} currency={settings.currency} invoice={this.state.receipt}/>

</Suspense>

        </Modal>
        </React.Fragment>


</React.Fragment>

        );
    }
}


   const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        basket: state.pos.basket,
        orderDetails: state.pos.orderDetails
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        fetchBasket: ()=> dispatch(actions.fetchBasket()),
        fetchOrderByInvoice: (invoice)=> dispatch(actions.fetchOrderByInvoice(invoice))

        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Basket);
