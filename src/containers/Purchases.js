import React, { PureComponent } from 'react'
import moment from 'moment';
import { Styles, customPanelStyle } from '../Config'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import SaveButton from '../components/utility/SaveButton'
import PurchaseList from '../components/inventory/PurchaseList'
import StoreRequest from '../components/inventory/StoreRequest'
import * as actions from '../store/actions/inventoryActions'
import * as sactions from '../store/actions/storeActions'
import * as ractions from '../store/actions/reportActions'
import PurchaseReportTable from '../components/report/PurchaseReportTable'
import StoreRequestReport from '../components/report/StoreRequestReport'
import shortId from 'shortid'
import '../layout.css'
import { Divider, Select, Tabs, Collapse, Form, Alert, Button, Icon, Input, DatePicker } from 'antd';
import { position, fullname } from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
const Option = Select.Option;

const TabPane = Tabs.TabPane;
const { Panel } = Collapse;

function callback(key) {
  // console.log(key);
}
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
class Purchases extends PureComponent {
  state = {
    id: '',
     startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'), 
    qty: '',
    item_name: '',
    p_item_name: '',
    cost_price: '',
    uid: '',
    unit: '',
    scale: '',
    category: 'No',
    sub: '',
    store: '',
    purchased_date: moment().format('YYYY-MM-DD'),
    note: '',
    create: true,
    redirect: false,
    process: true,
    storeReqloading: false
  }


  reset = () => {
    this.setState({
      ...this.state,
      id: '',
      qty: '',
      item_name: '',
      p_item_name: '',
      scale: '',
      store: '',
      category: 'No',
      sub: '',
      cost_price: '',
      uid: '',
      purchased_date: moment().format('YYYY-MM-DD'),
      note: '',
      unit: '',
      unitValue: '',
      create: true,
      process: true,
      redirect: false,
      storeReqloading: false
    })
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }


