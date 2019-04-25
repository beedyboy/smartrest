/**
 * Created by wawooh on 4/25/19.
 */
import React from 'react'
import {TableConfig} from '../../Config'
import { Table , Typography} from 'antd';
const {  Text } = Typography;

const CartList = ({data}) =>{

      const columns = [{
        title: 'Item',
        dataIndex: 'product_name',
        key: 'product_name',
      },
      {
        title: 'Unit Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
      },
      {
        title: 'Total Price',
        dataIndex: 'total',
        key: 'total',
      }
    ]
     return (


       <div>

      <Table rowKey="id" dataSource={data} columns={columns}  {...TableConfig}   bordered
    title={() =>  <Text strong type="primary">Cart </Text>}
 />
       </div>


  )


}


export default CartList;
