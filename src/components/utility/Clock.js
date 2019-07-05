import React, {PureComponent} from 'react'
import moment from 'moment' 
  
class Clock extends PureComponent{
//     state = {
//         c: moment().format('LLLL'),
//         intervalId:''
//     }
//    calClock = ()=>{
//        let clock =  moment().format('LLLL')
//       this.setState({
//           c:clock
//       })
 
//    }
   
//    componentDidMount(){
//     let intervalId =   setInterval(this.calClock,60000)
//     this.setState({ intervalId: intervalId })
//     }
//     componentWillUnmount(){
//         clearInterval(this.state.intervalId)
//         // clearInterval(this.intervalId)
//     }
    render(){ 
      
    
        return (
<React.Fragment> 
    {moment().format('LLLL')}
</React.Fragment>
        )
    }
}
export default Clock;