  handleUnit = (value) => {

    this.setState({
      unit: value
    })
  }

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      qty: data.qty,
      item_name: data.item_name,
      cost_price: data.cost_price,
      unit: data.unit,
      purchased_date: data.purchased_date,
      note: data.note,
      scale: data.scale,
      create: data.create
    })
  }

  processRequest = (data) => {
    this.setState({
      id: data.id,
      p_item_name: data.item_name,
      store: data.store,
      process: data.process
    })
  }


  componentDidMount() {
    this.props.fetchPurchases()
    this.props.fetchUnit()
    this.props.storeRequest()
  }

  handleChange = (e) => {

    this.setState({
      [e.target.id]: e.target.value
    })

  }




  handleChangeStartDate = (evt, date) => {

    this.setState({
      purchased_date: date
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPurchases(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {
      this.reset()

    }

  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.updatePurchases(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {
      this.reset()

    }
  }

  handleProcessingUnit = (value) => {
    const category = this.props.units.filter(e => e.id === value).map(filtered => filtered.category);
    if (category.toString() === "Yes") {

      const sub = this.props.units.filter(e => e.id === value).map(filtered => filtered.sub);
      this.props.fetchDistintUnit(sub.toString())

    }
    this.setState({
      uid: value,
      category: category.toString()
    })
  }

  handleSubUnit = (value) => {
    this.setState({
      sub: value
    })
  }
  storeRequestProcess = (e) => {
    e.preventDefault();
    this.setState({ storeReqloading: true });

    this.props.storeRequestProcess(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {

      setTimeout(() => {
        this.reset();
      }, 1000);

    }
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/pos' />
    }
  }
  
     handleChangeStartDate = (evt, date) => {
        this.setState({
            startDate: date
        })
    }

    handleChangeEndDate = (evt, date) => {
        // console.log(date)
        this.setState({
            endDate: date
        })
    }

    handleReport = (e) => {
        e.preventDefault();
      this.props.getPurchaseReport(this.state)
        this.props.getStoreReport(this.state)
    }
  render() {
    if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor" || position() === "Storekeeper") {
      const dateFormat = 'YYYY/MM/DD';
      const { result, purchases, units, allocations, dunits, purchaseReport,storeReport } = this.props
      // console.log(purchaseReport)
      const { item_name, qty, cost_price, unit, scale, uid, purchased_date, p_item_name, storeReqloading, process, category } = this.state
      const enabled = item_name && unit && purchased_date.length > 0
        && qty && cost_price.length > 0;

      let breakdown = '';
      if (item_name && qty && cost_price) {
        const ded = cost_price / qty;
        breakdown = "1 " + item_name + " will equals " + ded;

      }

      const penabled = p_item_name && uid && qty;
      let showSub = false;
      if (category === "Yes") {
        showSub = true;
      }
      const selectAfter = (
        <Select value={unit} onChange={this.handleUnit} id="unit" style={{ width: 100 }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

          <Option key={shortId.generate()} value="Bottle">Bottle(s)</Option>
          <Option key={shortId.generate()} value="Crate">Crate</Option>
          <Option key={shortId.generate()} value="Cup">Cup</Option>
          <Option key={shortId.generate()} value="Dozen">Dozen</Option>
          <Option key={shortId.generate()} value="Gram">Gram</Option>
          <Option key={shortId.generate()} value="Kg">Kg</Option>
          <Option key={shortId.generate()} value="Litre">Litre(s)</Option>
          <Option key={shortId.generate()} value="MiliGram">Miligram</Option>
          <Option key={shortId.generate()} value="Mililitre">Mililitre(s)</Option>
          <Option key={shortId.generate()} value="Ounce">Ounce</Option>
          <Option key={shortId.generate()} value="Pint">Pint</Option>

        </Select>
      );
      return (


        <React.Fragment>
          <Helmet>
            <title>Purchases | Unprocessed Items</title>
            <meta name="description" content="Purchases Management" />
          </Helmet>

          <Tabs onChange={callback} type="card" defaultKey="1">
            <TabPane tab={<span><Icon type="shopping-cart" />Purchases</span>} key="1">

              <div className="mother">


                <div className="child large-12 med-12 small-12" style={Styles.div}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                  >
                    <Panel header="Purchases" key="1" style={customPanelStyle}>


                      <Form  {...formItemLayout} onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>


                        <div className="mother">
                          <div className="child large-7 med-7 small-7">
                            <Form.Item
                              label="Item Name"
                            >
                              <Input id="item_name" value={this.state.item_name} onChange={this.handleChange} />
                            </Form.Item>


                            <Form.Item
                              label="Quantity Purchased" >
                              <Input id="qty" value={this.state.qty} onChange={this.handleChange} />
                            </Form.Item>

                            <Form.Item
                              label="Scale (i.e. 2Kg)" >
                              <Input id="scale" addonAfter={selectAfter} value={scale} onChange={this.handleChange} />
                            </Form.Item>



                            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                              {this.state.create ?
                                <SaveButton buttonType="primary" disabled={!enabled} name="Add" permission="addPurchases" />
                                :
                                <SaveButton buttonType="primary" disabled={!enabled} name="Save Update" permission="editPurchases" />}
                              <Button style={{ marginLeft: 8 }} onClick={this.reset}>
                                Clear
            </Button>
                            </Form.Item>



                          </div>



                          <div className="child large-5 med-5 small-5">


                            <Form.Item label="Date">
                              <DatePicker
                                hintText="Date"
                                okLabel="OK"
                                cancelLabel="cancel" selected={this.state.purchased_date}
                                locale="fr" id="purchased_date"
                                defaultValue={this.state.purchased_date ? moment(this.state.purchased_date, dateFormat) : moment()}

                                onChange={this.handleChangeStartDate}
                              />
                            </Form.Item>

                            <Form.Item
                              label="Item Cost"
                            >
                              <Input id="cost_price" value={this.state.cost_price} onChange={this.handleChange} />
                            </Form.Item>

                            <Form.Item
                              label="Note" >
                              <Input id="note" value={this.state.note} onChange={this.handleChange} />
                            </Form.Item>

                            {breakdown ? (
                              <div style={{ color: 'red' }}>{breakdown}</div>
                            ) : ''}

                          </div>

                        </div>
                      </Form>
                      {result.sending ? <Alert
                        message="Error"
                        description={result.message}
                        type="error"
                        showIcon
                      /> : ''}
                    </Panel>
                  </Collapse>
                </div>
              </div>


              <div className="mother">
                <div className="child large-12 med-12 small-12">

                  <Divider orientation="center">Records</Divider>

                  <PurchaseList purchases={purchases} click={this.handleEdit} />

                </div>

              </div>
            </TabPane>

            <TabPane tab={<span><Icon type="shopping-cart" />Requests</span>} key="2">
              <div className="mother">
                <div className="child large-12 med-12 small-12">
                  <StoreRequest requests={allocations} click={this.processRequest} />
                </div>

                {!process ?
                  (
                    <div className="child large-12 med-12 small-12">
                      <Form  {...formItemLayout} onSubmit={this.storeRequestProcess}>

                        <Form.Item label="Item">

                          <Input
                            disabled={true}
                            value={p_item_name}
                          />
                        </Form.Item>
                        <Form.Item label="Unit">
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a unit"
                            optionFilterProp="children"
                            onChange={this.handleProcessingUnit}
                            value={this.state.uid}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            {units && units.map((data, key) => {
                              return (
                                <Option key={data.id}
                                  value={data.id}> {data.symbol} </Option>
                              )
                            }
                            )}
                          </Select>
                        </Form.Item>

                        {showSub ? (
                          <Form.Item label="Category">
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Select a unit"
                              optionFilterProp="children"
                              onChange={this.handleSubUnit}
                              value={this.state.sub}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                              {dunits && dunits.map((data, key) => {
                                return (
                                  <Option key={data.id}
                                    value={data.id}> {data.sub} </Option>
                                )
                              }
                              )}
                            </Select>
                          </Form.Item>
                        ) : ''
                        }
                        <Form.Item label="Quantity">
                          <Input id="qty" value={qty} onChange={this.handleChange} />

                        </Form.Item>



                        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>


                          <Button disabled={!penabled} htmlType="submit" style={{ marginRight: 8 }} loading={storeReqloading}>
                            Save </Button>
                          <SaveButton buttonType="default" onClick={this.reset} name="Cancel" />

                        </Form.Item>

                      </Form>
                    </div>
                  ) : ''}
              </div>
            </TabPane>
             <TabPane tab={<span><Icon type="shopping-cart" />Reports</span>} key="3">
              
                <div className="mother">
                                        <div className="large-12 med-12 small-12">

                                            <Form onSubmit={this.handleReport} layout="inline">

                                                <Form.Item
                                                    label="Date"
                                                >
                                                    <DatePicker
                                                        hintText="Date début"
                                                        okLabel="OK"
                                                        cancelLabel="cancel"
                                                        locale="fr"
                                                        defaultValue={this.state.startDate ? moment(this.state.startDate, dateFormat) : moment()}
                                                        onChange={this.handleChangeStartDate}
                                                    />
                                                </Form.Item> 
                                                <Form.Item
                                                    label="~"
                                                >
                                                    <DatePicker
                                                        hintText="Date début"
                                                        okLabel="OK"
                                                        cancelLabel="cancel"
                                                        locale="fr"
                                                        defaultValue={this.state.endDate ? moment(this.state.endDate, dateFormat) : moment()}
                                                        onChange={this.handleChangeEndDate}
                                                    />
                                                </Form.Item>


                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">
                                                        <Icon type="search" />
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                    <Tabs onChange={callback} type="card" defaultKey="3">
                                         
                                        <TabPane tab="Purchase Report" key="3">
                                            <div className="mother">
                                                <div className="large-12 med-12 small-12">
                                                    <Collapse
                                                        bordered={false}
                                                        defaultActiveKey={['1']}
                                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                    >
                                                        <Panel header="Purchase Report" key="1" style={customPanelStyle}>
                                                            <PurchaseReportTable period={this.state.startDate + " to " + this.state.endDate} report={purchaseReport} />
 
                                                        </Panel>
                                                    </Collapse>
                                                </div>

                                            </div>
                                        </TabPane>
                                        
                                        
                                        <TabPane tab="Store Report" key="4">
                                            <div className="mother">
                                                <div className="large-12 med-12 small-12">
                                                    <Collapse
                                                        bordered={false}
                                                        defaultActiveKey={['1']}
                                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                    >
                                                        <Panel header="Store Report" key="1" style={customPanelStyle}>
                                                            <StoreRequestReport period={this.state.startDate + " to " + this.state.endDate} report={storeReport} />
 
                                                        </Panel>
                                                    </Collapse>
                                                </div>

                                            </div>
                                        </TabPane>
</Tabs>
                                </TabPane>

               
          </Tabs>
        </React.Fragment>
      )
    }
    return <NoAccess name={fullname()} />
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.form.result,
    purchases: state.inventory.purchases,
    units: state.inventory.units,
    dunits: state.inventory.dunits,
    allocations: state.stores.allocations,
    purchaseReport: state.report.purchaseReport,
    storeReport: state.report.storeReport
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createPurchases: (data) => dispatch(actions.createPurchases(data)),
    updatePurchases: (data) => dispatch(actions.updatePurchases(data)),
    fetchPurchases: () => dispatch(actions.fetchPurchases()),
    storeRequest: () => dispatch(sactions.storeRequest()),
    storeRequestProcess: (data) => dispatch(sactions.storeRequestProcess(data)),
    fetchUnit: () => dispatch(actions.fetchUnit()),
    fetchDistintUnit: (sub) => dispatch(actions.fetchDistintUnit(sub)),
    getPurchaseReport: (data) => dispatch(ractions.getPurchaseReport(data)),
    getStoreReport: (data) => dispatch(ractions.getStoreReport(data))
    
    

  }
}

export default
  connect(mapStateToProps, mapDispatchToProps)(Purchases);
