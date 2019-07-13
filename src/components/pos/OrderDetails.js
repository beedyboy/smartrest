/**
 * Created by wawooh on 5/2/19.
 */


import React from 'react'
import {TableConfig,Styles} from '../../Config'
import { Table , Typography, Button, Icon} from 'antd';

const {  Text } = Typography;

const OrderDetails = ({order,currency,redirect, editdel, id, invoice, cancel}) =>{
      const columns = [{
        title: 'Item',
        dataIndex: 'menu_name',
        key: 'menu_name',
      },
      {
        title: 'Unit Price (' +currency+')',
        render: (record)=>  (
          record.base === "Yes"?
          '-'

         :
         record.price
        )
      },
      {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
      },
      {
        title: 'Total Price ('+ currency+ ')',
        dataIndex: 'total',
        key: 'total',
      }


    ]
     return (


       <React.Fragment>
      <Table rowKey="id" dataSource={order} columns={columns}  {...TableConfig}   bordered
    title={() => <React.Fragment> <Text strong type="primary">Invoice: {invoice} </Text>

        {(editdel)?
         (
             <React.Fragment>
                    <Button type="danger"  style={Styles.button}  onClick={(e)=>{

                cancel(id, invoice)
                }
                }>
  <Icon type="delete" />Cancel</Button>

          <Button type="primary" onClick={(e)=>{

                redirect(invoice)
         }
              }><Icon type="edit" />Edit</Button>
        </React.Fragment>
         ): ''}

         </React.Fragment>
        }
 />
       </React.Fragment>


  )


}


export default OrderDetails;
