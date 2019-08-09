
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import { Styles, customPanelStyle } from '../Config'
import { Select, Button, Collapse, Alert, Form, Icon, Input } from 'antd';
import SaveButton from '../components/utility/SaveButton'
import * as actions from '../store/actions/inventoryActions'
import ClassificationList from '../components/inventory/ClassificationList'
import Unit from '../components/inventory/Unit'

const { Panel } = Collapse;

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
class InventorySettings extends PureComponent {

    state = {
        id: '',
        category: '',
        produces: '',
        sub: '',
        loading: false,
        create: true
    }


    reset = () => {
        this.setState({
            ...this.state,
            id: '',
            category: '',
            produces: '',
            sub: '',
            loading: false,
            create: true
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    handleCategory = (value) => {
        this.setState({
            category: value
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        this.props.saveClassification(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {

            setTimeout(() => {
                this.reset();
            }, 1000);

        }


    }

    handleEdit = (data) => {
        this.setState({
            id: data.id,
            produces: data.produces,
            category: data.category,
            sub: data.sub,
            create: data.create
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.updateClassification(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {
            this.reset()

        }

    }
    componentDidMount() {
        this.props.fetchClassification()
    }
    render() {
        const { category, sub, loading, produces } = this.state;
        const { classifications, result } = this.props

        const enabled = category && sub && produces;

        return (


            <React.Fragment>
 

          <Helmet>
            <title>Menu Management</title>
            <meta name="description" content="Inventory Settings" />
          </Helmet>

   <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                        >
                            <Panel header="Classifications" key="1" style={customPanelStyle}>

                <div className="mother">


                    <div className="child large-6 med-6 small-6">
                     
                                <Form  {...formItemLayout} onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>

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



                                    <Form.Item label="Sub-Category (i.e 750Litre)">
                                        <Input id="sub" value={sub} onChange={this.handleChange} />
                                    </Form.Item>


                                    <Form.Item label="Produces">
                                        <Input id="produces" value={produces} onChange={this.handleChange} />
                                    </Form.Item>


                                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                                        {this.state.create ?

                                            <Button disabled={!enabled} style={{ marginRight: 8 }} htmlType="submit" loading={loading}>
                                                Save
</Button>
                                            :
                                            <SaveButton disabled={!enabled} buttonType="primary" name="Save Update" />
                                        }

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
                        <ClassificationList data={classifications} click={this.handleEdit} />

                    </div> 

                </div>

                            </Panel>
                        </Collapse>


                <div className="mother" style={Styles.div}>
                    <div className="child large-12 med-12 small-12">
                        <Unit />

                    </div>
                </div>


            </React.Fragment>

        )
    }
}



const mapStateToProps = (state) => {

    return {
        result: state.form.result,
        classifications: state.inventory.classifications
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        updateClassification: (data) => dispatch(actions.updateClassification(data)),
        fetchClassification: () => dispatch(actions.fetchClassification()),
        saveClassification: (data) => dispatch(actions.saveClassification(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InventorySettings); 
