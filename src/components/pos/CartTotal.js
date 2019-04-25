/**
 * Created by wawooh on 4/25/19.
 */
import React from 'react'

import { Table , Typography, Tag} from 'antd';
const {  Text } = Typography;
const CartTotal = ({summary}) =>{
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
                   <Tag color="geekblue" key={record.total}>Sub Total  {record.total} </Tag>


           ),
      }
    ]
     return (


       <div>

       </div>


  )


}


export default CartTotal;
