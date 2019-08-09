import React, { PureComponent,Suspense } from 'react'
import {Styles} from '../Config'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import PageLoading from '../components/loading/PageLoading'
import Zone from '../components/hall/Zone'
import Table from '../components/hall/Table'
import Seat from '../components/hall/Seat'
import * as hactions from '../store/actions/hallActions'
import { SketchPicker } from 'react-color';
import '../layout.css'
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
        
import { Typography,  Button, Modal, Select, Alert, Form, Input } from 'antd';
const Option = Select.Option;
const {  Text } = Typography;



class Hall extends PureComponent { 
        state = {
            id:'',
            name: '',
            tname: '',
            seat:'',
            color:'#ffffff',
            tables: [],
            modal: {
              zone: false,
              table: false,
              seat: false
            },
            action: {
              zone: true,
              table: true,
              seat: true
            },
            visible : false
        }

        reset= ()=>{
            // console.log('clear')
            this.setState({
                ...this.state,
                 id:'',
                name: '',
                tname: '',
                seat:'',
                tables: [],
                color: '#ffffff',

            })
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
            },
              action:{
              ...this.state.action,
            [field]: true
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
            if(this.props.result.sending === false) {
             this.handleOk('zone')
                this.reset()
            }
        }
        handleZoneEdit = (data) => {
             this.setState({
                 id:    data.id,
                 name:   data.name,
                 color:   data.color,
                action: {
                     ...this.state.action,
                 zone:data.create
                 },
                 modal: {
                       ...this.state.modal,
                 zone: true,
                 table: false,
                 seat: false
            },
             })
        }
        handleZoneUpdate=(e)=>{
            e.preventDefault();
       this.props.updateZone(this.state)
             if(this.props.result.sending === false) {
             this.handleOk('zone')

                this.reset()
            }

        }
        handleChangeZone=(value) => {
              this.setState({
                name:value
              })
    }

        handleTableSubmit=(e)=>{
        e.preventDefault();
        this.props.createTable(this.state.name, this.state.tname)
            if(this.props.result.sending === false) {
             this.handleOk('table')
                this.reset()
            }
        }

        handleTableEdit = (data) => {
             this.setState({
                 id:    data.id,
                 name:   data.name,
                 tname:   data.tname,
                action: {
                 table:data.create
                 },
                 modal: {
                 table: true
            },
             })
        }
        handleTableUpdate=(e)=>{
            e.preventDefault();
       this.props.updateTable(this.state.name, this.state.tname, this.state.id)
            if(this.props.result.sending === false) {
             this.handleOk('table')
                this.reset()
            }

        }

        getTableByZone = (value) => {
            this.setState({
                name:value
             })
            this.props.getTableByHall(value)
        }


        handleChangeTable=(value) => {
              this.setState({
                tname:value
              })
    }

         handleSeatSubmit=(e)=>{
            e.preventDefault();
        this.props.createSeat(this.state.tname, this.state.seat)
            // console.log(this.props.result.sending)
           if(this.props.result.sending === false) {

                this.reset()
             this.handleOk('seat')
            }
        }

        handleSeatEdit = (data) => {
             this.setState({
                 id:    data.id,
                 name:   data.hid,
                 tname:   data.tid,
                 seat:   data.seat,
                action: {
                 seat:data.create
                 },
                 modal: {
                 seat: true
            },
             })
            this.getTableByZone(data.hid)
        }
   handleSeatUpdate=(e)=>{
            e.preventDefault();
       this.props.updateSeat(this.state.name, this.state.seat, this.state.id)
            if(this.props.result.sending === false) {
             this.handleOk('seat')

                this.reset()
            }

        }
        handleChangeComplete = (color) => {
//    console.log("COLOR", color.hex)
    this.setState({ color: color.hex });
  };
 

