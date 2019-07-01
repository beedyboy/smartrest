
/**
 * Created by wawooh on 5/08/19.
 */

import React from 'react'
import { CSVLink } from "react-csv";
import { Typography,Table,Icon, Button, Row, Col } from 'antd';
import {TableConfig2, Styles} from '../../Config'
const {  Text } = Typography;


const SalesTrail = React.memo(({report, settings}) =>{

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
        <Button type="primary" style={Styles.button}  > <Icon type="printer" />Print</Button>

          {report &&report?

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
          : ''
          }

      </Col>
      <Col span={24}>
   <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Sales Trail</Text>}
 />
      </Col>
  </Row>
       </React.Fragment>
  )


});


export default SalesTrail;

