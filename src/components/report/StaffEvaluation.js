/**
 * Created by wawooh on 5/5/19.
 */

import React from 'react'
import { Typography,Table, Row, Col } from 'antd';
import {TableConfig2} from '../../Config'
const {  Text } = Typography;


const StaffEvaluation = React.memo(({report, settings}) =>{

const columns = [
    {
        title: 'Date',
        dataIndex: 'period',
        key: 'period',
      },
      {
        title: 'Invoice',
        dataIndex: 'invoice_number',
        key: 'sold',
      },
      {
        title: 'Amount (' +settings.currency+')',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }

     ];


    return (


       <React.Fragment>
  <Row gutter={16}>


      <Col span={24}>
          <Row gutter={16}>

      <Col span={24}>
   <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Department Analysis</Text>}
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

