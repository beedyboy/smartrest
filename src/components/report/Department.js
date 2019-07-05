/**
 * Created by wawooh on 5/4/19.
 */
/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { Typography,Table, Radio, Row, Col, Tag  } from 'antd';
import {TableConfig2} from '../../Config' 
const {  Text } = Typography;
 
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Department = ({dept, change, settings}) =>{
  var r = dept && dept.map(a=> a.price)
  let s = r && r.length > 0 && r.reduce((acc,  val)=> {
    return acc + val;
  }); 
const columns = [
    {
        title: 'Menu Name',
        dataIndex: 'menu_name',
        key: 'menu_name',
      },
      {
        title: 'Quantity Sold',
        dataIndex: 'sold',
        key: 'sold',
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'price',
        key: 'price',
      }

     ];
 
    return (


       <React.Fragment>
  <Row gutter={16}>

      <Col span={24}>
       <RadioGroup onChange={change} defaultValue="Total"  buttonStyle="solid">
        <RadioButton value="Total">Total</RadioButton>
        <RadioButton value="Bar">Bar</RadioButton>
        <RadioButton value="Local">Local</RadioButton>
        <RadioButton value="Continental">Continental</RadioButton>
      </RadioGroup>

      </Col>
      <Col span={24}>
          <Row gutter={16}>

      <Col span={24}>
   <Table rowKey="key" dataSource={dept} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Department Analysis</Text>}
    footer={() =>  <Text strong type="primary" style={{fontWeight:'bolder',  marginBottom: '10px',marginLeft: '70%'}}> Total Amount <Tag color="geekblue" >{ s?  s : ' 0'} {settings.currency}</Tag></Text>}
 />

{/* <Table rowKey="id" dataSource={summary} columns={columns} showHeader={false}  pagination={false}   bordered */}
    {/* title={() =>  <Text strong type="primary">Summary </Text>}
 /> */}

      </Col>

                  <Col span={12}>


                  </Col>



          </Row>
      </Col>
  </Row>
       </React.Fragment>
  )


}


export default Department;

