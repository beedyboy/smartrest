import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import {Styles} from '../../Config'

import { Typography,  Button, Select, Form, Input, Row, Col, Icon, Alert, DatePicker  } from 'antd';

const Option = Select.Option;
const {  Text } = Typography;

    const dateFormat = 'YYYY/MM/DD';
class CreateUser extends PureComponent {

  render() {
       const { result, reset } = this.props;
    return (

        <React.Fragment>

<Row gutter={8}>
     <Form layout="horizontal" onSubmit={this.props.state.create? this.props.handleSubmit : this.props.handleUpdate}>
<Col  xs={24} sm={24} md={10} lg={8} xl={8}>
<Col  xs={24} sm={24} md={24} lg={24} xl={24}>
       <Text mark type="secondary">User Information </Text>
              </Col>
      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
             <Form.Item  label="Full Name"> </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>
              <Input name="fullname" placeholder="Enter Full Name" id="fullname"  value={this.props.state.fullname} onChange={this.props.handleChange}/>
          </Col>
      </Row>

      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
             <Form.Item  label="Username"> </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>
               <Input name="username" placeholder="Enter Username" id="username"  value={this.props.state.username} onChange={this.props.handleChange}/>
          </Col>
      </Row>

      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
             <Form.Item  label="Password"> </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>
                <Input name="acc_password" type="password" placeholder="Enter Password" id="acc_password"  value={this.props.state.acc_password} onChange={this.props.handleChange}/>

          </Col>
      </Row>

      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
             <Form.Item  label="Position"> </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>
                <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a position"
        optionFilterProp="children"   id="position" name="position"
        onChange={this.props.handlePosition} value={this.props.state.position}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >

      <Option value="Admin">Admin</Option>
      <Option value="Bartender">Bartender</Option>
      <Option value="Cashier">Cashier</Option>
      <Option value="KitchenAttendant">Kitchen Attendant</Option>
      <Option value="MobileAttendant">Mobile Attendant</Option>
      <Option value="Storekeeper">Store keeper</Option>
      <Option value="Supervisor">Supervisor</Option>
      <Option value="Waiter">Waiter</Option>
      {/*<Option value="Waitress">Waitress</Option> */}
  </Select>
          </Col>

      </Row>


      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
             <Form.Item  label="Date Joined"> </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>




           <DatePicker
          hintText="Date début"
          okLabel="OK"
          cancelLabel="cancel" selected={this.props.state.date_joined }
          locale="fr" id="date_joined"
         defaultValue={this.props.state.date_joined? moment(this.props.state.date_joined, dateFormat): moment()}

          onChange={this.handleChangeDate}
        />

          </Col>

      </Row>

      <Row gutter={2}>
          <Col  xs={24} sm={24} md={6} lg={6} xl={6}>

          </Col>
          <Col  xs={24} sm={24} md={18} lg={18} xl={18}>
                  <Form.Item>
       <Button  type="secondary" style={Styles.button} onClick={reset} > Clear Form</Button>

       <Button  type="primary"  style={Styles.button} htmlType="submit">
         <Icon type="user-add" />
              {this.props.state.create? "Add User" : "Update User"}
          </Button>

    </Form.Item>

          </Col>

      </Row>
 </Col>




         <Col  xs={24} sm={24} md={14} lg={16} xl={16}>

         </Col>
      </Form>
</Row>


 <div className="grid">

     <div className="column column-12">

     {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}

      </div>
 </div>



        </React.Fragment>
    )
  }
}

const mapStateToProps = (state)=> {
    return {
        result: state.form.result

    }
}
const mapDispatchToProps = (dispatch)=>{
return {}
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser);
