import React, { PureComponent } from 'react' 
import CreateSupplier from '../components/supplier/CreateSupplier'
import {fetchSupplier} from '../store/actions/supplierActions'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'

class Supplier extends PureComponent {

  componentDidMount(){
     
    this.props.fetchSupplier()
  }

  render() {
       if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
       const {suppliers} = this.props
    return (
        
        <div className="">
       <Helmet>
        <title>Supplier Management</title>
        <meta name="description" content="Supplier Management" />
    </Helmet>

 <div className="grid">

             <div className="column column-12">

                 <CreateSupplier suppliers={suppliers}/>
             </div>

 </div>
 

        </div> 
 )
            }
           return <NoAccess name={fullname()}/>
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
