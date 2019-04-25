import React from 'react'
import { Typography,Table,Divider, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const UserList = ({users}) =>{

  const columns = [{
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
      fixed: 'left',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },  
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
  },
      {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 260,
   render: (text, record) => (

       <span>
           <Button>Edit  </Button>
      <Divider type="vertical" />
      <Button>Delete</Button>
       </span>

  ),
  },
] 

    return (
      <div className="User-list section">
        <Table rowKey="id" dataSource={users} columns={columns}  {...TableConfig2}   scroll={{ x: 800, y: 300 }}  bordered
    title={() =>  <Text strong type="primary">User Record </Text>} />
       
      </div>
  )
 
    
}
 

export default UserList;
