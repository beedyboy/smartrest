import React from 'react' 
import { Table, Typography,Icon, Button } from 'antd';
import { TableConfig2 } from '../../Config' 
const {  Text } = Typography; 

const Zone = React.memo(({zones, role, click}) =>{
    const columns = [{
        title: 'Zone Name',
        dataIndex: 'name',
        render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children:   < span>  { record.name}</span>,
          };
        },
        // key: 'name',
      },
      {
        title: 'Created On',
        dataIndex: 'created_at',
         render(text,record)  {
          return {
            props: {
              style: {background: record.color},
            },
            children: < span>  {record.created_at}</span>,
          };
        },
        // key: 'created_at',
      }
    , {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        zones.length >= 1
          ? (

              <React.Fragment>
            <Button type="primary" onClick={() =>
            {
                 const data = {
                   id: record.id,
                   name: record.name,
                   color: record.color,
                  create:false,
            };
                click(data)
            }

            } >
               <Icon type="edit"/> </Button>

              </React.Fragment>
          ) : null
      ),
    }];

     return (
      
     
       <div>
 
      <Table rowKey="id" dataSource={zones} columns={columns}  
        {...TableConfig2}   bordered
    title={() =>  <Text strong type="primary">Zones </Text>}
 />
       </div>
      
      
    )
  });
      
  
export default Zone;



 
    // {zones && zones.map((table, key) => {
    //   return (
    //     <tr style={{ backgroundColor: `${table.color}` }} key={shortId.generate()}>
    //       <td>{table.name}</td>
    //       <td>{table.created_at}</td>
    //       <td><Button></Button></td>
    //     </tr>
    //   )


    // })}
 