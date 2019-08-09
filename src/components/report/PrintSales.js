import React, {PureComponent} from 'react' 
import shortId from 'shortid'
import  '../../st.css' 

class PrintSales extends PureComponent {

render(){
    const { report, total,  period, settings } = this.props;

// console.log(gtotal)
    return (
        <React.Fragment>

    <div id="report-POS">
         <div style={{textAlign:'center'}} id="top">
          <div className="logo"></div>
          <div className="info">
            <h2>{period}</h2>
          </div>
        </div> 
        <div id="bot">

            <div id="table">
                <table>
                       <thead>
                         <tr className="tabletitle" key={shortId.generate()}>
                                    <td className="item"><h2>Invoice </h2></td>
                                    <td className="item"><h2>Cashier</h2></td>
                                    <td className="item"><h2>Amount {settings.currency}</h2></td>
                                    <td className="item"><h2> Date</h2></td>
                            <td className="item"><h2>Status</h2></td>
                          </tr>
                       </thead>

                   <tbody>
                       {report && report.map((d)=> {

                           return (
                               <tr className="service" key={shortId.generate()}>
                                <td className="tableitem">
                                    <p className="itemtext">{d.invoice_number}</p>
                                </td>
                         
                        <td className="tableitem">
                            <p className="itemtext">{d.cashier}</p>
                        </td>

                        <td className="tableitem">
                            <p className="itemtext">{d.amount}</p>
                        </td>

                                   <td className="tableitem">
                                       <p className="itemtext">{d.created_at}</p>
                                   </td>


                                   <td className="tableitem">
                     <p className="itemtext">{d.status}</p>
                 </td>
                                            </tr>
                           )
                       })}
  
                 <tr className="" key={shortId.generate()}>
                                    <td  className="item"></td>
                                    <td  colSpan="2" className="item"><h2>Total Amount</h2></td>
                                    <td className="item"><h2>{total ? total : ' 0'} {settings.currency}</h2></td>
                                </tr>
                          
                   </tbody>

                        </table>

            </div>
            <div id="legalcopy">
                 
                  
                <hr/>
                      <p className="legal top" style={{textAlign:'center'}} >

                              Powered By: techtetra.com
                              <br />
                             +233274078580 | +2347037351836

                            </p>
                        </div>
      </div>
 </div>
        </React.Fragment>
    )
}

}

export default PrintSales;
