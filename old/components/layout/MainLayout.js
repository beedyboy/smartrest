import React from 'react'
import {Link} from 'react-router-dom'  
import {connect} from 'react-redux'
import Clock from '../utility/Clock' 
import Sidebar from './Sidebar'
import * as actions from '../../store/actions/authActions'
// import M from "materialize-css"; 
 
class MainLayout extends React.Component { 
   render(){ 
//  console.log(this.props)
    const {auth} = this.props
    return (
        
      <div>
         
           <nav className="red darken-3 z-depth-1">
    <div className="nav-wrapper">
    
      <Link to="/"  data-target="slide-out" className="sidenav-trigger  show-on-large  hide-on-med-and-down "><i className="material-icons">menu</i></Link>
      <Link to="/" data-target="slide-out"  className="brand-logo ">Smart Restaurant</Link>
      <Link  to="/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
    
    
      <ul className="right hide-on-med-and-down"> 
        <li><a href="collapsible.html">{auth.position}</a></li>
        <li><button className="btn-floating btn-small waves-effect waves-light red" onClick={this.props.logout}>Log out</button></li>
      </ul>  
      
      <ul className="right smartClock">
     <li><Clock/></li>
      </ul>

    </div>
  </nav>
 <Sidebar auth={auth} /> 
  {/* <ul className="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul> */}
   

      </div>
    )
   }
}


const mapStateToProps = (state)=> {
  // console.log(state)
  return {
      
      // auth: state.auth, 
  }
}
const mapDispatchToProps = (dispatch) => {
return { 
    logout:()=>dispatch(actions.logout())
}
}

export default
connect(mapStateToProps, mapDispatchToProps)(MainLayout); 
// export default MainLayout;