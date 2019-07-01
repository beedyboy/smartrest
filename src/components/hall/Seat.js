import React from 'react'
import { Table, Typography,Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Seat = React.memo(({seats, role, click}) =>{
const columns = [{
        title: 'Seat Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Table Name',
        dataIndex: 'tname',
        key: 'tname',
      },
        {
      title: 'Edit',
      dataIndex: 'operation',
      render: (text, record) => (
        seats.length >= 1
          ? (
              <React.Fragment>
             <Button type="primary" onClick={() =>
            {
                 const data = {
                  id: record.id,
                  hid: record.hid,
                  tid: record.tid,
                  seat: record.name,
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

      <Table rowKey="id" dataSource={seats} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Seats </Text>}
 />
       </div>
  )
 
    
});
 

export default Seat;
