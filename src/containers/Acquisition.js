/**
 * Created by wawooh on 4/17/19.
 */
        import React, { PureComponent } from 'react'
import {Styles} from '../Config'
import {  Typography} from 'antd';
        import {Helmet} from "react-helmet";
        import Allocate from '../components/inventory/Allocate'
        import FinishedProduct from '../components/inventory/FinishedProduct'
        import '../layout.css'


const {  Text } = Typography;
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 },
//   },
// };
class Acquisition extends PureComponent {
        state = {
            id:'',
            qty:'',
            item_name: '',
            cost_price: '',
            supplierId:'',
            purchased_date: '',
            transaction_type:'',
            create:true
        }




        render() {
            // console.log(this.props)
        // const {purchases,suppliers} = this.props
        return (


<React.Fragment>
<Helmet>
       <title>Purchases | Raw Material</title>
       <meta name="description" content="Purchases Management" />
         </Helmet>
 <div className="grid" style={Styles.div}>
      <div className="column column-12" style={Styles.div}>
    <Allocate/>
     </div>



 </div>



 <div className="grid" style={Styles.div}>

 <div className="column offset-3 column-6">
     <Text type="primary" strong>Allocate Quantity to Finished Product</Text>
<FinishedProduct />
 {/*<PurchaseList purchases={purchases} click={this.handleEdit}/>*/}

 </div>


 </div>


</React.Fragment>

        )
        }
        }


        // const mapStateToProps = (state)=> {
        // // console.log(state)
        // return {
        // purchases: state.inventory.purchases,
        // suppliers: state.supplier.suppliers
        // }
        // }
        // const mapDispatchToProps = (dispatch) => {
        // return {
        // createPurchases:(data)=>dispatch(actions.createPurchases(data)),
        // updatePurchases:(data)=>dispatch(actions.updatePurchases(data)),
        // fetchPurchases: ()=> dispatch(actions.fetchPurchases()),
        // fetchSupplier: ()=> dispatch(fetchSupplier())
        // }
        // }
        //
        // export default
        // connect(mapStateToProps, mapDispatchToProps)(Acquisition);
export default Acquisition