        render() {
            if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {

        //   const initial = '#5e72e4';    
              const {zones, tables, htables, result} = this.props
                const {name, tname, seat, color} = this.state;
                const enabled = name.length > 0;
                const tenabled = name &&
                    tname.length > 0;
                const senabled = name &&
                    seat.length > 0;
                return (


                    <React.Fragment>
                        <Helmet>
                            <title>Hall Management</title>
                            <meta name="description" content="Hall Management"/>
                        </Helmet>
                        <div className="grid" style={Styles.div}>

                            <div className="column column-4">

                                <Text strong type="secondary">Zone
                                    Management</Text>
                                <br />


                                <Button type="primary"
                                        onClick={() => this.showModal('zone')}>
                                    Add Zone </Button>

                                <Zone zones={zones}
                                      click={this.handleZoneEdit}/>

                            </div>
                            <div className="column column-4">

                                <Text strong type="secondary">Table
                                    Management</Text>
                                <br/>
                                <Button type="primary"
                                        onClick={() => this.showModal('table')}>
                                    Add Table </Button>
                                <Table tables={tables}
                                       click={this.handleTableEdit}/>
                            </div>

                            <div className="column column-4">

                                <Text strong type="secondary">Seat
                                    Management</Text>
                                <br />

                                <Button type="primary"
                                        onClick={() => this.showModal('seat')}>
                                    Add Seat </Button>

                                <Seat seats={this.props.seats}
                                      click={this.handleSeatEdit}/>
                            </div>

                        </div>


<React.Fragment>
    <Suspense fallback={<PageLoading/>}>
        <Modal
            title="Zone"
            visible={this.state.modal.zone}
            onOk={() => this.handleOk('zone')}
            onCancel={() => this.handleOk('zone')}
        >
            <Form layout="horizontal"
                    onSubmit={this.state.action.zone ? this.handleZoneSubmit : this.handleZoneUpdate}>

                <Form.Item label="Zone Name">
                    <Input id="name"
                            placeholder="Enter Zone Name"
                            value={this.state.name}
                            onChange={this.handleChange}/>
                                                                </Form.Item>

<Form.Item label="Zone Color">
            <SketchPicker
        color={ color }
        onChangeComplete={ this.handleChangeComplete }
      />
                  </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!enabled}
                    >
                        {this.state.action.zone ? "Add Zone" : "Save Update"}
                    </Button>
                </Form.Item>
            </Form>

            {  result.sending ? <Alert
                message="Error"
                description={result.message}
                type="error"
                showIcon
            /> : ''}
        </Modal>
    </Suspense>
</React.Fragment>


                        <React.Fragment>
                            <Suspense fallback={<PageLoading/>}>
                                <Modal
                                    title="Table"
                                    visible={this.state.modal.table}
                                    onOk={() => this.handleOk('table')}
                                    onCancel={() => this.handleOk('table')}
                                >
                                    <Form layout="horizontal"
                                          onSubmit={this.state.action.table ? this.handleTableSubmit : this.handleTableUpdate}>

                                        <Form.Item label="Zones">

                                            <Select
                                                showSearch
                                                style={{width: 200}}
                                                placeholder="Select a zone"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeZone}
                                                value={this.state.name}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {zones && zones.map((zone, key) => {
                                                        return (
                                                            <Option key={zone.id}
                                                                    value={zone.id}> {zone.name} </Option>
                                                        )
                                                    }
                                                )}

                                            </Select>
                                        </Form.Item>


                                        <Form.Item label="Table Name">
                                            <Input id="tname"
                                                   placeholder="Enter Table Name"
                                                   value={this.state.tname}
                                                   onChange={this.handleChange}/>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                disabled={!tenabled}
                                            >
                                                {this.state.action.table ? "Add Table" : "Save Update"}
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                    {  result.sending ? <Alert
                                        message="Error"
                                        description={result.message}
                                        type="error"
                                        showIcon
                                    /> : ''}
                                </Modal>
                            </Suspense>
                        </React.Fragment>


                        <React.Fragment>
                            <Suspense fallback={<PageLoading/>}>
                                <Modal
                                    title="Seat"
                                    visible={this.state.modal.seat}
                                    onOk={() => this.handleOk('seat')}
                                    onCancel={() => this.handleOk('seat')}
                                >
                                    <Form layout="horizontal"
                                          onSubmit={this.state.action.table ? this.handleSeatSubmit : this.handleSeatUpdate}>

                                        <Form.Item label="Zones">

                                            <Select
                                                showSearch
                                                style={{width: 200}}
                                                placeholder="Select a zone"
                                                optionFilterProp="children"
                                                onChange={this.getTableByZone}
                                                value={this.state.name}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {zones && zones.map((zone, key) => {
                                                        return (
                                                            <Option key={zone.id}
                                                                    value={zone.id}> {zone.name} </Option>
                                                        )
                                                    }
                                                )}

                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Tables">

                                            <Select
                                                showSearch
                                                style={{width: 200}}
                                                placeholder="Select a table"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeTable}
                                                value={this.state.tname}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {htables.map((table, key) => {
                                                        return (
                                                            <Option key={table.id}
                                                                    value={table.id}> {table.name} </Option>
                                                        )
                                                    }
                                                )}

                                            </Select>
                                        </Form.Item>


                                        <Form.Item label="Seat Name">
                                            <Input id="seat"
                                                   placeholder="Enter Seat Name"
                                                   value={this.state.seat}
                                                   onChange={this.handleChange}/>
                                        </Form.Item>


                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                disabled={!senabled}
                                            >
                                                {this.state.action.table ? "Add Seat" : "Save Update"}
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                    {  result.sending ? <Alert
                                        message="Error"
                                        description={result.message}
                                        type="error"
                                        showIcon
                                    /> : ''}

                                </Modal>
                            </Suspense>
                        </React.Fragment>


                    </React.Fragment>

                )
            }
           return <NoAccess name={fullname()}/>
        }
        }


        const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        result: state.form.result,
        zones: state.hall.zone, 
        htables: state.hall.htables,
        users: state.user.users,
        tables: state.hall.table,
        seats: state.hall.seat,
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        fetchHall: ()=> dispatch(hactions.fetchHall()),
        createHall:(data)=>dispatch(hactions.createHall(data)),
        updateZone:(data)=>dispatch(hactions.updateZone(data)),
        createTable:(hid,name)=>dispatch(hactions.createTable(hid,name)),
        updateTable:(hid,name,id)=>dispatch(hactions.updateTable(hid,name,id)),
        fetchTable:()=>dispatch(hactions.fetchTable()),
        getTableByHall:(hid)=>dispatch(hactions.getTableByHall(hid)),
        createSeat:(tid,name)=>dispatch(hactions.createSeat(tid,name)),
        updateSeat:(tid,name,id)=>dispatch(hactions.updateSeat(tid,name,id)),
        fetchSeat: ()=> dispatch(hactions.fetchSeat())
        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Hall); 
