
import React, {memo} from 'react'
import {TableConfig} from '../../Config'
import shortId from 'shortid'
import { Table , Typography, Button, InputNumber, Icon} from 'antd';
import {position} from '../../store/utility'  
const {  Text } = Typography;

const CartList = memo(({data, settings, remove, localPlusMinus, changeQty, useDiscount, editPlate}) =>{
  // const discount = position === "SuperAdmin";
  // console.log("DISCOUNT",discount);
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
          <React.Fragment>
             <Button type = "primary"
             onClick = {
                 () => {
                   localPlusMinus(record.plate, record.invoice)
                 }
               } >
              <Icon type = "plus-circle" theme = "twoTone" /> 
              Add
               </Button>
            </React.Fragment>
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
          title: 'Dis', 
          key: 'total',
          render:(record)=>(
            position() === "SuperAdmin"? 
             <React.Fragment>
 <InputNumber min={0} max={1000} value={record.discount} onChange={(value) => {

                const data = {
                  id: record.id,
                  qty: record.qty,
                  price: record.price,
                  menu_id: record.menu_id,
                  discount: value
                };
                useDiscount(data)
              }

              } />

               </React.Fragment>
            
            : `{position()}`
          )
        },
       {
           title: 'Action',
           key:shortId.generate(),
           render: (record)=>  (
            
                (
                  <Button type="danger" onClick={() => {
                    const data = {
                      id: record.id,
                      ord_type: record.base,
                      plate: record.plate
                   , invoice: record.invoice
                   };
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

      <Table style={{ whiteSpace: 'pre'}} rowKey="id" dataSource={data} columns={columns}  {...TableConfig}   bordered
    title={() =>  <Text strong type="primary">Cart </Text>}
 />
       </div>


  )


})


export default CartList;
