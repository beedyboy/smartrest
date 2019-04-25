import React, { Component } from 'react'
import {Menu, Dropdown} from 'antd'

export default class RightContent extends Component {
    
  render() {
      const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          <Menu.Item key="userCenter">
            <Icon type="user" />
            {/* <FormattedMessage id="menu.account.center" defaultMessage="account center" /> */}
          </Menu.Item>
          <Menu.Item key="userinfo">
            <Icon type="setting" />
            account settings
            {/* <FormattedMessage id="menu.account.settings" defaultMessage="account settings" /> */}
          </Menu.Item>
          <Menu.Item key="triggerError">
            <Icon type="close-circle" />
            {/* <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" /> */}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">
            <Icon type="logout" />
           logout 
          </Menu.Item>
        </Menu>
      );
    return (
      <div>
        


// {currentUser.name ? (
    <Dropdown overlay={menu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={styles.name}>{currentUser.name}</span>
      </span>
    </Dropdown>
//   ) : (
//     <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
//   )}

      </div>
    )
  }
}
