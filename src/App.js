import React, { PureComponent, Suspense } from 'react';
import * as actions from './store/actions/authActions'
// import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
  import PageLoading from './components/loading/PageLoading'
//route
import Dashboard from './containers/Dashboard'
import User from './containers/User'
import Hall from './containers/Hall'
import Calculator from './containers/Calculator'
import Supplier from './containers/Supplier'
import SignIn from './components/auth/SignIn'
import Purchases from './containers/Purchases'
import Supervisor from './containers/Supervisor'
import POS from './containers/Pos'
import Product from './containers/Product'
import Menu from './containers/Menu'
import Kitchen from './containers/Kitchen'
import EditSales from './components/pos/EditSales' 
import Print from './components/utility/Print'
import Profile from './containers/Profile'
import Shop from './containers/Shop'
import Store from './containers/Store'
import SalesReport from './containers/SalesReport'
import StaffReport from './containers/StaffReport'
import Settings from './containers/Settings'
import InventorySettings from './containers/InventorySettings'


import {BrowserRouter, Switch, Route} from 'react-router-dom'
import GlobalErrorBoundary from './GlobalErrorBoundary'
 import {PrivateRoute} from './PrivateRoute'

//import the layout 
import MainLayout from './components/layouts/Layout'
class App extends PureComponent {
  componentDidMount() {
    // Auto initialize all the things!
    this.props.onTryAutoSignUp();
} 
  render() {
  // console.log(store)

    return (
       <BrowserRouter basename="/smartrest">
      

       <Suspense fallback={<PageLoading />}>
           <GlobalErrorBoundary>
        <Switch>
  <Route exact path='/login'
           render={(props) => (<SignIn {...this.props} />)}
           />
           <Route exact path = '/calc'    component = {Calculator} />
                <MainLayout {...this.props} >

                    <PrivateRoute exact path='/' component={Dashboard}/>
                   <PrivateRoute exact path='/profile' component={Profile}/>
                   <PrivateRoute exact path='/hall' component={Hall}/>
                    <PrivateRoute exact path='/user' component={User}/>
                    <PrivateRoute exact path='/supplier' component={Supplier}/>
                    <PrivateRoute exact path='/menu' component={Menu}/>
                    <PrivateRoute exact path='/product' component={Product}/>
                    <PrivateRoute exact path='/store' component={Store}/>
                    <PrivateRoute exact path='/purchases' component={Purchases}/>
                    <PrivateRoute exact path='/inventory/settings' component={InventorySettings} />
                    <PrivateRoute exact path='/stock' component={Supervisor}/>
                    <PrivateRoute exact path='/pos' component={POS}/>
                    <PrivateRoute exact path='/kitchen' component={Kitchen}/>
                    <PrivateRoute  path='/order/:invoice' component={EditSales}/>
                    <PrivateRoute  path='/print/:invoice' component={Print}/>
                    <PrivateRoute exact path='/shop' component={Shop}/>
                    <PrivateRoute exact path='/sales/report' component={SalesReport}/>
                    <PrivateRoute exact path='/staff/report' component={StaffReport}/>
                    <PrivateRoute exact path='/settings' component={Settings}/>

                </MainLayout>



       </Switch>
           </GlobalErrorBoundary>
       </Suspense>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    
      isAuthenticated: state.auth.token !== null,
      role: state.auth.role,
      user: state.auth.user,
      position: state.auth.position
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

