
import React from 'react'
import { CSVLink } from "react-csv";
import { Typography, Table, Icon, Row, Col } from 'antd';
import { TableConfig2, Styles } from '../../Config'
const { Text } = Typography;

const StoreRequestReport = React.memo(({ report, settings, period }) => { 

    const columns = [

        {
            title: 'Store Item',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Qty Given',
            dataIndex: 'qty_given',
            key: 'qty_given',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

        {
            title: 'Requested By',
            dataIndex: 'created_by',
            key: 'created_by',
        },
        {
            title: 'Requested on',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Given By',
            dataIndex: 'updated_by',
            key: 'updated_by',
        },
        {
            title: 'Given on',
            dataIndex: 'updated_at',
            key: 'updated_at',
        }

    ];


    const headers = [
        {
            label: 'Store Item',
            key: 'item_name',
        },
        {
            label: 'Qty Given',
            key: 'qty_given',
        },
        {
            label: 'Status',
            key: 'status',
        },

        {
            label: 'Requested By',
            key: 'created_by',
        },
        {
            label: 'Requested on',
            key: 'created_at',
        },
        {
            label: 'Given By',
            key: 'updated_by',
        },
        {
            label: 'Given on',
            key: 'updated_at',
        }

    ];

    return (
        <React.Fragment>
            <Row gutter={16}>

                <Col span={24}>

                    {report && report ? (
                        <React.Fragment>

                            <CSVLink
                                data={report}
                                filename={"storeRequestReport " + period + ".csv"}
                                target="_blank"
                                style={Styles.actionButton}
                                headers={headers}
                                onClick={() => {
                                    console.log("You click the link"); // 👍🏻 Your click handling logic
                                }}
                            ><Icon type="file-excel" />
                                Export to excel
</CSVLink>
                        </React.Fragment>
                    ) : ''
                    }

                </Col>
                <Col span={24}>
                    <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2} bordered
                        title={() => <Text strong type="primary">Store Report </Text>}

                    />

                </Col>
            </Row>

        </React.Fragment>

    )

})





export default StoreRequestReport;

