 
import React, {PureComponent,Suspense,lazy} from 'react';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
 import * as actions from '../../store/actions/posActions'
 import PageLoading from '../loading/PageLoading'
import {TableConfig} from '../../Config'
import { Table , Typography, Button,Modal, Icon} from 'antd';
const {  Text } = Typography;

const OrderDetails = lazy(() => import('../pos/OrderDetails'));

class Basket extends PureComponent {

      state = {
            id:'',
            receipt: '',
            modal:   false,
            visible : false
        }

        showModal = (value) => {
          this.props.fetchOrderByInvoice(value)
          this.setState({
           ...this.state,
              receipt: value,
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
         this.props.fetchKitchenBasket()
     }
    render() {
        const {kitBasket,orderDetails, role,settings} = this.props

 const columns = [
     {
        title: 'Invoice No',
        key: 'invoice',
         render: (record)=>  (
                <React.Fragment>

              <Button type="primary"  onClick={() =>this.showModal(record.invoice)}><Icon type="eye" />{record.invoice}</Button>
                </React.Fragment>
           )
      },
      {
        title: 'Menu Item',
        dataIndex: 'item',
        key: 'item',
      },
        {
        title: 'QTY',
        dataIndex: 'qty',
        key: 'qty',
      }, 
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'total',
        key: 'total',
      }, 
       {
        title: 'Date',
        key: 'updated_at',
           render: (record)=> (
                <Text strong type="primary">{record.updated_at} </Text>
           )
      }

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
 <Table rowKey="id" dataSource={kitBasket} columns={columns}  {...TableConfig}   bordered
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
<OrderDetails order={orderDetails}  role={role} currency={settings.currency} invoice={this.state.receipt}/>

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
        kitBasket: state.pos.kitBasket,
        orderDetails: state.pos.orderDetails
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        fetchKitchenBasket: ()=> dispatch(actions.fetchKitchenBasket()),
        fetchOrderByInvoice: (invoice)=> dispatch(actions.fetchOrderByInvoice(invoice))

        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Basket);
