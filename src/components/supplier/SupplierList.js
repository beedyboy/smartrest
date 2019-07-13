/**
 * Created by wawooh on 4/14/19.
 */
import React from 'react'
import { Table, Typography, Button, Icon } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const SupplierList = React.memo(({suppliers, role, click}) =>{
const columns = [
    {
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
    , {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        suppliers.length >= 1
          ? (
              <React.Fragment>
          <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  supplier_name: record.supplier_name,
                  contact_person: record.contact_person,
                  supplier_contact: record.supplier_contact,
                  supplier_address: record.supplier_address,
                  note: record.note,
                  create:false,
            };
                click(data)
            }

            } >
               <Icon type="edit"/> </Button>

</React.Fragment>
          ) : null
      ),
    }

    ]
    return (


       <div>

      <Table rowKey="id" dataSource={suppliers} columns={columns}  {...TableConfig2}    bordered
    title={() =>  <Text strong type="secondary">Supplier Record</Text>}
 />
       </div>
  )


});


export default SupplierList;
