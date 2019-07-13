/**
 * Created by wawooh on 4/25/19.
 */
import React, {memo} from 'react'

import { Table , Typography, Tag} from 'antd';
const {  Text } = Typography;
const CartTotal = memo(({summary, settings}) =>{
      const columns = [{
        // title: 'Product Count',
        dataIndex: 'productCount',
        key: 'productCount',
           render: (text, record) => (
              <span> Product Count( {record.productCount})</span>


           ),
      },
      // {
      //   title: 'Discount',
      //   dataIndex: 'discount',
      //   key: 'discount',
      // },
      {
        // title: 'Sub Total',
        dataIndex: 'total',
        key: 'total',
            render: (text, record) => (
                   <Tag color="geekblue" key={record.total}>Sub Total  {record.total}  ({settings.currency}) </Tag>


           ),
      }
    ]
     return (


       <div>

      <Table rowKey="id" dataSource={summary} columns={columns} showHeader={false}  pagination={false}   bordered
    title={() =>  <Text strong type="primary">Summary </Text>}
 />
       </div>


  )


}
)

export default CartTotal;
