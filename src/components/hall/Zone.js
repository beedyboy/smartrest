import React from 'react' 
import { Table, Typography } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Zone = ({zones}) =>{ 
    const columns = [{
        title: 'Zone Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Created On',
        dataIndex: 'created_at',
        key: 'created_at',
      }  
    ] 
     return (
      
     
       <div>
          

      <Table rowKey="id" dataSource={zones} columns={columns}   {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Zones </Text>}
 />
       </div>
      
      
    )
  }
      
  
export default Zone;
