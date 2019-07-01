/**
 * Created by wawooh on 4/16/19.
 */
/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { Typography,Table,Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;


const PurchaseList = React.memo(({purchases,  click}) =>{

const columns = [
    {
        title: 'Item',
        dataIndex: 'item_name',
        key: 'item_name',
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier_name',
        key: 'supplier_name',
      },
      {
        title: 'Type',
        dataIndex: 'transaction_type',
        key: 'transaction_type',
      },
      {
        title: 'Quantity',
        dataIndex: 'qty',
          render:(text,record)=> (

                  <Text>{record.qty +''+ record.unit}</Text>

          ),
        key: 'qty',
      },
      {
        title: 'Cost',
        dataIndex: 'cost_price',
        key: 'cost_price',
      }
    , {
      title: 'Edit',
      dataIndex: 'operation',
      render: (text, record) => (
        purchases.length >= 1
          ? (
           <React.Fragment>

             <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  item_name: record.item_name,
            cost_price: record.cost_price,
            supplierId: record.supplierId,
            purchased_date: record.purchased_date,
            transaction_type: record.transaction_type,
            unit: record.unit,
            note: record.note,
             qty:record.qty,
            create:false,
            };
                click(data)
            }

            } >

            <Icon type="edit"/> </Button>
        </React.Fragment>

          ) : null
      ),
    }];

    return (

       <div>

   <Table rowKey="id" dataSource={purchases} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Store Items </Text>}
 />
       </div>
  )


});


export default PurchaseList;
