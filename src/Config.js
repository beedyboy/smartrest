import React from 'react'

export const serverUrl = 'http://127.0.0.1/smart/'
// export const serverUrl = 'http://127.0.0.1/project/php/smart/'


export  const TableConfig = {
    pagination : {
        pageSizeOptions : ['30', '40'],
        showSizeChanger : true,
        pageSize: 4,
        position: 'top'
    }
}
export  const TableConfig2 = {
    pagination : {
        pageSizeOptions : ['30', '40'],
        showSizeChanger : true,
        pageSize: 10
    }
}

export const  Config = () => {
  return (
    <div>
      
    </div>
  )
}

export const Styles ={
    'button': {
        margin:'10px',
  textAlign: 'center'
    },
    'select': {
        margin:'10px',
         width: '90%',
        height:'40px'
    },
    'div' : {
        fontSize: '15px',
        border: '2px solid',
        borderStyle: 'groove'
    }
}
