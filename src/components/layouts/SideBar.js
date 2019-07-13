import React from 'react'

import { Menu, Layout as Lay, Icon } from 'antd';

import {NavLink} from 'react-router-dom'

const {
    Sider,
   } = Lay;
   
const SubMenu = Menu.SubMenu;
const SideBar = ({option,props}) => {
// console.log(props.position)
let boo = false;
let canReport = false;
let hall = false;
let menu = false;
let user = false;
let supplier = false;
let purchases = false;
let sales = false;
let booSales = false;
let inventory = false;
// let kitboo = false;

if(props.position !== '' && (props.position === 'SuperAdmin') )
{
    boo = true
}
// if(props.position !== '' && ((props.position === 'SuperAdmin') || (props.position === 'Admin') || (props.position === 'Supervisor') || (props.position === 'KitchenAttendant')) )
// {
//     kitboo = true
// }


if(props.position !== '' && ((props.position === 'SuperAdmin') || (props.position === 'Admin') || (props.position === 'Supervisor') ) )
{
    purchases = true
    hall = true
    user = true
    menu = true
    supplier = true
}
if(props.position !== '' && ((props.position === 'SuperAdmin') || (props.position === 'Admin') || (props.position === 'Supervisor')  || (props.position === 'StoreKeeper') ) )
{
    purchases = true
}
if(props.position !== '' && ((props.position === 'SuperAdmin') || (props.position === 'Admin') || (props.position === 'Supervisor')  || (props.position === 'MobileAttendant')  || (props.position === 'Waiter')  || (props.position === 'Cashier') || (props.position === 'Bartender') ) )
{
    sales = true
}


if(props.position !== '' && ((props.position === 'SuperAdmin') || (props.position === 'Admin') || (props.position === 'Supervisor') || (props.position === 'Cashier')) )
{
    canReport = true
}



if(sales || canReport)
{
    booSales = true;
}
if(menu || purchases)
{
    inventory = true;
}

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
    >

      <Menu
          mode="inline"
          defaultSelectedKeys={['7']}
          style={{ height: '100%', borderRight: 0, backgroundColor:'dark-red' }}>
       {hall?
           (
                     <Menu.Item key="1">
                     <NavLink to='/hall'>
                    <Icon type="bank" theme="twoTone" />
                      <span className="nav-text">Hall</span>
                      </NavLink>
                    </Menu.Item>
           )
     : ''}
                 {user?
                       (
                    <Menu.Item key="2">
                      <NavLink to='/user'>
                          <Icon type="team" />
                      <span className="nav-text">User</span>
                      </NavLink>
                    </Menu.Item>
                )
                 : ''}
{inventory? (
           <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Inventory </span></span>}>

                 <Menu.Item key="4">  <NavLink to='/menu'><Icon type="coffee" />Menu</NavLink></Menu.Item>

               {purchases?
                       (<Menu.Item key="5">  <NavLink to='/purchases'><Icon type="database" theme="filled" />Purchases</NavLink></Menu.Item>)
                 : ''}

           </SubMenu>
      )
                 : ''}
{booSales? (
 <Menu.Item key="7">
             <NavLink to='/pos'>
          <Icon type="shopping-cart" spin/>
          <span className="nav-text">POS</span>
             </NavLink>
        </Menu.Item>
  ): ''}

   
 <Menu.Item key="13">
             <NavLink to='/kitchen'>
         <Icon type="fork" />
          <span className="nav-text">Kitchen</span>
             </NavLink>
        </Menu.Item>
   
          {canReport? (
           <SubMenu key="sub2" title={<span><Icon type="reconciliation" /><span>Report </span></span>}>
               <Menu.Item key="8">  <NavLink to='/sales/report'><Icon type="fund" theme="twoTone" />Sales Report</NavLink></Menu.Item>
             {boo? (  <Menu.Item key="9">  <NavLink to='/staff/report'><Icon type="bar-chart" />Staff Evaluation</NavLink></Menu.Item>   ): ''}

           </SubMenu>
              ): ''}
                {supplier?
                    (
           <Menu.Item key="10">
                  <NavLink to='/supplier'>
                  <Icon type="deployment-unit" />
                  <span className="nav-text">Supplier</span>
                       </NavLink>
                </Menu.Item>
                ): ''}
          {boo?  (

        <Menu.Item key="11">
          <NavLink to='/shop'>
              <Icon type="shop" />
          <span className="nav-text">Shop</span>
               </NavLink>
        </Menu.Item>
        )   : ''}
             {boo?  (
        <Menu.Item key="12">
          <NavLink to='/settings'>
            <Icon type="setting" />
          <span className="nav-text">Settings</span>
               </NavLink>
        </Menu.Item>

          )   : ''}
      </Menu>

    </Sider> 
   
        </div>
    )
}

export default SideBar;
