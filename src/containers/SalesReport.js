/**
 * Created by wawooh on 5/2/19.
 */
import React, { PureComponent,Suspense,lazy } from 'react'
import moment from 'moment';
import * as actions from '../store/actions/reportActions'
import * as posActions from '../store/actions/posActions'
import {getSystemSettings} from '../store/actions/settingsActions'
 import PageLoading from '../components/loading/PageLoading'
import SalesReportTable from '../components/report/SalesReportTable'
import SalesTrail from '../components/report/SalesTrail'
import {  Form, DatePicker, Button, Icon, Modal} from 'antd';
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import OrderDetails from '../components/pos/OrderDetails'
import {position, fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'


const Department = lazy(() => import('../components/report/Department'));
// const SalesTrail = lazy(() => import('../components/report/SalesTrail'));
class SalesReport extends PureComponent {

state={
    startDate:moment().format('YYYY-MM-DD'),
    endDate:moment().format('YYYY-MM-DD'),
    dept:'Total',
    trail:false,
    id:'',
    receipt: '',
    modal:false
}

componentDidMount(){
      this.props.getSystemSettings()
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
handleChangeStartDate = (evt, date) => {
    // console.log(date)
    this.setState({
        startDate:date
    })
  }

handleChangeEndDate = (evt, date) => {
    // console.log(date)
     this.setState({
        endDate:date
    })
  }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.salesReport(this.state)
        this.props.departmentReport(this.state)
    }
showTrail = (e) => {
     this.props.salesTrailReport(this.state)
    var value = !this.state.trail
    this.setState({
        trail:value
    })
}
   filterDept=(e)=> {
  // console.log(`radio checked:${e.target.value}`);
  const value = e.target.value
       this.setState({
           ...this.state,
           dept:value
       })


}
  render() {
 if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor" || position() === "Cashier") {
    const {sales, salesTotal, departments, salesTrails, settings,orderDetails} = this.props

     let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})
    const dateFormat = 'YYYY/MM/DD';
 
 const data = this.props.departments.filter(dept=> dept.kitchen === this.state.dept)
 

    return (

        <React.Fragment>
       <Helmet>
        <title>Sales Report</title>
        <meta name="description" content="Sales Report" />
    </Helmet>

 <div className="grid">
 <div className="column column-12">
  <Form onSubmit={this.handleSubmit} layout="inline">

   <Form.Item
          label="Date"
        >
       <DatePicker
          hintText="Date début"
          okLabel="OK"
          cancelLabel="cancel"
          locale="fr"
         defaultValue={this.state.startDate? moment(this.state.startDate, dateFormat): moment()}

          onChange={this.handleChangeStartDate}
        />
   </Form.Item>



   <Form.Item
          label="~"
        >
       <DatePicker
          hintText="Date début"
          okLabel="OK"
          cancelLabel="cancel"
          locale="fr"
         defaultValue={this.state.endDate? moment(this.state.endDate, dateFormat): moment()}

          onChange={this.handleChangeEndDate}
        />
   </Form.Item>


        <Form.Item>
                <Button type="primary" htmlType="submit">
                    <Icon type="search"/>
                </Button>
            </Form.Item>
  </Form>
 </div>

 </div>
            <div className="grid">
                <div className="column column-6">
                  <SalesReportTable period={this.state.startDate + " to " + this.state.endDate} showModal={this.showModal} report={sales} total={salesTotal} trail={this.showTrail} settings={settingsData}/>
                </div>

            <div className="column column-6">
                 <Suspense fallback={<PageLoading/>}>

                     {this.state.dept !== "Total" ?

                         <Department dept={data}  settings={settingsData}  change={this.filterDept}/>
:
                         <Department dept={departments}  settings={settingsData}  change={this.filterDept}/>

                 }

                 </Suspense>
             </div>
       </div>
     <div className="grid">
                <div className="column column-12">
                    {this.state.trail?
                        <SalesTrail  report={salesTrails}  settings={settingsData}/>
                            : ''}

                </div>
     </div>

          <React.Fragment>
          <Modal
                    title="Order Details"
                    visible={this.state.modal}
                    onOk={()=>this.handleOk('modal')}
                     onCancel={()=>this.handleOk('modal')}
                  >
                  <Suspense fallback={<PageLoading/>}>
          <OrderDetails  order={orderDetails} currency={settingsData.currency} invoice={this.state.receipt}/>
          
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
        settings: state.setting.settings,
        sales: state.report.sales,
        salesTotal: state.report.salesTotal,
        salesTrails:state.report.salesTrails,
        departments: state.report.departments,
        orderDetails: state.pos.orderDetails,
        auth: state.auth

    }
}
const mapDispatchToProps = (dispatch) => {
  return {
getSystemSettings:(data)=>dispatch(getSystemSettings()),
fetchOrderByInvoice: (invoice)=> dispatch(posActions.fetchOrderByInvoice(invoice)),
    salesReport: (data)=> dispatch(actions.salesReport(data)),
      departmentReport: (data)=> dispatch(actions.departmentReport(data)),
      salesTrailReport:(data)=>dispatch(actions.salesTrailReport(data))
  }
}


export default
connect(mapStateToProps, mapDispatchToProps)(SalesReport);
