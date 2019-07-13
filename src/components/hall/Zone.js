import React from 'react' 
import { Table, Typography,Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const Zone = React.memo(({zones, role, click}) =>{
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
    , {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        zones.length >= 1
          ? (

              <React.Fragment>
            <Button type="primary" onClick={() =>
            {
                 const data = {
                     id: record.id,
                  name: record.name,
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
          

      <Table rowKey="id" dataSource={zones} columns={columns}   {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Zones </Text>}
 />
       </div>
      
      
    )
  });
      
  
export default Zone;
