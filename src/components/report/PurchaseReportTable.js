

import React from 'react'
import { Typography, Table} from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;


const PurchaseReportTable = React.memo(({ report }) => {

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },

        {
            title: 'Scale',
            dataIndex: 'scale',
            render: (text, record) => (

                <Text>{record.scale + '' + record.unit}</Text>

            ),
            key: 'scale',
        },
        {
            title: 'Cost',
            dataIndex: 'cost_price',
            key: 'cost_price',
        }

    ];

    return (

        <div>

            <Table rowKey="key" dataSource={report} columns={columns}  {...TableConfig2} bordered
                title={() => <Text strong type="primary">Store Items </Text>}
            />
        </div>
    )


});


export default PurchaseReportTable;
