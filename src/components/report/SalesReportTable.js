
/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { CSVLink } from "react-csv";
import { Typography,Table,Icon, Button, Row, Col, Tag } from 'antd';
import {TableConfig2, Styles} from '../../Config'
import ReactToPrint from "react-to-print";
const {  Text } = Typography;
 
const SalesReportTable = React.memo(({report, total, trail, settings, period, showModal}) =>{

const columns = [
    {
        title: 'Invoice Number', 
        key: 'invoice_number',
        render: (record)=>  (
               <React.Fragment>

             <Button type="primary" onClick={() =>showModal(record.id, record.invoice_number)}>
                 <Icon type="eye" />{record.invoice_number}</Button>
               </React.Fragment>
          )
      },
      {
        title: 'Order Number',
        dataIndex: 'order_number',
        key: 'order_number',
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
        label: 'Order Number', 
        key: 'order_number',
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

<ReactToPrint
          trigger={() =>  <Button type="primary" style={Styles.button}  ><Icon  type="printer" />Print</Button>}
          // content={() => this.r}
        />
 {/* <Button type="primary" style={Styles.button}  > <Icon type="printer" />Print</Button> */}
           <Button type="primary" onClick={trail} style={Styles.color.geekblue}><Icon type="dot-chart" />Show Trail</Button>

<CSVLink
  data={report}
  filename={"salesReport"+period+".csv"}
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
    footer={() =>  <Text strong type="primary" style={{fontWeight:'bolder' , marginLeft: '30%'}}> Total Amount <Tag color="geekblue" >{ total?  total : ' 0'} {settings.currency}</Tag></Text>}
    // ref={el => (this.r = el)} 
 />
    
     </Col>
  </Row>
       </React.Fragment>
  )


});


export default SalesReportTable;

