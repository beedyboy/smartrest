
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/inventoryActions'
import { customPanelStyle } from '../../Config'
import UnitList from './UnitList'
import SaveButton from '../../components/utility/SaveButton'

import { Typography, Select, Button, Alert, Radio, Form, Input, Collapse, Icon } from 'antd';
const { Text } = Typography;

const Option = Select.Option;
const { Panel } = Collapse;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
class Unit extends PureComponent {
  state = {
    id: '',
    symbol: '',
    produce: '',
    category: '',
    deduct: '',
    type: "No",
    note: '',
    create: true
  }


  reset = () => {
    this.setState({
      ...this.state,
      id: '',
      symbol: '',
      category: '',
      produce: '',
      type: "No",
      deduct: '',
      note: '',
      create: true
    })
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }

  handleType = (e) => {
    const value = e.target.value
    this.setState({
      ...this.state,
      type: value
    })
  }
  handleCategory = (value) => {
    this.setState({
      category: value
    })

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createUnit(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {
      this.reset()

    }


  }

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      symbol: data.symbol,
      note: data.note,
      category: data.sub,
      deduct: data.deduct,
      type: data.type, 
      create: data.create
    })
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.updateUnit(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {
      this.reset()

    }

  }

  componentDidMount() {
    this.props.fetchUnit()
  }

  render() {
    const { symbol, produce, note, type, category, deduct } = this.state;

    const { units, result } = this.props
    let enabled = false;
    if (type === "Yes" && symbol && deduct && category) {
      enabled = true;
    }
    if (type === "No" && symbol && deduct && produce) {
      enabled = true;
    }
    //const enabled = symbol && produce;
    let use_type = false;
    if (type === "Yes") {
      use_type = true
    }
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      >
        <Panel header="Unit Management" key="1" style={customPanelStyle}>
          <div className="mother">
            <div className="child large-6 med-6 small-6">


              <Text strong type="primary">Unit to Kitchens</Text>


              <Form  {...formItemLayout} onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>


                <Form.Item label="Unit Symbol?">
                  <Input id="symbol" value={symbol} onChange={this.handleChange} />
                </Form.Item>

                <Form.Item label="Use Category" >
                  <Radio.Group defaultValue={type} value={type} buttonStyle="solid" onChange={this.handleType}>
                    <Radio.Button value="Yes">Yes</Radio.Button>
                    <Radio.Button value="No">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {use_type ? (
                  <Form.Item label="Category">

                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a category"
                      optionFilterProp="children"
                      onChange={this.handleCategory}
                      value={category}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option key="DRINKS" value="DRINKS"> Drinks </Option>
                      <Option key="GRAINS" value="GRAINS"> Grains </Option>
                      <Option key="SHOT" value="SHOT"> Shots </Option>
                      <Option key="RAW" value="RAW"> RAW </Option>
                    </Select>
                  </Form.Item>
                ) :
                  (
                    <Form.Item label="Produces?">
                      <Input id="produce" value={produce} onChange={this.handleChange} />
                    </Form.Item>
                  )
                }


                <Form.Item label="Deduct?">
                  <Input id="deduct" value={deduct} onChange={this.handleChange} />
                </Form.Item>


                <Form.Item
                  label="Note" >
                  <Input id="note" value={note} onChange={this.handleChange} />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                  {this.state.create ?
                    <SaveButton disabled={!enabled} buttonType="primary" name="Add" />
                    :
                    <SaveButton disabled={!enabled} buttonType="primary" name="Save Update" />}

                  <Button style={{ marginLeft: 8 }} onClick={this.reset}>
                    Clear
            </Button>
                </Form.Item>

              </Form>
              {result.sending ? <Alert
                message="Error"
                description={result.message}
                type="error"
                showIcon
              /> : ''}
            </div>

            <div className="child large-6 med-6 small-6">
              <UnitList units={units} click={this.handleEdit} />
            </div>

          </div>
        </Panel>
      </Collapse>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    result: state.form.result,
    units: state.inventory.units,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUnit: (data) => dispatch(actions.createUnit(data)),
    updateUnit: (data) => dispatch(actions.updateUnit(data)),
    fetchUnit: () => dispatch(actions.fetchUnit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
