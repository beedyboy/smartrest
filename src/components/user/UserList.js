import React from 'react'
import { Typography,Table, Divider, Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;

const UserList = React.memo(({users, edit, del, role}) =>{
  const columns = [
      {
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
    title: 'Date Joined',
    dataIndex: 'date_joined',
    key: 'date_joined',
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

           <Button type="danger" onClick={() =>
            {
                   const data = {
                        id: record.id,
                        fullname: record.fullname,
                        username: record.username,
                        acc_email: record.acc_email,
                        position: record.position,
                        date_joined:record.date_joined,
                        create: false

            };
                edit(data)
            }

            } >
             <Icon type="edit"/>Edit  </Button>


        <React.Fragment>
        <Divider type="vertical" /> <Button onClick={() =>
            {
                  del(record.id)
            }}> <Icon type="user-delete" />Delete</Button>
        </React.Fragment>

       </span>


  ),
  },
] 

    return (
      <div className="User-list section">
        <Table rowKey="id" dataSource={users} columns={columns}  {...TableConfig2}  bordered
    title={() =>  <Text strong type="primary">User Record </Text>} />
       
      </div>
  )
 
    
});
 

export default UserList;
