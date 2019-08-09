

import React from 'react'
import { Typography, Table, Icon, Button } from 'antd';
import { TableConfig2 } from '../../Config'
const { Text } = Typography;


const UnitList = React.memo(({ units, click }) => {

  const columns = [
    {
      title: 'Unit Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Using Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Sub',
      dataIndex: 'sub',
      key: 'sub',
    },
    {
      title: 'To Produce ?',
      dataIndex: 'produce',
      key: 'produce',
    },
    {
      title: 'Deduct',
      dataIndex: 'deduct',
      key: 'deduct',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        units.length >= 1
          ? (
            <React.Fragment>

              <Button type="primary" onClick={() => {
                const data = {
                  id: record.id,
                  symbol: record.symbol,
                  produce: record.produce,
                  sub: record.sub,
                  deduct: record.deduct,
                  type: record.category,
                  note: record.note,
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

      <Table rowKey="id" dataSource={units} columns={columns}  {...TableConfig2} bordered
        title={() => <Text strong type="primary">Unit Formular </Text>}
      />
    </div>
  )


});


export default UnitList;
