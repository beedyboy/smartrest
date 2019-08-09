import React, {
    Component
} from 'react'
import PointTarget from 'react-point'
import { 
    Button 
} from 'antd';
export default class CalculatorKey extends Component {
    render() {
         const { onPress,   className, ...props } = this.props

         return ( 
             <PointTarget onPoint = {onPress }>
     
             <Button className = {
                 `calculator-key ${className}`
             } {
                 ...props
             }
             /> 
             </PointTarget>
         )
    }
}
