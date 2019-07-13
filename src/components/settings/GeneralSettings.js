import React from 'react'
import { Typography,Timeline, Button,Icon } from 'antd';
const {  Text } = Typography;

const GeneralSettings = ({settings, click}) =>{
let data = []
  settings && settings.forEach(function(val,index) {
      data['id'] = settings[index].id
      data['currency'] = settings[index].currency
      data['updated_by'] = settings[index].updated_by
      data['updated_at'] = settings[index].updated_at
})

    return (
      <div className="User-list section">
          <Text strong>Shop Settings</Text>
          <br/>
          <Timeline>
    <Timeline.Item>id - {data.id}</Timeline.Item>
    <Timeline.Item color={data.currency && data.currency?"green": "red"}>currency - {data.currency}</Timeline.Item>
    <Timeline.Item>Updated at - {data.updated_at}</Timeline.Item>
    <Timeline.Item>By - {data.updated_by}</Timeline.Item>
  </Timeline>
          <Button type="danger" onClick={() =>
            {
                 const datas = {
                     id: data.id,
                     currency: data.currency,
                     edit:true
            };
                click(datas)
            }

            } ><Icon type="edit" theme="twoTone" />Edit</Button>
      </div>
  )


}


export default GeneralSettings;
