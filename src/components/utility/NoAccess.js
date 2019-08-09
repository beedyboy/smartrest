import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom'

const NoAccess = React.memo(({ name, position }) => {


    return (
        <React.Fragment>
            <Result
                status="403"
                title="403"
                subTitle={`Hi ${name} Sorry, you are not authorized to access this page.`}
                extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
            />

        </React.Fragment>

    )



});

export default NoAccess;
