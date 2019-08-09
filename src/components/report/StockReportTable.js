
import React, { useRef } from 'react'
import { CSVLink } from "react-csv";
import { Typography, Table, Icon, Button, Row, Col } from 'antd';
import { TableConfig2, Styles } from '../../Config'
import ReactToPrint from "react-to-print";
import PrintStockSales from './PrintStockSales';
const { Text } = Typography;

const StockReportTable = React.memo(({ report, trail, settings, period }) => {
    // class StockReportTable extends PureComponent {
    const componentRef = useRef();

    const columns = [

        {
            title: 'Stock Item',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: 'Left',
            dataIndex: 'left',
            key: 'left',
        }

    ];


    const headers = [
        {
            label: 'Stock Item',
            key: 'item_name',
        },
        {
            label: 'Sold',
            key: 'sold',
        },
        {
            label: 'Left',
            key: 'left',
        }
    ];

    return (
        <React.Fragment>
            <Row gutter={16}>

                <Col span={24}>

                    {report && report ? (
                        <React.Fragment>

                            <ReactToPrint
                                trigger={() => <Button type="primary" style={Styles.print}  ><Icon type="printer" />Print</Button>}
                                content={() => componentRef.current}
                            />
                            <Button type="primary" onClick={trail} style={Styles.color.geekblue}><Icon type="dot-chart" />Show Trail</Button>

                            <CSVLink
                                data={report}
                                filename={"stockReport " + period + ".csv"}
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
                        title={() => <Text strong type="primary">Report Sheet </Text>}

                    />

                </Col>
            </Row>
            <React.Fragment>
                <div style={{ display: 'none' }}>
                    <PrintStockSales ref={componentRef} report={report} period={period} />
                </div>
            </React.Fragment>
        </React.Fragment>

    )

})





export default StockReportTable;

