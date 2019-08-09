
import React, { PureComponent } from 'react'
import { connect } from 'react-redux' 
// import { Typography } from 'antd';

import { Helmet } from "react-helmet";
import Acquisition from './Acquisition'
// import FinishedProduct from '../components/inventory/FinishedProduct'

class Store extends PureComponent {
    render() {
        return (

            <React.Fragment>
                <Helmet>
                    <title>Store</title> 
                </Helmet>

                <div className="grid">
                    <div className="column column-12">
                            <Acquisition />
                        </div>
                </div>  
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default
    connect(mapStateToProps, mapDispatchToProps)(Store);
// export default Store;