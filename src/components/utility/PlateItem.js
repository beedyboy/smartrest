/**
 * Created by wawooh on 5/6/19.
 */
import React from 'react' 
import shortId from 'shortid'
import {Button, Icon} from 'antd'
const PlateItem = React.memo(({id, plateOrder,remove}) => {
    console.log("ORDER", plateOrder)
 return (

    <table>
    <thead>
                         <tr className="tabletitle" key={shortId.generate()}> 
                            <td className="item"><h2>Item</h2></td>
                            <td className="item"><h2>Qty</h2></td>
                            <td className="item"><h2>Amount</h2></td>
                            <td className="item"><h2>Action</h2></td>
                          </tr>
                       </thead>

                       <tbody>

    {plateOrder && plateOrder.map((order, key) => {
           return (
        <tr key={shortId.generate()}>
            <td>{order.menu_name}</td>
            <td>{order.qty}</td>
            <td>{order.total}</td>
            <td>
            <Button type="danger" onClick={() => {
                    const data = { id: order.id };  
                    remove(data)  
                } } >
                  <Icon type="delete" theme="twoTone" />
                  </Button>  
               
               </td>

        </tr>
        )
        }
        )}

</tbody>
    </table>

     
 )
// let data = menu.filter(d=> d.id === parseInt(id))
// // console.log("DATA", data)
//         return (
    

//                <React.Fragment>
//                     {data[0].item}
//                </React.Fragment>
             
//         )



});

export default PlateItem;
