

import React from 'react'
import { Typography, Table, Icon, Button } from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;


const PurchaseList = React.memo(({ purchases, click }) => {

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
    , {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        purchases.length >= 1
          ? (
            <React.Fragment>

              <Button type="primary" onClick={() => {
                const data = {
                  id: record.id,
                  item_name: record.item_name,
                  cost_price: record.cost_price,
                  purchased_date: record.purchased_date,
                  scale: record.scale,
                  unit: record.unit,
                  note: record.note,
                  qty: record.qty,
                  create: false,
                };
                click(data)
              }

              } >

                <Icon type="edit" /> </Button>
            </React.Fragment>

          ) : null
      ),
    }];

  return (

    <div>

      <Table rowKey="id" dataSource={purchases} columns={columns}  {...TableConfig2} bordered
        title={() => <Text strong type="primary">Store Items </Text>}
      />
    </div>
  )


});


export default PurchaseList;
