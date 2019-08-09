import React, {PureComponent} from 'react' 
import shortId from 'shortid'
import  '../../st.css' 

class PrintDept extends PureComponent {

render(){
    const { dept, total,  period, settings } = this.props;
 
    return (
        <React.Fragment>

    <div id="invoice-POS">
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
                                    <td className="item"><h2>Menu Name </h2></td>
                                    <td className="item"><h2>Quantity Sold </h2></td> 
                                    <td className="item"><h2>Amount {settings.currency}</h2></td> 
                          </tr>
                       </thead>

                   <tbody>
                       {dept && dept.map((d)=> {

                           return (
                               <tr className="service" key={shortId.generate()}>
                                <td className="tableitem">
                                       <p className="itemtext">{d.menu_name}</p>
                                </td>
                          
                        <td className="tableitem">
                            <p className="itemtext">{d.sold}</p>
                        </td>
                        <td className="tableitem">
                            <p className="itemtext">{d.price}</p>
                        </td>
 
                                            </tr>
                           )
                       })}
  
                 <tr className="" key={shortId.generate()}>
                                    <td colSpan="2" className="item"><h2>Total Amount</h2></td>
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
                              +233274078580 |  +2347037351836

                            </p>
                        </div>
      </div>
 </div>
        </React.Fragment>
    )
}

}

export default PrintDept;
