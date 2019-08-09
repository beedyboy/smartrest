
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/productActions'
import { customPanelStyle, TableConfig2 } from '../Config'
import SaveButton from '../components/utility/SaveButton'

import { Typography, Button, Alert, Form, Table, Input, Collapse, Icon } from 'antd';
const { Text } = Typography;
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

class Product extends PureComponent {
    state = {
        id: '',
        product_name: '',
        create: true
    }


    reset = () => {
        this.setState({
            ...this.state,

            id: '',
            product_name: '',
            stock_id: '',
            create: true
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProduct(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {
            this.reset()

        }


    }

    handleEdit = (data) => {
        this.setState({
            id: data.id,
            product_name: data.product_name,
            create: data.create
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.updateProduct(this.state)
        if (this.props.result.success !== true && this.props.result.error !== true) {
            this.reset()

        }

    }

    componentDidMount() {
        this.props.fetchProduct()
    }

    render() {
        const { product_name } = this.state;
        const { products, result } = this.props

        const enabled = product_name && product_name.length > 0


        const columns = [
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
            },

            {
                title: 'Action',
                key: 'operation',
                render: (text, record) => (

                    <React.Fragment>

                        <Button type="primary" onClick={() => {
                            const data = {
                                id: record.id,
                                product_name: record.product_name,
                                create: false

                            };
                            this.handleEdit(data)
                        }

                        } >
                            <Icon type="edit" />Edit  </Button>


                    </React.Fragment>

                ),
            }
        ]
        return (
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel header="Product Management" key="1" style={customPanelStyle}>
                    <div className="mother">
                        <div className="child large-6 med-6 small-6">


                            <Text strong type="primary">Manage Products</Text>


                            <Form  {...formItemLayout} onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>


                                <Form.Item label="Product Name">
                                    <Input id="product_name" value={product_name} onChange={this.handleChange} />
                                </Form.Item>

                                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                                    {this.state.create ?
                                        <SaveButton disabled={!enabled} buttonType="primary" name="Add Product" />
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

                            <Table rowKey="id" dataSource={products} columns={columns}  {...TableConfig2} bordered
                                title={() => <Text strong type="primary">Products Record </Text>} />

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
        products: state.product.products,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (data) => dispatch(actions.createProduct(data)),
        updateProduct: (data) => dispatch(actions.updateProduct(data)),
        fetchProduct: () => dispatch(actions.fetchProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
