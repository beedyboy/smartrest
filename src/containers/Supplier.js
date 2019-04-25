import React, { PureComponent } from 'react' 
import CreateSupplier from '../components/supplier/CreateSupplier'
import {fetchSupplier} from '../store/actions/supplierActions'
import SupplierList from '../components/supplier/SupplierList'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";

class Supplier extends PureComponent {
   
  componentDidMount(){
     
    this.props.fetchSupplier()
  }

  render() {
       const {suppliers} = this.props
    return (
        
        <div className="">
       <Helmet>
        <title>Supplier Management</title>
        <meta name="description" content="Supplier Management" />
    </Helmet>

 <div className="grid">
 
 <div className="column column-7">
 <SupplierList suppliers={suppliers} />
 </div>   

 <div className="column column-5">
     {/*<Text strong type="secondary">Add New Record</Text>*/}
 <CreateSupplier/>
 </div>

 </div>
 

        </div> 
    )
  }
}

const mapStateToProps = (state)=> {
    
    return {
        suppliers: state.supplier.suppliers,
        auth: state.auth 

    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSupplier: ()=> dispatch(fetchSupplier())
  }
}

export default
connect(mapStateToProps, mapDispatchToProps)(Supplier);
