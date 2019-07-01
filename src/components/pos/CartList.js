/**
 * Created by wawooh on 4/25/19.
 */
import React, {memo} from 'react'
import {TableConfig} from '../../Config'
import shortId from 'shortid'
import { Table , Typography, Button, InputNumber, Icon} from 'antd';
const {  Text } = Typography;

const CartList = memo(({data, settings, remove, changeQty, editPlate}) =>{
      const columns = [
          {
        title: 'Item',
        key:shortId.generate(),
        render:(record)=> (
          record.base === "Yes"?
          <Button type="primary" onClick={() => {  editPlate(record.plate)  }

            } >
              <Icon type="edit" theme="twoTone" />
              {record.menu_name}
              </Button>

            :
            <Text strong type="primary">{record.menu_name}</Text>
        )
        
        }, 
      {
        title: 'Unit Price (' +settings.currency+')',
        key:shortId.generate(),
        render: (record)=>  (
          record.base === "Yes"?
          '-'

         :
         record.price
        )
      },
      {
        title: 'Quantity',
        key:shortId.generate(),
         render: (record)=>  (
           record.base === "Yes"?
            '-'

           :
              <InputNumber min={0} max={1000} value={record.qty} onChange={(value) =>
            {

                 const data = {
                     id: record.id,
                     qty: record.qty,
                     menu_id: record.menu_id,
                     newQty: value
            };
                changeQty(data)
            }

            } />
           )
      },
      {
        title: 'Total Price (' +settings.currency+')',
        dataIndex: 'total',
        key: 'total',
      },
       {
           title: 'Action',
           key:shortId.generate(),
           render: (record)=>  (
              // record.base === "Yes"?
              // <Button type="primary" onClick={() =>
              //   {
              //     editPlate(record.plate) 
                   
              //   }
    
              //   } ><Icon type="edit" theme="twoTone" /></Button>
              // :
              // " "
                  
             
                (
                  <Button type="danger" onClick={() => {
                    const data = { id: record.id };  
                  remove(data)  
                } } >
                  <Icon type="delete" theme="twoTone" />
                  </Button>                          
                              
                  )
           )


          }


    ]
     return (


       <div>

      <Table rowKey="id" dataSource={data} columns={columns}  {...TableConfig}   bordered
    title={() =>  <Text strong type="primary">Cart </Text>}
 />
       </div>


  )


})


export default CartList;
