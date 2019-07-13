import React from 'react'

import { Table as AntdTable , Typography,Icon, Button} from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Table = React.memo(({tables, role, click}) =>{

      const columns = [{
        title: 'Table Name',
        dataIndex: 'tname',
        key: 'tname',
      },
      {
        title: 'Zone',
        dataIndex: 'name',
        key: 'name',
      },
     {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        tables.length >= 1
          ? (


             <React.Fragment>

                 <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  name: record.hid,
                  tname: record.tname,
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

    ];

     return (
      
     
       <div>

      <AntdTable rowKey="id" dataSource={tables} columns={columns} {...TableConfig2} bordered
    title={() =>  <Text strong type="primary">Tables </Text>}
 />
       </div>
 
     
  )
 
    
});
 

export default Table;
