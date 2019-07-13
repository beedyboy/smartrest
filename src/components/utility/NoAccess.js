/**
 * Created by wawooh on 6/3/19.
 */
import React from 'react'
import { Icon, Typography } from 'antd';
const {  Text } = Typography;

const NoAccess = React.memo(({name, position}) => {


        return (
            <React.Fragment>
                <Icon type="warning" />
                <Text strong type="primary">
                    Hi {name}
                </Text>
                <p>
                    You do not have access to this page
                </p>
            </React.Fragment>
            // <Button htmlType="submit" disabled={disabled} type={buttonType}>
            //
            //     {name}
            //     {icon && icon?   <Icon type={icon}/> : ''}
            // </Button>
        )



});

export default NoAccess;
