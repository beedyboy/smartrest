
import React, { PureComponent } from 'react'
import { customPanelStyle } from '../Config'
import Stock from '../components/supervisor/Stock'
import { DatePicker, Button, Tabs, Form, Icon, Collapse } from 'antd';
import * as actions from '../store/actions/reportActions'
import * as sactions from '../store/actions/storeActions'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import StockReportTable from '../components/report/StockReportTable'
import StockRefillReport from '../components/report/StockRefillReport'
import { position, fullname } from '../store/utility'
import moment from 'moment';
import NoAccess from '../components/utility/NoAccess'
// import FinishedProduct from '../components/inventory/FinishedProduct'


const TabPane = Tabs.TabPane;

const { Panel } = Collapse;

function callback(key) {
    // console.log(key);
}
class Supervisor extends PureComponent {


    state = {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        dept: 'Total',
        trail: false,
        id: '',
        receipt: '',
        modal: false
    }

    sendRefillRequest = (data) => {
        this.props.requestRefill(data.id, data.qty)

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.stockSalesReport(this.state)
        this.props.stockRequestRefillReport(this.state)
    }
    componentDidMount() {
        this.props.linkerStockList();
        this.props.requestRefill();
    }
    render() {
        if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
            const { linkers, stockReport, stockRefillReport } = this.props;
            const dateFormat = 'YYYY/MM/DD';

            return (

                <React.Fragment>
                    <Helmet>
                        <title>Supervisor</title>
                    </Helmet>

                    <div className="mother">
                        <div className="child large-12 med-12 small-12">

                            <Tabs onChange={callback} type="card" defaultKey="1">
                                <TabPane tab={<span><Icon type="shopping-cart" />Stock List</span>} key="1">
                                    <Stock stocks={linkers} request={this.sendRefillRequest} />
                                </TabPane>
                                <TabPane tab={<span><Icon type="transaction" />Closing Report</span>} key="2">
                                    <div className="mother">
                                        <div className="large-12 med-12 small-12">

                                            <Form onSubmit={this.handleSubmit} layout="inline">

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
                                        <TabPane tab="Stock Report" key="3">

                                            <div className="mother">
                                                <div className="large-12 med-12 small-12">
                                                    <Collapse
                                                        bordered={false}
                                                        defaultActiveKey={['1']}
                                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                    >
                                                        <Panel header=" Stock Report" key="1" style={customPanelStyle}>
                                                            <StockReportTable period={this.state.startDate + " to " + this.state.endDate} report={stockReport} />


                                                        </Panel>
                                                    </Collapse>
                                                </div>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="Stock Refill Report" key="1">
                                            <div className="mother">
                                                <div className="large-12 med-12 small-12">
                                                    <Collapse
                                                        bordered={false}
                                                        defaultActiveKey={['1']}
                                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                    >
                                                        <Panel header=" Stock Request/Refill" key="1" style={customPanelStyle}>
                                                            <StockRefillReport period={this.state.startDate + " to " + this.state.endDate} report={stockRefillReport} />


                                                        </Panel>
                                                    </Collapse>
                                                </div>

                                            </div>
                                        </TabPane>
</Tabs>
                                </TabPane>

                            </Tabs>


                        </div>
                        </div>
                </React.Fragment>
                    );
                }
        return <NoAccess name={fullname()} />

                    }
                }
                
const mapStateToProps = (state) => {

    return {

                        linkers: state.stores.linkers,
                    stockReport: state.report.stockReport,
                    stockRefillReport: state.report.stockRefillReport
            
                }
            }
const mapDispatchToProps = (dispatch) => {
    return {


                        linkerStockList: () => dispatch(sactions.linkerStockList()),
                    requestRefill: (id, qty) => dispatch(sactions.requestRefill(id, qty)),
                    stockSalesReport: (data) => dispatch(actions.stockSalesReport(data)),
                    stockRequestRefillReport: (data) => dispatch(actions.stockRequestRefillReport(data))
                }
            }
            export default
    connect(mapStateToProps, mapDispatchToProps)(Supervisor); 