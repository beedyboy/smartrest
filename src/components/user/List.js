import React, { Component } from 'react'
import {connect} from 'react-redux'
import MaterialTable from 'material-table' 
import axios from 'axios';

class UserList extends Component{
  render(){
    const {user} = this.props
 console.log(this.props)
    return (
      <div className="User-list section">
    <MaterialTable
  columns={[
    { title: 'Adı', field: 'name' },
    { title: 'Soyadı', field: 'surname' },
    { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
    {
      title: 'Doğum Yeri',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]}
  data={[
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  ]}
  title="Multiple Detail Panel With RowClickExample"
  detailPanel={[
    {
      tooltip: 'Show Name',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#43A047',
            }}
          >
            {rowData.name}
          </div>
        )
      },
    },
    {
      icon: 'account_circle',
      tooltip: 'Show Surname',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#E53935',
            }}
          >
            {rowData.surname}
          </div>
        )
      },
    },
    rowData => ({
      disabled: rowData.name === 'ax',
      icon: 'favorite_border',
      openIcon: 'favorite',
      tooltip: 'Show Both',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#FDD835',
            }}
          >
            {rowData.name} {rowData.surname}
          </div>
        )
      },
    }),
  ]}
  onRowClick={(event, rowData, togglePanel) => togglePanel(1)}
/>
      </div>
  )
  }
    
}

  const MapStateToProps = (state) => {
    return {
      users: state.user.users
    }
}
const MapDispatchToProps = (dispatch) =>{
 return {
  // fetchUser: (user) =>{ dispatch(fetchUser(user))}
 }
}

export default connect(MapStateToProps, MapDispatchToProps)(UserList);