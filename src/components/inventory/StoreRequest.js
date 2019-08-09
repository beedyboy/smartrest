
import React from 'react'
import { Typography, Table, Icon, Button } from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;


const StoreRequest = React.memo(({ requests, click }) => {
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item_name',
      key: 'item_name',
    },

    {
      title: 'Request By',
      dataIndex: 'created_by',
      key: 'created_by',
    },

    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        requests.length >= 1
          ? (
            <React.Fragment>
              <Button type="primary" onClick={() => {
                const data = {
                  id: record.id, 
                  qty: record.qty,
                  store_qty:record.store_qty,
                  item_name: record.item_name,
                  store:record.store,
                  process: false,
                };
                click(data)
              }

              } >
                <Icon type="pull-request" /> </Button>
            </React.Fragment>

          ) : null
      ),
    }];

  return (
    <div>

      <Table rowKey="id" dataSource={requests} columns={columns}  {...TableConfig2} bordered
        title={() => <Text strong type="primary">Request Record</Text>}
      />
    </div>
  )


});


export default StoreRequest;
