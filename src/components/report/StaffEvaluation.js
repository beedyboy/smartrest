

import React from 'react'
import { Typography, Table, Row, Col, Tag, Icon, Button } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;


const StaffEvaluation = React.memo(({report, settings, showModal}) =>{

  var r = report && report.map(a=> a.amount)
  let s = r && r.length > 0 && r.reduce((acc,  val)=> {
    return acc + val;
  }); 
const columns = [
    {
        title: 'Date',
        dataIndex: 'period',
        key: 'period',
      },
      {
        title: 'Invoice',
       
        key: 'invoice_number',
        render: (record) => (
          <React.Fragment>

            <Button type="primary" onClick={() => showModal(record.id, record.invoice_number)}>
              <Icon type="eye" />{record.invoice_number}</Button>
          </React.Fragment>
        ),
        
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key:'status'

      }

     ];


    return (


       <React.Fragment>
  <Row gutter={16}>


      <Col span={24}>
          <Row gutter={16}>

      <Col span={24}>
   <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Staff Report </Text>}
    footer={() =>  <Text strong type="primary" style={{fontWeight:'bolder',  marginBottom: '10px',
    marginLeft: '55%'}}> Total Amount <Tag color="geekblue" >{ s?  s : ' 0'} {settings.currency}
      </Tag></Text>}
 />
      </Col>

                  <Col span={12}>


                  </Col>



          </Row>
      </Col>
  </Row>
       </React.Fragment>
  )


});


export default StaffEvaluation;

