import React from 'react'
import { Table, Typography } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Seat = ({seats}) =>{
const columns = [{
        title: 'Seat Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Table Name',
        dataIndex: 'tid',
        key: 'tid',
      }
    ]
    return (


       <div>

      <Table rowKey="id" dataSource={seats} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Seats </Text>}
 />
       </div>
  )
 
    
}
 

export default Seat;
