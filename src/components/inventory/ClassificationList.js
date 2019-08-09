
import React, { memo } from 'react'
import { TableConfig } from '../../Config'
import { Table, Typography, Button, Icon } from 'antd';
import shortId from 'shortid' 
const { Text } = Typography;

const ClassificationList = memo(({ data, click }) => {
    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        },
        {
            title: 'Sub Category',
            dataIndex: 'sub',
            key: 'sub',
        },
        {
            title: 'Produces',
            dataIndex: 'produces',
            key: 'produces',
        },

        {
            title: 'Action',
            key: shortId.generate(),
            render: (record) => (

                (
                    <Button type="danger" onClick={() => {
                        const data = {
                            id: record.id,
                            category: record.category,
                            sub: record.sub,
                            produces: record.produces,
                            create: false
                        };
                        click(data)
                    }} >
                        <Icon type="edit" theme="twoTone" />
                    </Button>

                )
            )


        }


    ]
    return (


        <div>

            <Table style={{ whiteSpace: 'pre' }} rowKey="id" dataSource={data} columns={columns}  {...TableConfig} bordered
                title={() => <Text strong type="primary">Classifications List </Text>}
            />
        </div>


    )


})


export default ClassificationList;
