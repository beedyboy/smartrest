import React, {PureComponent} from 'react'
import {  Typography,} from 'antd';
import shortId from 'shortid'
import  '../../st.css'
const {  Text } = Typography;

class Invoice extends PureComponent {

render(){
    const {shop,data, sold} = this.props
    // console.log(sold)
 let soldData = []
  sold && sold.forEach(function(val,index) {
      soldData['id'] = sold[index].id
      soldData['invoice_number'] = sold[index].invoice_number
      soldData['amount'] = sold[index].amount
      soldData['ord_type'] = sold[index].ord_type
      soldData['cashier'] = sold[index].cashier
      soldData['waiter'] = sold[index].waiter
      soldData['table'] = sold[index].table
      soldData['order_number'] = sold[index].order_number
      // soldData['kitchen'] = sold[index].kitchen
      soldData['nfund'] = sold[index].nfund
      soldData['gtotal'] = sold[index].gtotal
      soldData['vat'] = sold[index].vat
      soldData['status'] = sold[index].status
      soldData['created_at'] = sold[index].created_at
      soldData['created_by'] = sold[index].created_by
      soldData['updated_at'] = sold[index].updated_at
})
// console.log(gtotal)
    return (
        <React.Fragment>

    <div id="invoice-POS">
         <div style={{textAlign:'center'}} id="top">
          <div className="logo"></div>
          <div className="info">
            <h2>{shop.shopName}</h2>
          </div>
        </div>
            <div id="mid"  style={{textAlign:'center'}}>
              <div className="info">

                <p>
                     {shop.address}<br/>
                    {shop.shopEmail}<br/>
                   {shop.shopPhoneNum}
                </p>

                 <p>Invoice: {soldData.invoice_number} </p>
                 <p> Order Number: #{soldData.order_number } </p>
                    {soldData.ord_type === "Take Out"?
                        <p>  Order:  {soldData.ord_type}  </p>


                     :
                      <React.Fragment>
                           <p>
                           <Text type="primary">Location: {soldData.table}  </Text>
                         </p>
                          {/*<p>  kitchen:  {soldData.kitchen}</p>*/}
                      </React.Fragment>
                      }
                 <p>  Date:  {soldData.created_at}</p>
                  {soldData.status?  <p>  Cashier:  {soldData.cashier}</p>: ''}

              </div>
            </div>

        <div id="bot">

            <div id="table">
                <table>
                       <thead>
                         <tr className="tabletitle" key={shortId.generate()}>
                            <td className="item"><h2>Item</h2></td>
                            <td className="item"><h2>Qty</h2></td>
                            <td className="item"><h2>Total</h2></td>
                          </tr>
                       </thead>

                   <tbody>
                       {data.map((d)=> {

                           return (
                               <tr className="service" key={shortId.generate()}>
                                <td className="tableitem">
                                    <p className="itemtext">{d.menu_name}</p>
                                </td>
                        <td className="tableitem">
                            <p className="itemtext">{d.qty}</p>
                        </td>


                                   <td className="tableitem">
                     <p className="itemtext">{d.total}</p>
                 </td>
                                            </tr>
                           )
                       })}
 <tr className="bg" key={shortId.generate()}>
      <td  colSpan="3" className="item"></td>
</tr>
                 <tr className="" key={shortId.generate()}>

                                    <td  colSpan="2" className="item"><h2>Sub Total (Without tax)</h2></td>
                                    <td className="item"><h2>{soldData.amount}</h2></td>
                                </tr>
                         <tr className="" key={shortId.generate()}>
                                    <td colSpan="2" className="item"><h2> NHIS & GETFUND(5%) </h2></td>
                                    <td className="item"><h2>{soldData.nfund}</h2></td>

                                </tr>
                        <tr className="" key={shortId.generate()}>
                                    <td colSpan="2" className="item"><h2>Vat(12.5%) </h2></td>
                            <td className="item"><h2> {soldData.vat} </h2><hr/></td>


                                </tr>
                 <tr key={shortId.generate()}>

                                    <td  colSpan="2"  className="item"><h2>Grand Total</h2></td>
                     <td className="item"><h2>{soldData.gtotal}</h2><hr/></td>
                                </tr>
                   </tbody>

                        </table>

            </div>
            <div id="legalcopy">
                <p className="legal"  style={{textAlign:'center'}} >

                        *** Thank you for your business! ***

                   <br />
                    You have been served by: {soldData.created_by}
                     </p>
                   <p className="legal top" style={{textAlign:'center', fontWeight:900}} >
                Please check your receipt and do not accept any total that is not printed

                   </p>
                <hr/>
                      <p className="legal top" style={{textAlign:'center'}} >

                              Powered By: techtetra.com
                              <br />
                              +233263128007 | +233274078580 |  +2347037351836

                            </p>
                        </div>
      </div>
 </div>
        </React.Fragment>
    )
}

}

export default Invoice;
