import React from 'react'

import {  Descriptions} from 'antd';
import {joined, phone, status, fullname, user, position} from '../store/utility'  

const Profile = React.memo(({ stocks, click }) => {
 
    return (


        <div>
<Descriptions title="User Info" bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout="vertical">
    <Descriptions.Item label="Fullname">{fullname()}</Descriptions.Item>
    <Descriptions.Item label="UserName">{user()}</Descriptions.Item>
    <Descriptions.Item label="Telephone">{phone()}</Descriptions.Item>
    <Descriptions.Item label="Position">{position()}</Descriptions.Item> 
    <Descriptions.Item label="Status">{status()}</Descriptions.Item>
    <Descriptions.Item label="Date">
     You Joined on {joined()}
    </Descriptions.Item>
  </Descriptions>
            
        </div>


    )


});


export default Profile;
