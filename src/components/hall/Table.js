import React from 'react'

import { Table as AntdTable , Typography} from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Table = ({tables}) =>{
   const config = {
    pagination : {
        pageSizeOptions : ['30', '40'],
        showSizeChanger : true,
        pageSize: 4
    }
}

      const columns = [{
        title: 'Table Name',
        dataIndex: 'tname',
        key: 'tname',
      },
      {
        title: 'Zone',
        dataIndex: 'name',
        key: 'name',
      }  
    ] 
     return (
      
     
       <div>

      <AntdTable rowKey="id" dataSource={tables} columns={columns} {...config} bordered
    title={() =>  <Text strong type="primary">Tables </Text>}
 />
       </div>
 
     
  )
 
    
}
 

export default Table;
