
/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { CSVLink } from "react-csv";
import { Typography,Table,Icon, Button, Row, Col, Tag } from 'antd';
import {TableConfig2, Styles} from '../../Config'
const {  Text } = Typography;
 
const SalesReportTable = React.memo(({report, total, trail, settings}) =>{
 
const columns = [
    {
        title: 'Invoice Number',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
      },
      {
        title: 'Cashier',
        dataIndex: 'cashier',
        key: 'cashier',
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Transaction Date',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }

     ];


const headers = [
    {
        label: 'Invoice Number',
        key: 'invoice_number',
      },
      {
        label: 'Cashier',
        key: 'cashier',
      },
      {
        label: 'Amount (' +settings.currency+')',
        key: 'amount',
      },
      {
        label: 'Transaction Date',
        key: 'created_at',
      },
      {
        label: 'Status',
        key: 'status',
      }

     ];

    return (
       <React.Fragment>
  <Row gutter={16}>

      <Col span={24}>

 {report &&report? (
     <React.Fragment>
 <Button type="primary" style={Styles.button}  > <Icon type="printer" />Print</Button>
           <Button type="primary" onClick={trail} style={Styles.color.geekblue}><Icon type="dot-chart" />Show Trail</Button>

<CSVLink
  data={report}
  filename={"my-file.csv"}
  target="_blank"
   style={Styles.actionButton}
   headers={headers}
  onClick={() => {
    console.log("You click the link"); // 👍🏻 Your click handling logic
  }}
><Icon type="file-excel" />
 Export to excel
</CSVLink>
 </React.Fragment>           ) : ''
          }

      </Col>
      <Col span={24}>
   <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Report Sheet </Text>}
 />
  <div style={{marginLeft:'120px', fontWeight:'bolder'}}>
    Total Amount is <Tag color="geekblue" >{total? total : 0} {settings.currency} </Tag>
  
    </div>   
     </Col>
  </Row>
       </React.Fragment>
  )


});


export default SalesReportTable;

