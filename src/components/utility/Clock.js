import React, {PureComponent} from 'react'
import moment from 'moment' 
 
class Clock extends PureComponent{
     
    render(){ 
      
        return (
<span> {moment().format('LLLL')}</span>
        )
    }
}
export default Clock;
