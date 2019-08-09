/**
 * Created by wawooh on 4/16/19.
 */

import React from 'react'
import { Typography, Table, Icon, Divider, Button } from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;


const StoreList = React.memo(({ acquisition, click, request }) => {

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
            title: 'Received By',
            dataIndex: 'created_by',
            key: 'created_by',
        },
        {
            title: 'Received on',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated By',
            dataIndex: 'updated_by',
            key: 'updated_by',
        },
        {
            title: 'Updated on',
            dataIndex: 'updated_at',
            key: 'updated_at',
        }
        , {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                acquisition.length >= 1
                    ? (
                        <React.Fragment>
                            <Button type="primary" onClick={() => {
                                const data = {
                                    id: record.id,
                                    uid: record.uid,
                                    sid: record.sid,
                                    qty: record.qty,
                                    create: false,
                                };
                                click(data)
                            }

                            } >
                                <Icon type="edit" /> </Button>
                            <Divider type="vertical" />
                            <Button type="primary" onClick={() => {
                                const data = {
                                    id: record.id, 
                                };
                                request(data)
                            }}>
                                <Icon type="pull-request" />

                            </Button>
                            </React.Fragment>
                    ) : null
            ),
        }];

    return (

        <div>

            <Table rowKey="id" dataSource={acquisition} columns={columns}  {...TableConfig2} scroll={{ x: 400 }} bordered
                title={() => <Text strong type="primary">Received Items </Text>}
            />
        </div>
    )


});


export default StoreList;
