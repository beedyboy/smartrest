import React from 'react'
// export const serverUrl = 'http://192.168.0.5/smart/'

export const serverUrl = 'http://localhost/project/php/smart/'

export const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}
export  const invoiceTableConfig = {
    pagination : {
        pageSizeOptions : ['10', '20','30'],
        showSizeChanger : true,
        pageSize: 10,
        position: 'both'
    }
}
export  const TableConfig = {
    pagination : {
        pageSizeOptions : ['10', '20','30', '40'],
        showSizeChanger : true,
        pageSize: 5,
        position: 'top'
    }
}
export  const TableConfig2 = {
    pagination : {
        pageSizeOptions : ['30', '40'],
        showSizeChanger : true,
        pageSize: 20
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
    'print': {
        margin: '10px',
        textAlign: 'center',
        backgroundColor: '#08979c',
        fontWeight: 'bolder'
    },
    'select': {
        margin:'10px',
         width: '90%',
        height:'40px'
    },
    'switch': {
        margin:'3px',
         width: '90%',
        height:'30px'
    },
    'div' : {
        fontSize: '15px',
        border: '2px solid',
        borderStyle: 'groove'
    },
    'color':{
        'geekblue':{
            backgroundColor:'#85a5ff'
        }
    },
    'actionButton':{
        margin:'3px',
          backgroundColor: '#85a5ff',
        border: '2px solid',
        borderStyle: 'groove',
        borderRadius:'5px',
          color: 'white',
          padding: '6px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '14px'
    }
}
