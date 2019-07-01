/**
 * Created by wawooh on 4/17/19.
 */
import React from 'react'
import { Typography,Table,Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;


const AllocationList = React.memo(({allocation, role,  click}) =>{
const columns = [
    {
        title: 'Item',
        dataIndex: 'item_name',
        key: 'item_name',
      },

      {
        title: 'kitchen',
        dataIndex: 'kitchen',
        key: 'kitchen',
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
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        allocation.length >= 1
         ? (
              <React.Fragment>
            {(role && role.indexOf("editAllocation") !== -1 ) ?
                ( <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  kitchen: record.kitchen,
                 qty: record.qty,
                 unit: record.unit,
                itemId: record.itemId,
                create:false,
           };
                click(data)
            }

            } >
               <Icon type="edit"/> </Button> ):
                          'No access'}
         </React.Fragment>

          ) : null
      ),
    }];

    return (
       <div>

   <Table rowKey="id" dataSource={allocation} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Allocation Record [Items assigned to various kitchens]</Text>}
 />
       </div>
  )


});


export default AllocationList;
