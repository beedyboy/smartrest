import React, { Component, Suspense } from 'react';
import * as actions from './store/actions/authActions'
// import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
        import PageLoading from './components/loading/PageLoading'
//route
import User from './containers/User'
import Hall from './containers/Hall'
import ProductMenu from './containers/Product'
import Supplier from './containers/Supplier'
import SignIn from './components/auth/SignIn'
import Purchases from './containers/Purchases'
import Acquisition from './containers/Acquisition'
import POS from './containers/Pos'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
 import {PrivateRoute} from './PrivateRoute'

//import the layout 
import MainLayout from './components/layouts/Layout'
class App extends Component {
  componentDidMount() {
    // Auto initialize all the things!
    this.props.onTryAutoSignUp();
} 
  render() {
// const {loggedIn} = this.props.isAuthenticated

  // console.log(store)
    return (
       <BrowserRouter>
      
        {/* <MainLayout {...this.props} />  */}
       <Suspense fallback={<PageLoading />}>
        <Switch>

                <MainLayout {...this.props} >

                    <PrivateRoute exact path='/hall' component={Hall}/>
                    <PrivateRoute exact path='/user' component={User}/>
                    <PrivateRoute exact path='/supplier' component={Supplier}/>
                    <PrivateRoute exact path='/product' component={ProductMenu}/>
                    <PrivateRoute exact path='/purchases' component={Purchases}/>
                    <PrivateRoute exact path='/acquisition' component={Acquisition}/>
                    <PrivateRoute exact path='/pos' component={POS}/>
       <Route exact path='/login'
           render={(props) => (<SignIn {...this.props} />)}
           />
                </MainLayout>



       </Switch>
       </Suspense>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    
      isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

