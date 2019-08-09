import React, { PureComponent, Suspense } from 'react'
import { Menu, Layout, Icon, Dropdown, Avatar, Breadcrumb } from 'antd';
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

const page = this.props.location.pathname
    // console.log('layout',this.props)
        const menu = (
        <Menu  selectedKeys={[]} >
          <Menu.Item key="userCenter">
            <Link to="/profile">  <Icon type="user" />
           Profile </Link>
          </Menu.Item>
          <Menu.Item key="userinfo">
            <Icon type="setting" />
            account settings

          </Menu.Item>

          <Menu.Divider />
          <Menu.Item key="logout" onClick={this.props.logout} >
            <Icon type="logout" />
           logout
          </Menu.Item>
        </Menu>
      );
    return (
 
    <React.Fragment>

<Suspense fallback={<PageLoading />}>
<Layout className="layout">
    <Header style={{background: '#007ECC'}}>
      <div className="logo" />
        <span className="global-header-index-trigger">
              <i aria-label="icon: menu-fold" className="anticon" onClick={this.toggle} style={{ marginBottom: 10 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                  </i>
        </span>
        <span> <Clock/> </span>
        <div className="global-header-index-right">
            { this.props.isAuthenticated ?
                <Dropdown overlay={menu}>
      <span>
        <Avatar
            style={{ backgroundColor: '#87d068' }}
            size="small"
            alt="avatar"
            src="/img/avatar.png"
        />
        <span> {this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1, this.props.user.length)}</span>
      </span>
                </Dropdown>
                :
                <Link to="/login"> <Icon type="login"/>Login</Link>
            }

      {/*<Menu*/}
        {/**/}
        {/*mode="horizontal"*/}
        {/*defaultSelectedKeys={['2']}*/}
        {/*style={{ lineHeight: '64px' }}*/}
      {/*>*/}


        </div>
    </Header>
    <Layout>
    <SideBar option={this.state} props={this.props}/>
    <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/"><Icon type="dashboard" /> Dashboard</Link>
             {page.replace(/\/$/, "")}</Breadcrumb.Item>
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

const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        role: state.auth.role
        }
        }
const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.hotLogout())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainLayout));

