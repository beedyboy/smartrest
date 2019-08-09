
import React, {useRef} from 'react'
import { Typography,Table, Radio, Row, Col,  Button, Icon, Tag  } from 'antd';
import { TableConfig2, Styles } from '../../Config'
import ReactToPrint from "react-to-print";
import PrintDept from './PrintDept';
const {  Text } = Typography;
 
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Department = ({ dept, change, settings, period}) =>{
const componentRef = useRef();
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

            {dept && dept ? (
              <React.Fragment>

                <ReactToPrint
                  trigger={() => <Button type="primary" style={Styles.print}  ><Icon type="printer" />Print</Button>}
                  content={() => componentRef.current}
                /> 
              </React.Fragment>
            ) : ''
            }

          </Col>
      <Col span={24}>
          <Row gutter={16}>

      <Col span={24}>
   <Table rowKey="key" dataSource={dept} columns={columns}  {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Department Analysis</Text>}
    footer={() =>  <Text strong type="primary" style={{fontWeight:'bolder',  marginBottom: '10px',
    marginLeft: '70%'}}> Total Amount <Tag color="geekblue" >{ s?  s : ' 0'} {settings.currency}
    </Tag></Text>}
 />
 
      </Col>

                  <Col span={12}>


                  </Col>



          </Row>
      </Col>
  </Row>
        <React.Fragment>
          <div style={{ display: 'none' }}>
            <PrintDept ref={componentRef} dept={dept} period={period} total={s} settings={settings} />
          </div>
        </React.Fragment>
       </React.Fragment>
  )


}


export default Department;

