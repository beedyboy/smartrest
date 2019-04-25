import React from 'react'
import {NavLink, Link} from 'react-router-dom'  
 
const Sidebar = ({auth}) => {  
 
    return (
        
      <div>
         
  <ul id="slide-out" className="sidenav ">
    <li>
        <div className="user-view">
      <div className="background">
        <img src="img/cover.jpeg"  alt=""/>
     </div>
    <img className="circle" src="img/avatar.jpeg" alt="" />  
      <NavLink to="/login"><span className="white-text name">{auth.fullname}</span></NavLink>
      <NavLink to="/profile"><span className="white-text email">boladebode@gmail.com</span></NavLink>
    </div>
    </li>
    <li><NavLink to='/'><i className="material-icons">dashboard</i>Dashboard</NavLink></li> 
    <li><div className="divider"></div></li>
    <li><Link to='/' className="subheader">Sales Menu</Link></li>
    <li><NavLink to='/'><i className="material-icons">shopping_cart</i>Sales</NavLink></li> 
    <li><NavLink to='/'><i className="material-icons">shopping_basket</i>Basket</NavLink></li> 
 
  <li><Link to='/' className='dropdown-trigger btn'   data-target='reportDropdown'>Report!</Link></li>
 <li> 
     <ul id='reportDropdown' className='dropdown-content'>
     <li><NavLink to='/'><i className="material-icons">show_chart</i>Sales Report</NavLink></li>  
     <li><NavLink to='/'><i className="material-icons">show_chart</i>Staff Report</NavLink></li>  
     <li><NavLink to='/'><i className="material-icons">show_chart</i>Product Report</NavLink></li>  
  </ul>
   </li>
 
        

 
    <li><div className="divider"></div></li>
    <li><Link to='/' className="subheader">Inventory</Link></li>
    <li><NavLink to='/'><i className="material-icons">restaurant_menu</i>Product</NavLink></li> 
    <li><NavLink to='/supplier'><i className="material-icons">dashboard</i>Supplier</NavLink></li> 

    <li><div className="divider"></div></li>
    
    <li><Link to='/' className="subheader">User Menu</Link></li>
    <li><NavLink to='/user'><i className="material-icons">people</i>User Management</NavLink></li> 

    <li><div className="divider"></div></li>
    <li><i className="subheader"></i></li>
   
  <li><Link to='/' className='dropdown-trigger red btn'  data-target='settingsDropdown'>Settings!</Link></li>
 <li> 
     <ul id='settingsDropdown' className='dropdown-content'>
     <li><NavLink to='/hall'><i className="material-icons">store</i>Hall Settings</NavLink></li>   
     <li><NavLink to='/'><i className="material-icons">settings</i>General Settings</NavLink></li>   
     <li><NavLink to='/'><i className="material-icons">backup</i>Backup</NavLink></li>   
     <li><NavLink to='/'><i className="material-icons">show_chart</i>Activation</NavLink></li>   
  </ul>
   </li>
  </ul>
  
        
      </div>
    )
}
export default Sidebar;