/**
 * Created by wawooh on 5/1/19.
 */
import React, {PureComponent,Suspense} from 'react';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import {  Redirect,withRouter } from 'react-router-dom';
 import * as actions from '../../store/actions/posActions'
 import PageLoading from '../loading/PageLoading'
 import OrderDetails from './OrderDetails'
import {invoiceTableConfig, Styles} from '../../Config'
import { Table , Typography, Button, Select, Form,Radio, Modal, Spin, Icon, Row, Col, Popconfirm, message} from 'antd';
const {  Text } = Typography;

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// const OrderDetails = lazy(() => import('./OrderDetails'));

class Receivable extends PureComponent {

      state = {
            id:'',
           confirm: false,
            receipt: '',
            invoice: '',
          kitchen:'',
            modal:   false,
            bulk:   false,
            merge:   false,
            visible : false,
          redirect: false,
          intervalId:'', 
         fetching: false, 
         selectedRowKeys: [], // Check here to configure the default column
        loading: false,
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

        handleOk = (field) => {
          this.setState({
                    ...this.state,
            [field]:false

          });
        }
        showBulk = () => {
          this.setState({
                    ...this.state,
            bulk:true

          });
        }
       
        cancelOrder = (id, invoice)=> {
          this.props.cancelOrder(id, invoice)
          this.handleOk('modal')
        }

         confirm = (id) => {
            this.setState({
                      ...this.state,
                confirm: false
            });
            this.props.payNow(id)
            message.success('Transaction successful');
  }

          cancel = (field) => {
                this.setState({
                          ...this.state,
                    [field]: false
                });
                message.error('Transaction cancelled.');
          }

          setRedirect = (invoice) => { 
                  localStorage.setItem('receiptNumber', invoice)
            this.setState({
              redirect: true
            })
         
          }

          printOrder = (invoice) => {
          // console.log(invoice)
              this.props.history.push('/print/'+invoice)
          }
         renderRedirect = () => {

            if (this.state.redirect) {
             const d = localStorage.getItem('receiptNumber')
             return <Redirect to={'/order/'+d} />
            }
          }
          handlePayAll=()=> {

                this.props.payAllBalances('All')

}
          fetchInvoice = (value) => {

            this.setState({fetching: true});
            this.props.fetchOrder(value)
            this.setState({ fetching: false}); 
          }
          handleChange = (id)=>{
            // console.log("ORDER", this.props.Order)
            let data = this.props.Order.filter(d=> d.id === parseInt(id))
            // console.log(data[0].invoice_number)
            this.showModal(id, data[0].invoice_number)
          }
     componentDidMount(){
         
           setInterval( this.props.fetchReceivable, 3000); 
     }


    componentWillUnmount() {
   clearInterval(this.intervalId);
}

    handleMergeInvoice = (value) => {
        this.setState({
            invoice: value
        })
    }
      merge = () => {
         this.setState({ loading: true });
    this.props.mergeOrder(this.state)
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };
 

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };


 render() {

  const { editdel,settings,receivable,orderDetails,Order} = this.props
     const { fetching, loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
 const columns = [
     {
        title: 'Invoice No',

     render: (text, record) => {
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
        title: 'Kitchen',
        dataIndex: 'kitchen',
        render(text, record) {
          return {
            props: {
              style: { background: record.color },
            },
            children: < span>  {record.kitchen}</span>,
          };
        },
        // key: 'kitchen',
      },
     {
        title: 'Waiter',
        dataIndex: 'waiter',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.waiter}</span>,
          };
        },
        // key: 'waiter',
      },
     {
        title: 'Type',
        dataIndex: 'ord_type',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.ord_type}</span>,
          };
        },
        // key: 'ord_type',
      },
       {
        title: 'Date',
        // key: 'created_at',
        render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children:   <Text strong type="primary">{record.created_at} </Text>,
          };
        },
            
      },
        {
        title: 'Table',
        dataIndex: 'table',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.table}</span>,
          };
        },
        // key: 'table',
      }, 
       {
           title: 'Action',
        key: 'key',
         render:(text,record)=> {
          return {
            props: {
              style: {background: record.color},
            },
            children: <React.Fragment>
              {record.kitchen_status === "Approved" ? (

                <Popconfirm title={"Confirm " + record.invoice_number + " has paid？"}
                  onConfirm={() => this.confirm(record.id)}
                  onCancel={this.cancel}
                  okText="Yes" cancelText="No">
                  <Button type="danger" style={Styles.button}><Icon type="upload" />Pay</Button>
                </Popconfirm>
              ) : ''}
         

              <Button type="primary" onClick={() => this.printOrder(record.invoice_number)}><Icon type="printer" />Print</Button>
 
            </React.Fragment>,
          };
        },
           

          }


    ]

        return (

        <React.Fragment>
      {this.renderRedirect()}
        <React.Fragment>
               <Helmet>
                        <title>Account Receivable</title>
                        <meta name="description" content="Account Receivable" />
                 </Helmet>
        </React.Fragment>
        <React.Fragment>


        <div style={{ marginBottom: 16 }}>

          <span style={{ marginLeft: 8 }}>

          </span>

       <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handlePayAll}>
         <Icon type="eye" />Pay All</Button>


