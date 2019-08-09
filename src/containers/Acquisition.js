
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Styles, customPanelStyle } from '../Config'
import { Typography, Tabs, Select, Button, Collapse, Alert, Form, Icon, Input } from 'antd';
import SaveButton from '../components/utility/SaveButton'
import * as iactions from '../store/actions/inventoryActions'
import * as actions from '../store/actions/storeActions'
import StoreList from '../components/inventory/StoreList'
import Request from '../components/inventory/Request'
import '../layout.css'

const { Text } = Typography;
const TabPane = Tabs.TabPane;
const { Panel } = Collapse;

function callback(key) {
    // console.log(key);
}
const Option = Select.Option;
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
class Acquisition extends PureComponent {

    state = {
        id: '',
        qty: '',
        sid: '',
        store_qty: '',
        kit_qty: '',
        toProcess: '',
        create: true,
        process: true,
        loading: false,
        stockloading: false,
        item_name: '',
        to_give: '',
        req_qty: '',
        req_id: '',
        req_store: '',
        req_store_qty: '',
        stockId: '',
        stockReqloading: false
    }


    reset = () => {
        this.setState({
            ...this.state,
            id: '',
            qty: '',
            store_qty: '',
            loading: false,
            create: true
        })
    }


    resetProcessed = () => {
        this.setState({
            ...this.state,
            sid: '',
            store_qty: '',
            stockId: '',
            toProcess: '',
            process: false,
            stockloading: false,
            stockReqloading: false,
            item_name: '',
            req_qty: '',
            to_give: '',
            req_id: '',
            req_store: '',
            req_store_qty: ''
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }


    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        this.props.receiveToStore(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {

            setTimeout(() => {
                this.reset();
            }, 1000);

        }

    }

    handleEdit = (data) => {
        this.setState({
            id: data.id,
            sid: data.sid,
            qty: data.qty,
            create: data.create
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.updateStoreItem(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {
            this.reset()

        }

    }

    handleStoreSendRequest = (data) => {
        this.props.askWareHouse(data)
    }
    handleItem = (value) => {
        this.setState({
            pid: value
        })
    }

    handleStoreItem = (value) => {
        let data = this.props.storeUsables;
        let qty = ''
        qty = data && data.filter(e => e.id === value).map(filtered => filtered.qty);
        this.setState({
            sid: value,
            store_qty: parseInt(qty)
        })
        //console.log("first",value)
    }


    handleStoreItemOnRequest = (value) => {
        let data = this.props.storeUsables;
        let qty = ''
        qty = data && data.filter(e => e.id === value).map(filtered => filtered.qty);
        this.setState({
            req_store: value,
            store_qty: parseInt(qty)
        })
        //console.log("REMAINING",value)
    }


    handleStockSubmit = (e) => {
        e.preventDefault();
        this.setState({ stockloading: true });

        this.props.saveStock(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {

            setTimeout(() => {
                this.resetProcessed();
            }, 1000);

        }


    }
    componentDidMount() {
        this.props.fetchStoreItems()
        this.props.fetchUsablePurchases()
        this.props.fetchStoreUsable()
        this.props.stockRequest()
    }



    handleRequest = (data) => {



        let datas = this.props.storeUsables;
        let qty = ''
        qty = datas && datas.filter(e => e.id === data.store).map(filtered => filtered.qty);

        this.setState({
            item_name: data.item_name,
            process: data.process,
            req_qty: data.qty,
            req_id: data.id,
            req_store: data.store,
            stockId: data.stockId,
            store_qty: parseInt(qty),
            req_store_qty: data.store_qty
        })

    }
    stockRequestProcess = (e) => {
        e.preventDefault();
        this.setState({ stockReqloading: true });

        this.props.stockRequestProcess(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {

            setTimeout(() => {
                this.resetProcessed();
            }, 1000);

        }
    }


    render() {
        const { pid, qty, toProcess, sid, store_qty, kit_qty, item_name, req_store, to_give, stockloading, stockReqloading, loading, process } = this.state;
        const { acquisition, storeUsables, requests } = this.props

        const enabled = pid && qty;
        const qtyErr = store_qty >= toProcess;
        const senabled = sid && kit_qty && qtyErr;
        let processIt = false;
        let finish = false;
        if (process === false && item_name) {
            processIt = true
        }


        const pQtyErr = store_qty >= to_give;
        const penabled = req_store && pQtyErr;

        return (


            <React.Fragment>

                <Tabs onChange={callback} type="card" defaultKey="3">
                    <TabPane tab={<span><Icon type="shopping-cart" />Acquisition Point</span>} key="1">

                        <div className="mother">

                            <div className="child large-12 med-12 small-12">
                                <Text strong type="primary"></Text>

                            </div>

                            <div className="child large-12 med-12 small-12">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                >
                                    <Panel header=" Received Items to store" key="1" style={customPanelStyle}>

                                        <StoreList acquisition={acquisition} click={this.handleEdit} request={this.handleStoreSendRequest} />

                                    </Panel>
                                </Collapse>

                            </div>




                        </div>


                        <Text strong type="primary"></Text>

                        <div className="mother" style={Styles.div}>



                            <div className="child large-6 med-6 small-6">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                >
                                    <Panel header=" Process Received Items in store" key="1" style={customPanelStyle}>
                                        <Form  {...formItemLayout} onSubmit={this.handleStockSubmit}>

                                            <Form.Item label="Item">

                                                <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="Select an item"
                                                    optionFilterProp="children"
                                                    onChange={this.handleStoreItem}
                                                    value={this.state.sid}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {storeUsables && storeUsables.map((data, key) => {
                                                        return (
                                                            <Option key={data.id}
                                                                value={data.id}> {data.item_name} </Option>
                                                        )
                                                    }
                                                    )}

                                                </Select>
                                            </Form.Item>



                                            <Form.Item label="Item Quantity To Process">
                                                <Input id="toProcess" value={toProcess} onChange={this.handleChange} />
                                                {qtyErr && qtyErr ? '' :

                                                    <Alert
                                                        message="Error"
                                                        description="Quantity to process is more than available item quantity "
                                                        type="error"
                                                        showIcon
                                                    />}
                                            </Form.Item>



                                            <Form.Item label="Processed Quantity">
                                                <Input id="kit_qty" value={kit_qty} onChange={this.handleChange} />
                                            </Form.Item>


                                            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>


                                                <Button disabled={!senabled}
                                                    htmlType="submit" style={{ marginRight: 8 }} loading={stockloading}>
                                                    Save
</Button>
                                                <SaveButton buttonType="default" onClick={this.resetProcessed} name="Cancel" />

                                            </Form.Item>

                                        </Form>
                                    </Panel>
                                </Collapse>


                            </div>

                            <div className="child large-6 med-6 small-6">

                            </div>


                        </div>

                    </TabPane>



                    <TabPane tab={<span><Icon type="shopping-cart" />Request & Dispatch</span>} key="2">
                        <Request requests={requests} click={this.handleRequest} />
                        {processIt ? (
                            <div className="mother">

                                <div className="child large-12 med-12 small-12">
                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={['1']}
                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                    >
                                        <Panel header={" Process stock for " + item_name} key="1" style={customPanelStyle}>
                                            <div className="child large-12 med-12 small-12">
                                                <Form  {...formItemLayout} onSubmit={this.stockRequestProcess}>

                                                    <Form.Item label="Item">

                                                        <Input
                                                            disabled={true}
                                                            value={item_name}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item label="Available Quantity">
                                                        <Input
                                                            disabled={true}
                                                            value={store_qty}
                                                        />


                                                    </Form.Item>



                                                    <Form.Item label="Item Quantity To Process">
                                                        <Input id="to_give" value={to_give} onChange={this.handleChange} />
                                                        {pQtyErr && pQtyErr ? '' :

                                                            <Alert
                                                                message="Error"
                                                                description="Quantity to process is more than available item quantity "
                                                                type="error"
                                                                showIcon
                                                            />}
                                                    </Form.Item>


                                                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>


                                                        <Button disabled={!penabled} htmlType="submit" style={{ marginRight: 8 }} loading={stockReqloading}>
                                                            Save </Button>
                                                        <SaveButton buttonType="default" onClick={this.resetProcessed} name="Cancel" />

                                                    </Form.Item>

                                                </Form>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </div>

                            </div>
                        ) : (<div>
                            {finish ? 'Item is out of store' : ''}
                        </div>)


                        }

                    </TabPane>


                </Tabs>
            </React.Fragment>

        )
    }
}



const mapStateToProps = (state) => {

    return {
        result: state.form.result,
        acquisition: state.stores.acquisition,
        purchaseUsables: state.inventory.purchaseUsables,
        storeUsables: state.stores.storeUsables,
        requests: state.stores.requests
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        fetchUsablePurchases: () => dispatch(iactions.fetchUsablePurchases()),
        askWareHouse: (data) => dispatch(actions.askWareHouse(data)),
        fetchStoreItems: () => dispatch(actions.fetchStoreItems()),
        updateStoreItem: () => dispatch(actions.updateStoreItem()),
        fetchStoreUsable: () => dispatch(actions.fetchStoreUsable()),
        saveStock: (data) => dispatch(actions.saveStock(data)),
        stockRequest: () => dispatch(actions.stockRequest()),
        stockRequestProcess: (data) => dispatch(actions.stockRequestProcess(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Acquisition); 
