/**
 * Created by wawooh on 4/14/19.
 */
import React from 'react'
import { Table, Typography } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const ShopList = React.memo(({ShopList}) =>{
const columns = [
    {
        title: 'Shop',
        dataIndex: 'shopName',
        key: 'shopName',
      },
      {
        title: 'Phone',
        dataIndex: 'shopPhoneNum',
        key: 'shopPhoneNum',
      },
      {
        title: 'Email',
        dataIndex: 'shopEmail',
        key: 'shopEmail',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }
    ]
    return (


       <div>

      <Table rowKey="id" dataSource={ShopList} columns={columns}  {...TableConfig2}    bordered
    title={() =>  <Text strong type="secondary">Shop List</Text>}
 />
       </div>
  )


});


export default ShopList;
