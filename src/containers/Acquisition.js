/**
 * Created by wawooh on 4/17/19.
 */
        import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Styles} from '../Config'
import {  Typography} from 'antd';
        import {Helmet} from "react-helmet";
        import Allocate from '../components/inventory/Allocate'
        import FinishedProduct from '../components/inventory/FinishedProduct'
        import '../layout.css'


const {  Text } = Typography;
class Acquisition extends PureComponent {


        render() {

            const {role} = this.props
        return (


<React.Fragment>
<Helmet>
       <title>Acquisition | Allocation</title>
       <meta name="description" content="Acquisition | Allocation" />
         </Helmet>
 <div className="grid">
      <div className="column column-12" style={Styles.div}>
    <Allocate role={role}  />
     </div>



 </div>

 {(role && role.indexOf("addFinished") !== -1 )?
         (

 <div className="grid" style={Styles.div}>


 <div className="column offset-3 column-6">
     <Text type="primary" strong>Allocate Quantity to Finished Product</Text>
<FinishedProduct />
 {/*<PurchaseList purchases={purchases} click={this.handleEdit}/>*/}

 </div>

 </div>

         ): ''}
</React.Fragment>

        )
        }
        }



const mapStateToProps = (state)=> {

    return {
        auth: state.auth,
      role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
        export default
        connect(mapStateToProps, mapDispatchToProps)(Acquisition);
// export default Acquisition
