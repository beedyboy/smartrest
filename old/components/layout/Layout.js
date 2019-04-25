import React from 'react'
// import {Link} from 'react-router-dom'
import MainLayout from './MainLayout'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'

// const Layout = () =>{

//     return (
//         <MainLayout/>
//     )
// }
// export default Layout;

class Layout extends React.Component {
   
    render(){
        // console.log(this.props) 
        const {auth} = this.props

//  console.log(auth)
        return  (
            <div>
                <Helmet>
            <title>Smart Restaurant</title>
            <meta name="description" content="Smart Restaurant" />
        </Helmet>
            <MainLayout auth={auth} />
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    // console.log(state)
    return {
        // zones: state.hall.zone,
        auth: state.auth
        
    }
} 

export default
connect(mapStateToProps, null)(Layout); 
// export default Layout;