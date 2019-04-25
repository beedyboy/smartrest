/**
 * Created by wawooh on 4/14/19.
 */
import React from 'react'
import { Table } from 'antd';

const SupplierList = ({suppliers}) =>{
const columns = [{
        title: 'Supplier',
        dataIndex: 'supplier_name',
        key: 'supplier_name',
      },
      {
        title: 'Contact',
        dataIndex: 'supplier_contact',
        key: 'tid',
      },
      {
        title: 'Contact Person',
        dataIndex: 'contact_person',
        key: 'contact_person',
      },
      {
        title: 'Address',
        dataIndex: 'supplier_address',
        key: 'supplier_address',
      }
    ]
    return (


       <div>

      <Table rowKey="id" dataSource={suppliers} columns={columns} />
       </div>
  )


}


export default SupplierList;