<Form.Item label="Search Order" >
</Form.Item>
<Select        
        placeholder="Select Order"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={true}
        showSearch={true}
        onSearch={this.fetchInvoice} 
        onChange={this.handleChange}
         style={Styles.select}
      >
        {Order && Order.map(d =>
      
           <Option key={d.id}>{d.invoice_number}-
           {d.total}  {settings.currency}</Option>
           )}
      </Select>

        </div>
 
  <div style={{ marginBottom: 1 }}>
          <Button type="primary" onClick={this.merge} disabled={!hasSelected} loading={loading}>
            Merge
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} rowKey="id" dataSource={receivable} columns={columns}  {...invoiceTableConfig}   bordered   title={() =>  <Text strong type="primary">Account Receivable </Text>} />
        
         <div style={{ marginTop: 8 }}>
          <Button type="primary" onClick={this.merge} disabled={!hasSelected} loading={loading}>
            Merge
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
            </React.Fragment>


    <React.Fragment>
<Modal
          title="Bulk Payment"
          visible={this.state.bulk}
          onOk={()=>this.handleOk('bulk')}
           onCancel={()=>this.handleOk('bulk')}
        >
        <Suspense fallback={<PageLoading/>}>
<Row gutter={16}>
     <Col span={24}>
    <Text strong type="primary">Please select one </Text>
     </Col>
      <Col span={24}>
       <RadioGroup onChange={this.handlePayAll}  buttonStyle="solid">
        <RadioButton value="Total">All</RadioButton>
        <RadioButton value="Bar">Bar</RadioButton>
        <RadioButton value="Local">Local</RadioButton>
        <RadioButton value="Continental">Continental</RadioButton>
      </RadioGroup>

      </Col>
</Row>

</Suspense>

        </Modal>
        </React.Fragment>
 
    <React.Fragment>
<Modal
          title="Order Details"
          visible={this.state.modal}
          onOk={()=>this.handleOk('modal')}
           onCancel={()=>this.handleOk('modal')}
        >
        <Suspense fallback={<PageLoading/>}>
<OrderDetails  editdel={editdel} cancel={this.cancelOrder} redirect={this.setRedirect} order={orderDetails} currency={settings.currency} id={this.state.id} invoice={this.state.receipt}/>

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
        receivable: state.pos.receivable,
        orderDetails: state.pos.orderDetails,
        Order: state.pos.Order,
        result: state.form.result,

        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        fetchReceivable: ()=> dispatch(actions.fetchReceivable()),
        fetchOrderByInvoice: (invoice)=> dispatch(actions.fetchOrderByInvoice(invoice)),
        fetchOrder: (invoice)=> dispatch(actions.fetchOrder(invoice)),
        payNow: (id)=> dispatch(actions.payNow(id)),
        payAllBalances:(kitchen)=> dispatch(actions.payAllBalances(kitchen)),
        mergeOrder:(data)=> dispatch(actions.mergeOrder(data)),
        cancelOrder:(id, invoice)=> dispatch(actions.cancelOrder(id, invoice))


        }
        }

        export default withRouter(
            connect(mapStateToProps, mapDispatchToProps)(Receivable));
