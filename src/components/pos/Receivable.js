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
import {TableConfig, Styles} from '../../Config'
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
          invoiceList: [], // Check here to configure the default column
         fetching: false
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
        showMerge = (id) => {
          let data = []
          data =this.props.receivable && this.props.receivable.filter((d)=> {
              return d.id !== id
          })
          this.setState({
                    ...this.state,
              id:id,
            merge:true,
              invoiceList:data

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
          handlePayAll=(e)=> {

              const value = e.target.value
                   this.setState({
                       ...this.state,
                       kitchen:value
                   })
                this.props.payAllBalances(value)

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
    this.props.mergeOrder(this.state)
          if(this.props.result.sending){
        this.handleOk('merge')
    }
  };


 render() {

  const { editdel,settings,receivable,orderDetails,Order} = this.props
     const {invoiceList, fetching} = this.state
 const columns = [
     {
        title: 'Invoice No',
        key: 'invoice_number',
         render: (record)=>  (
                <React.Fragment>

              <Button type="primary" onClick={() =>this.showModal(record.id, record.invoice_number)}>
                  <Icon type="eye" />{record.invoice_number}</Button>
                </React.Fragment>
           )
      },
      {
        title: 'Order Number',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'gtotal',
        key: 'amount',
      },
      {
        title: 'Kitchen',
        dataIndex: 'kitchen',
        key: 'kitchen',
      },
     {
        title: 'Waiter',
        dataIndex: 'waiter',
        key: 'waiter',
      },
     {
        title: 'Type',
        dataIndex: 'ord_type',
        key: 'ord_type',
      },
       {
        title: 'Date',
        key: 'created_at',
           render: (record)=> (
                <Text strong type="primary">{record.created_at} </Text>
           )
      },
        {
        title: 'Table',
        dataIndex: 'table',
        key: 'table',
      },
       {
        title: 'Seat',
        dataIndex: 'seat',
        key: 'seat',
      },
       {
           title: 'Action',
        key: 'key',
           render: (record)=>  (
                <React.Fragment>
                    {record.kitchen_status === "Approved"? (

                    <Popconfirm title={"Confirm "+ record.invoice_number+" has paid？"}
                                onConfirm={()=>this.confirm(record.id)}
                                onCancel={this.cancel}
                                okText="Yes" cancelText="No">
  <Button type="danger"  style={Styles.button}><Icon type="upload" />Pay</Button>
  </Popconfirm>
                    ): ''}

<Button type="primary" onClick={() =>this.printOrder(record.invoice_number)}><Icon type="printer" />Print</Button>
              <Button type="secondary" onClick={() =>this.showMerge(record.id)}><Icon type="printer" />Merge</Button>
                </React.Fragment>
           )


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

       <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>this.showBulk()}>
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

 <Table rowKey="id" dataSource={receivable} columns={columns}  {...TableConfig}   bordered   title={() =>  <Text strong type="primary">Account Receivable </Text>} />
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
          title="Merge Order"
          visible={this.state.merge}
          onOk={()=>this.handleOk('merge')}
           onCancel={()=>this.handleOk('merge')}
        >
        <Suspense fallback={<PageLoading/>}>
<Row gutter={16}>
     <Col span={24}>
    <Text strong type="primary">Please select one </Text>
     </Col>
      <Col span={24}>
         <Form.Item label="Select Invoice to merge" >


          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select Invoice"
    optionFilterProp="children"
    onChange={this.handleMergeInvoice}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {invoiceList && invoiceList.map((minvoice, key) => {
           return (
        <Option key={minvoice.id} value={minvoice.invoice_number}> {minvoice.invoice_number} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>


<Button type="primary" disabled={this.state.invoice === ''? true : false} style={Styles.button} onClick={this.merge} >Merge Order</Button>


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
