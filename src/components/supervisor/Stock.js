import React from 'react'

import { Table, Typography, Icon, Button } from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;

const Stock = React.memo(({ stocks, request }) => {

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'item_name',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.bg, color: record.color },
                    },
                    children: < span>  {record.item_name}</span>,
                };
            },
            // key: 'name',
        }, {
            title: 'Quantity',
            dataIndex: 'qty',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.bg, color: record.color },
                    },
                    children: < span>  {record.qty}</span>,
                };
            },
            // key: 'name',
        },
        {
            title: 'Created On',
            dataIndex: 'created_at',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.bg, color: record.color },
                    },
                    children: < span>  {record.created_at}</span>,
                };
            },
            // key: 'created_at',
        }
        , {
            title: 'Request',
            dataIndex: 'operation',
            render: (text, record) => (
                (
                    <Button type="primary"
                        onClick={
                            () => {
                                const data = {
                                    id: record.id,
                                    qty: record.qty,
                                    item: record.item_name,
                                    create: false,
                                };
                                request(data)
                            }} >
                        <Icon type="edit" />
                    </Button>

                )
            ),
        }];


    return (


        <div>

            <Table rowKey="id" dataSource={stocks} columns={columns} {...TableConfig2} bordered
                title={() => <Text strong type="primary">Stock List </Text>}
            />
        </div>


    )


});


export default Stock;
