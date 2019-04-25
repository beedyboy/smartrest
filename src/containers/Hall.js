        import React, { PureComponent,Suspense } from 'react'
import {Styles} from '../Config'
        import {connect} from 'react-redux'
        import {Helmet} from "react-helmet"; 
        import PageLoading from '../components/loading/PageLoading'
        import Zone from '../components/hall/Zone'
        import Table from '../components/hall/Table'
        import Seat from '../components/hall/Seat'
        import * as hactions from '../store/actions/hallActions'
        import '../layout.css'
        
import { Typography,  Button, Modal, Select, Form, Input } from 'antd'; 
const Option = Select.Option;
const {  Text } = Typography;



class Hall extends PureComponent { 
        state = { 
            name: '',
            tname: '',
            seat:'',
            tables: [],
            modal: {
              zone: false,
              table: false,
              seat: false
            },
            visible : false
        }
        
        showModal = (field) => {
          this.setState({
                  ...this.state,
            modal:{
              ...this.state.modal,
            [field]: true
            }
          });
        }

        handleOk = (field) => {
          this.setState({
                  ...this.state,
            modal:{
              ...this.state.modal,
            [field]: false
            }
          });
        }

        componentWillMount(){
                this.props.fetchHall()
                this.props.fetchTable()
                this.props.fetchSeat()
        }
 
        handleChange = (e)=> {
        this.setState({
        [e.target.id]: e.target.value
        })
        }

        handleZoneSubmit=(e)=>{
        e.preventDefault();
        this.props.createHall(this.state)
             this.handleOk('zone')
        }


      handleChangeZone=(value) => {
              this.setState({
                name:value
              })
    }

        handleTableSubmit=(e)=>{
        e.preventDefault();
        this.props.createTable(this.state.name, this.state.tname)
            this.handleOk('table')
        }

        getTableByZone = (value) => {
            this.setState({
                name:value
             })
            this.props.getTableByHall(value)
            // console.log(this.state)
        }


        handleChangeTable=(value) => {
              this.setState({
                name:value
              })
    }

         handleSeatSubmit=(e)=>{
            e.preventDefault();
        this.props.createSeat(this.state.name, this.state.seat)
            this.handleOk('seat')
        }


        render() {
            // console.log(this.props)
        const {zones,tables, htables} = this.props
        return (

         
<React.Fragment>
<Helmet>
       <title>Hall Management</title>
       <meta name="description" content="Hall Management" />
         </Helmet> 
 <div className="grid" style={Styles.div}>
 
 <div className="column column-4">   
          
          <Text strong type="secondary">Zone Management</Text>
     <br />
          <Button type="primary" onClick={() =>this.showModal('zone')}> Add Zone   </Button> 
          <Zone zones={zones}/> 
  </div>
 <div className="column column-4">

 <Text  strong type="secondary">Table Management</Text>
 <br/>
  <Button type="primary" onClick={() =>this.showModal('table')}> Add Table   </Button> 
  <Table tables={tables}/>
   </div>

 <div className="column column-4">  
          
   <Text strong type="secondary">Seat Management</Text>
     <br />
          <Button type="primary" onClick={() =>this.showModal('seat')}> Add Seat   </Button>
  <Seat seats={this.props.seats}/>
  </div>

 </div>
        
        <React.Fragment>
        <Suspense fallback={<PageLoading/>}>
<Modal
          title="Table"
          visible={this.state.modal.table}
          onOk={()=>this.handleOk('table')}
          onCancel={this.handleCancel}
        >
        <Form layout="horizontal" onSubmit={this.handleTableSubmit}>

        <Form.Item label="Zones" >
        
          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a zone"
    optionFilterProp="children"
    onChange={this.handleChangeZone}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {this.props.zones.map((zone, key) => {
           return (
        <Option key={zone.id} value={zone.id}> {zone.name} </Option>
        )
        }
        )}
   
  </Select>
         </Form.Item>


         <Form.Item  label="Table Name"  >
            <Input id="tname" placeholder="Enter Table Name"  value={this.state.tname} onChange={this.handleChange} />
          </Form.Item>
      
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit" 
          >
           Save
          </Button>
        </Form.Item>    
        </Form>
        

        </Modal>  
</Suspense>
        </React.Fragment>



    <React.Fragment>
        <Suspense fallback={<PageLoading/>}>
<Modal
          title="Zone"
          visible={this.state.modal.zone}
          onOk={()=>this.handleOk('zone')}
          onCancel={this.handleCancel}
        >
        <Form layout="horizontal" onSubmit={this.handleZoneSubmit}>


         <Form.Item  label="Zone Name"  >
            <Input id="name" placeholder="Enter Zone Name"  value={this.state.name} onChange={this.handleChange} />
          </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
           Save Zone
          </Button>
        </Form.Item>
        </Form>


        </Modal>
</Suspense>
        </React.Fragment>


    <React.Fragment>
        <Suspense fallback={<PageLoading/>}>
<Modal
          title="Seat"
          visible={this.state.modal.seat}
          onOk={()=>this.handleOk('seat')}
          onCancel={this.handleCancel}
        >
        <Form layout="horizontal" onSubmit={this.handleSeatSubmit}>

             <Form.Item label="Zones" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a zone"
    optionFilterProp="children"
    onChange={this.getTableByZone}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {this.props.zones.map((zone, key) => {
           return (
        <Option key={zone.id} value={zone.id}> {zone.name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>

             <Form.Item label="Tables" >

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a table"
    optionFilterProp="children"
    onChange={this.handleChangeTable}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
  {htables.map((table, key) => {
           return (
        <Option key={table.id} value={table.id}> {table.name} </Option>
        )
        }
        )}

  </Select>
         </Form.Item>


         <Form.Item  label="Seat Name"  >
            <Input id="seat" placeholder="Enter Seat Name"  value={this.state.seat} onChange={this.handleChange} />
          </Form.Item>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
           Save Seat
          </Button>
        </Form.Item>
        </Form>


        </Modal>
</Suspense>
        </React.Fragment>


</React.Fragment>

        )
        }
        }


        const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        zones: state.hall.zone, 
        htables: state.hall.htables,
        users: state.user.users,
        tables: state.hall.table,
        seats: state.hall.seat
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        fetchHall: ()=> dispatch(hactions.fetchHall()),
        createHall:(name)=>dispatch(hactions.createHall(name)),
        createTable:(hid,name)=>dispatch(hactions.createTable(hid,name)),
        fetchTable:()=>dispatch(hactions.fetchTable()),
        getTableByHall:(hid)=>dispatch(hactions.getTableByHall(hid)),
        createSeat:(tid,name)=>dispatch(hactions.createSeat(tid,name)),
        fetchSeat: ()=> dispatch(hactions.fetchSeat())
        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Hall); 
