/**
 * Created by wawooh on 5/6/19.
 */
import React from 'react'
import { Button, Icon } from 'antd';
const SaveButton = React.memo(({name,icon, buttonType, disabled, role, permission}) => {
// console.log(role)

        return (
            <Button htmlType="submit" disabled={disabled} type={buttonType}>

                {name}
                {icon && icon?   <Icon type={icon}/> : ''}
            </Button>
        )



});

export default SaveButton;
