import React, {PureComponent} from 'react' 
import shortId from 'shortid'
import  '../../st.css' 

class PrintStockSales extends PureComponent {

render(){
    const { report,  period } = this.props;

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
                                    <td className="item"><h2>Stock Item </h2></td>
                                    <td className="item"><h2>Sold</h2></td>
                                    <td className="item"><h2>Left</h2></td> 
                          </tr>
                       </thead>

                   <tbody>
                       {report && report.map((d)=> {

                           return (
                               <tr className="service" key={shortId.generate()}>
                                <td className="tableitem">
                                    <p className="itemtext">{d.item_name}</p>
                                </td>
                         
                        <td className="tableitem">
                            <p className="itemtext">{d.sold}</p>
                        </td>

                        <td className="tableitem">
                            <p className="itemtext">{d.left}</p>
                        </td>
 
                                            </tr>
                           )
                       })}
  
                
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

export default PrintStockSales;
