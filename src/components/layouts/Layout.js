import React, { PureComponent, Suspense } from 'react'
import { Menu, Layout, Icon, Button, Breadcrumb } from 'antd';
import SideBar from './SideBar'
import PageLoading from '../loading/PageLoading'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/authActions';
import Clock from '../utility/Clock'

const { Header, Content } = Layout;

class MainLayout extends PureComponent {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  
  render() {
    // console.log('layout',this.props)
    return (
 
    <React.Fragment>

<Suspense fallback={<PageLoading />}>
<Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
         <Button type="primary" onClick={this.toggle} style={{ marginBottom: 10 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                  </Button> 
                  </Menu.Item>

          <Menu.Item key="2">
              <Clock/>
          </Menu.Item>
           {
                          this.props.isAuthenticated ?
                               <Menu.Item key="3" onClick={this.props.logout}>Logout</Menu.Item>
                              :
                               <Menu.Item key="3"><Link to="/login" >Login</Link></Menu.Item>
                      }
      </Menu>
    </Header>
    <Layout>
    <SideBar option={this.state}/>
    <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff', padding: 24, margin: 0, minHeight: 500,
        }}
        >
          {this.props.children}
        </Content>

        </Layout>
    </Layout>
  </Layout>
        </Suspense>
        {/* <SideBar option={this.state}/> */}
    </React.Fragment>
    )
  }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: ()=>dispatch(actions.logout())
    }
}

export default withRouter(connect(null,mapDispatchToProps)(MainLayout));

// export default withRouter(MainLayout)
