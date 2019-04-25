import React from 'react'

import { Menu, Layout as Lay, Icon } from 'antd';

import {Link} from 'react-router-dom'

const {
    Sider,
   } = Lay;
   
const SubMenu = Menu.SubMenu;
const SideBar = ({option}) => {
// console.log(props)
 
    return (
        <div>
             
      <Sider
       width={200} style={{   
        overflow: 'auto', height: '100vh', position: 'relative',  left: 0,
      }}
      trigger={null}
      breakpoint="sm"
      collapsedWidth="0"
          collapsible
          collapsed={option.collapsed}
          // onBreakpoint={(broken) => { console.log(broken); }}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
    
      {/* <div className="logo"> 
       <img src="img/cover.jpeg"  alt=""/>
       </div> */}

      <Menu  mode="inline" defaultSelectedKeys={['4']}  style={{ height: '100%', borderRight: 0, backgroundColor:'dark-red' }}>
        <Menu.Item key="1">
         <Link to='/hall'>
          <Icon type="user" />
          <span className="nav-text">Hall</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to='/user'>
              <Icon type="team" />
          <span className="nav-text">User</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/supplier'>
              <Icon type="upload" />
          <span className="nav-text">Supplier</span>
               </Link>
        </Menu.Item>
        <Menu.Item key="4">
             <Link to='/pos'>
          <Icon type="shopping-cart" spin/>
          <span className="nav-text">POS</span>
             </Link>
        </Menu.Item>

           <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Inventory </span></span>}>
               <Menu.Item key="7">  <Link to='/product'>Product</Link></Menu.Item>
               <Menu.Item key="5">  <Link to='/purchases'>Purchases</Link></Menu.Item>
               <Menu.Item key="6">  <Link to='/acquisition'>Acquisition</Link></Menu.Item>

           </SubMenu>


      </Menu>

    </Sider> 
   
        </div>
    )
}

export default SideBar;
