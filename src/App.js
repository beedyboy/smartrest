import React, { PureComponent, Suspense } from 'react';
import * as actions from './store/actions/authActions'
// import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
  import PageLoading from './components/loading/PageLoading'
//route
import Dashboard from './containers/Dashboard'
import User from './containers/User'
import Hall from './containers/Hall'
// import ProductMenu from './containers/Product'
import Supplier from './containers/Supplier'
import SignIn from './components/auth/SignIn'
import Purchases from './containers/Purchases'
import Acquisition from './containers/Acquisition'
import POS from './containers/Pos'
import Menu from './containers/Menu'
import Kitchen from './containers/Kitchen'
import EditSales from './components/pos/EditSales'
import Print from './components/utility/Print'
import Shop from './containers/Shop'
import SalesReport from './containers/SalesReport'
import StaffReport from './containers/StaffReport'
import Settings from './containers/Settings'


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
                <MainLayout {...this.props} >

                    <PrivateRoute exact path='/' component={Dashboard}/>
                   <PrivateRoute exact path='/hall' component={Hall}/>
                    <PrivateRoute exact path='/user' component={User}/>
                    <PrivateRoute exact path='/supplier' component={Supplier}/>
                    <PrivateRoute exact path='/menu' component={Menu}/>
                    {/* <PrivateRoute exact path='/product' component={ProductMenu}/> */}
                    <PrivateRoute exact path='/purchases' component={Purchases}/>
                    <PrivateRoute exact path='/acquisition' component={Acquisition}/>
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

