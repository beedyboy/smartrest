/**
 * Created by wawooh on 5/2/19.
 */
import React, { PureComponent } from 'react'
import CreateShop from '../components/shop/CreateShop'
import {fetchShop} from '../store/actions/shopActions'
import ShopList from '../components/shop/ShopList'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'

class Shop extends PureComponent {

  componentDidMount(){

    this.props.fetchShop()
  }

  render() {
       if (position() === "SuperAdmin") {
       const {shops} = this.props
    return (

        <div className="">
       <Helmet>
        <title>Shop Management</title>
        <meta name="description" content="Supplier Management" />
    </Helmet>

 <div className="grid">

 <div className="column column-7">
 <ShopList ShopList={shops} />
 </div>

 <div className="column column-5">
     {/*<Text strong type="secondary">Add New Record</Text>*/}
 <CreateShop/>
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
        shops: state.shop.shops,
        auth: state.auth

    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchShop: ()=> dispatch(fetchShop())
  }
}

export default
connect(mapStateToProps, mapDispatchToProps)(Shop);
