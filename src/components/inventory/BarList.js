/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { Typography,Table,Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;


const BarList = ({bar, click}) =>{

const columns = [{
        title: 'Product',
        dataIndex: 'product_name',
        key: 'product_name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Added Qty',
        dataIndex: 'added_qty',
        key: 'added_qty',
      },
      {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
      }
    , {
      title: 'Edit',
      dataIndex: 'operation',
      render: (text, record) => (
        bar.length >= 1
          ? (
           <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  kitchen: record.kitchen,
            product_name: record.product_name,
            price: record.price,
            create:false,
            };
                click(data)
            }

            } >
               <Icon type="edit"/> </Button>

          ) : null
      ),
    }];


    return (


       <div>

   <Table rowKey="id" dataSource={bar} columns={columns}  {...TableConfig2}  bordered
    title={() =>  <Text strong type="primary">Bar </Text>}
 />
       </div>
  )


}


export default BarList;
