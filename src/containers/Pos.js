/**
 * Created by wawooh on 4/24/19.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {  Redirect } from 'react-router-dom';
import {getSystemSettings} from '../store/actions/settingsActions'
import { Tabs, Icon } from 'antd';
import Basket from '../components/pos/Basket'
import Receivable from '../components/pos/Receivable'
import Sales from '../components/pos/Sales'
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'

const TabPane = Tabs.TabPane;

function callback(key) {
  // console.log(key);
}

class POS extends PureComponent {
 state={
     redirect: false
 }
         setRedirect = () => {
          console.log('set redirect')
            this.setState({
              redirect: true
            })
          }

         renderRedirect = () => {
            if (this.state.redirect) {
              return <Redirect to='/pos' />
            }
          }
    componentDidMount(){
            this.props.getSystemSettings()
    }

    render() {
let receive = false;
let editdel = false;
        if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor" || position() === "Cashier") {
           receive = true;
        }
        if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
           editdel = true;
        }
 if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor" || position() === "Cashier" || position() === "MobileAttendant") {
     const { settings} = this.props
     let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})
        return (


 <div className="grid">
  {this.renderRedirect()}

 <div className="column column-12" >


     <Tabs onChange={callback} type="card" defaultKey="3">
    <TabPane tab={<span><Icon type="shopping-cart" />Sales</span>} key="1">
        <Sales settings={settingsData}   /></TabPane>
    <TabPane tab={<span><Icon type="shopping" />Basket</span>}   key="2">

        <Basket settings={settingsData}  redirect={this.setRedirect} />

    </TabPane>
         {receive?(
         <TabPane tab={<span><Icon type="transaction" />Receivables</span>} key="3">
            <Receivable settings={settingsData} editdel={editdel} />

         </TabPane>
             ) : ''}
  </Tabs>


 </div>




 </div>

      );
            }
           return <NoAccess name={fullname()}/>
        }
        }


function mapStateToProps(state) {
    return {
        settings: state.setting.settings
    };
}
const mapDispatchToProps = (dispatch) => {
  return {
getSystemSettings:(data)=>dispatch(getSystemSettings())
  }
}

export default connect(
    mapStateToProps,mapDispatchToProps)(POS);

