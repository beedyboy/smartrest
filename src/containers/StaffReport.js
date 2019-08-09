/**
 * Created by wawooh on 5/5/19.
 */

import React, { PureComponent, Suspense } from 'react'
import moment from 'moment';
import shortid from 'shortid';
import {fetchUsers} from '../store/actions/userActions'
import {getSystemSettings} from '../store/actions/settingsActions'
import * as actions from '../store/actions/reportActions'
import * as posActions from '../store/actions/posActions'
import {  Form, Radio, Select, Modal} from 'antd';
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import OrderDetails from '../components/pos/OrderDetails'
import PageLoading from '../components/loading/PageLoading'
import StaffEvaluation from '../components/report/StaffEvaluation';
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
const Option = Select.Option;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class StaffReport extends PureComponent {

        state={
            staff: '',
            view:'All',
            year:'',
            month:'',
            trail:false,
            id:'',
            receipt: '',
            modal:false
        }

            handleChangeStaff = (value)=>{
                this.setState({
                    ...this.state,
                    staff:value
                })
                this.props.staffReport({staff:value})
            }


     handleYearStaff = (value)=>{
                this.setState({
                    ...this.state,
                    year:value
                })

            }
     handleMonthStaff = (value)=>{
                this.setState({
                    ...this.state,
                    month:value
                })

            }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.salesReport(this.state)
        this.props.departmentReport(this.state)
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
   filterDept=(e)=> {
              // console.log(`radio checked:${e.target.value}`);
              const value = e.target.value
                   this.setState({
                       ...this.state,
                       view:value
                   })
            // self.findIndex(d => d.getTime() === date.getTime()) === i
            //   d.period.substr(0,4)
            // const pArr = this.props.staffs.map((d)=>{
            //     return new Date(d.period).getFullYear();
            // })
            //
            //        const year = [...new Set(pArr)]
            //
            //         console.log(pArr)
            //        console.log(year)
   }

    componentDidMount(){
  // document.addEventListener('click', this.handleClickOutside.bind(this), true);
    this.props.fetchUsers()
          this.props.getSystemSettings()
    }
  render() {
 if (position() === "SuperAdmin") {
    const {users, staffs, settings, orderDetails} = this.props 
     let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})

    const {view, year, month} = this.state
    let data = []
    let years = []
    let months = []
      if(view === "All") {
       data = staffs
      }
       else if(view === "Calendar") {
      const pArr = staffs.map((d)=>{
                return new Date(d.period).getFullYear();
            })
         years = [...new Set(pArr)]


      }
      else {
       data = this.props.staffs.filter(d=> d.period === view.toString())
      }

if(year !== "" && view === "Calendar"){

          data = staffs.filter(d=> d.period.substr(0,4) === year.toString())
    const pMonth = data.map(x=> {
        return x.period.substr(5,2)
        // return new Date(x.period).getMonth()
    })

       months = [...new Set(pMonth)]


}

if(year !== "" && month !== ""){
const ym = year+'-'+month
          data = staffs.filter(d=> d.period.substr(0,7) === ym.toString())

}
    return (

        <React.Fragment>
       <Helmet>
        <title>Staff Report</title>
        <meta name="description" content="Staff Report" />
    </Helmet>

 <div className="grid">
 <div className="column column-4">

   <Form.Item
          label="Staff"
        >
         <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a staff"
    optionFilterProp="children"
    onChange={this.handleChangeStaff}
    value={this.state.staff}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {users && users.map((user, key) => {
           return (
        <Option key={user.id} value={user.id}> {user.fullname} </Option>
        )
        }
        )}

  </Select>
   </Form.Item>

   <Form.Item
          label="View By"
        >
          <RadioGroup onChange={this.filterDept} defaultValue="Total"  buttonStyle="solid">
        <RadioButton value="All">All Time</RadioButton>
        <RadioButton value={moment().format('YYYY-MM-DD')}>Today</RadioButton>
        <RadioButton value="Calendar">Calendar</RadioButton>
      </RadioGroup>
   </Form.Item>

<Form layout="horizontal">

    {view === "Calendar"?

  <React.Fragment>
       <Form.Item
          label="Year"
        >
         <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select year"
    optionFilterProp="children"
    onChange={this.handleYearStaff}

    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {years && years.map((year) => {
           return (
        <Option key={year} value={year}> {year} </Option>
        )
        }
        )}

  </Select>
   </Form.Item>


   <Form.Item
          label="Month"
        >
         <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select months"
    optionFilterProp="children"
    onChange={this.handleMonthStaff}

    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {months && months.map((month,key) => {
           return (
        <Option key={shortid.generate()} value={month}>  {moment(month.toString()).format("MMMM")}</Option>
        )
        }
        )}

  </Select>
   </Form.Item>
  </React.Fragment>
    : null
    }


</Form>

 </div>

     <div className="column column-8">
            <StaffEvaluation report={data}  showModal={this.showModal} 
             settings={settingsData}/>

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
        users: state.user.users,
        staffs: state.report.staffs,
        auth: state.auth,
        orderDetails: state.pos.orderDetails,

    }
}
const mapDispatchToProps = (dispatch) => {
  return {
getSystemSettings:(data)=>dispatch(getSystemSettings()),
       fetchUsers: ()=> dispatch(fetchUsers()),
    staffReport: (data)=> dispatch(actions.staffReport(data)),
      departmentReport: (data)=> dispatch(actions.departmentReport(data)),
fetchOrderByInvoice: (invoice)=> dispatch(posActions.fetchOrderByInvoice(invoice)),
  }
}


export default
connect(mapStateToProps, mapDispatchToProps)(StaffReport);
