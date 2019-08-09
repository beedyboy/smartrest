
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {  Button, Icon} from 'antd';
import ReactToPrint from "react-to-print";
 import {getShopDetails} from '../../store/actions/shopActions'
 import * as actions from '../../store/actions/posActions'
import {getSystemSettings} from '../../store/actions/settingsActions'
import Invoice from '../pos/Invoice'


class Print extends PureComponent {


     componentDidMount(){
              this.props.getSystemSettings()
         this.props.getInvoiceDetails(this.props.match.params.invoice)
         this.props.fetchOrderByInvoice(this.props.match.params.invoice)
         this.props.getShopDetails()
     }
    render() {
        const {invoiceDetails,orderDetails,settings,shopDetails} = this.props
          let shopData = []
  shopDetails && shopDetails.forEach(function(val,index) {
      shopData['id'] = shopDetails[index].id
      shopData['shopName'] = shopDetails[index].shopName
      shopData['shopEmail'] = shopDetails[index].shopEmail
      shopData['address'] = shopDetails[index].address
      shopData['shopPhoneNum'] = shopDetails[index].shopPhoneNum
})


        let settingsData = []
  settings && settings.forEach(function(val,index) {
      settingsData['id'] = settings[index].id
      settingsData['currency'] = settings[index].currency
      settingsData['updated_by'] = settings[index].updated_by
      settingsData['updated_at'] = settings[index].updated_at
})
        // console.log(invoiceDetails)
        return (

        <React.Fragment>

<ReactToPrint
          trigger={() => <Button type="ghost" style={{marginLeft: '35%', backgroundColor:'#08979c', fontWeight: 'bolder'}}><Icon  type="printer" />Print this out!</Button>}
          content={() => this.r}
        />
            <br />
        <React.Fragment>
<Invoice ref={el => (this.r = el)}  data={orderDetails} sold={invoiceDetails} shop={shopData}/>

        <br />
<ReactToPrint
          trigger={() => <Button type="ghost" style={{float: 'right', marginRight: '35%', backgroundColor:'#08979c', fontWeight: 'bolder'}}><Icon  type="printer" />Print this out!</Button>}
          content={() => this.r}
        />
            </React.Fragment>


</React.Fragment>

        );
    }
}


   const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        invoiceDetails: state.pos.invoiceDetails,
        orderDetails: state.pos.orderDetails,
        settings: state.setting.settings,
        shopDetails:state.shop.shopDetails
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        getInvoiceDetails: (invoice)=> dispatch(actions.getInvoiceDetails(invoice)),
        fetchOrderByInvoice: (invoice)=> dispatch(actions.fetchOrderByInvoice(invoice)),
        getSystemSettings:(data)=>dispatch(getSystemSettings()),
        getShopDetails:()=>dispatch(getShopDetails())

        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Print);
