        import React, { PureComponent, Suspense } from 'react'
import {Styles} from '../Config'
        // import {createProduct} from '../../store/actions/inventoryActions'
        import {connect} from 'react-redux'
        import {Helmet} from "react-helmet"; 
        import PageLoading from '../components/loading/PageLoading'
        import LocalList from '../components/inventory/LocalList'
        import BarList from '../components/inventory/BarList'
        import ContinentalList from '../components/inventory/ContinentalList'
        import * as actions from '../store/actions/inventoryActions'
        import '../layout.css'
        
import { Divider,  Button, Select, Form, Input, Spin } from 'antd';
const Option = Select.Option;


class ProductMenu extends PureComponent {
        state = {
            id:'',
            kitchen: '',
            product_name: '',
            price:'',
            create:true,
            tables: []
        }


        handleEdit = (data) => {
             this.setState({
                 id:    data.id,
                 product_name: data.product_name,
                 kitchen: data.kitchen,
                 price: data.price,
                 create: data.create
             })
        }

        componentDidMount(){ 
                this.props.fetchContinental()
                this.props.fetchBar()
                this.props.fetchLocal()
        }

        handleChange = (e)=> {
        this.setState({
        [e.target.id]: e.target.value
        })
        }

        handleKitchen = (value)=> {
        this.setState({
        kitchen:value
        })
        }


         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.createProduct(this.state)

        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateProduct(this.state)

        }

        render() {
            // console.log(this.props)
        const {continental,local, bar} = this.props
        return (


<React.Fragment>
<Helmet>
       <title>Menu Management</title>
       <meta name="description" content="Menu Management" />
         </Helmet> 
 <div className="grid" style={Styles.div}>
 
 <div className="column offset-2 column-8">
          
          {/*<Text strong type="secondary">Zone Management</Text>*/}
  <Suspense fallback={<Spin/>}>
        <Form layout="inline" onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>

         <Form.Item>
            <Input id="product_name" placeholder="Add an item"  value={this.state.product_name} onChange={this.handleChange} />
          </Form.Item>

             <Form.Item>

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a kitchen"
    optionFilterProp="children"
    onChange={this.handleKitchen}
    value={this.state.kitchen}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
        <Option value="Bar">Bar</Option>
        <Option value="Continental">Continental</Option>
        <Option value="Local">Local</Option>

  </Select>
         </Form.Item>

<Form.Item>
            <Input id="price" placeholder="Price"  value={this.state.price} onChange={this.handleChange} />
          </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
              {this.state.create ? "Add" : "Save Update"}
          </Button>
        </Form.Item>


        </Form>
  </Suspense>

  </div>

 </div>

    <Divider />


 <div className="grid">

 <div className="column column-4" style={Styles.div}>
     <ContinentalList  continental={continental} click={this.handleEdit} />

 </div>

 <div className="column column-4" style={Styles.div}>
       <Suspense fallback={<PageLoading/>}>
<LocalList local={local} option={this.state} click={this.handleEdit} />
       </Suspense>

 </div>

 <div className="column column-4" style={Styles.div}>
 <BarList bar={bar} click={this.handleEdit}/>

 </div>


 </div>


</React.Fragment>

        )
        }
        }


        const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        continental: state.inventory.continental,
        bar: state.inventory.bar,
        local: state.inventory.local,
        // tables: state.hall.table,
        // seats: state.hall.seat
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        createProduct:(data)=>dispatch(actions.createProduct(data)),
        updateProduct:(data)=>dispatch(actions.updateProduct(data)),
        fetchLocal: ()=> dispatch(actions.fetchLocal()),
        fetchContinental:()=>dispatch(actions.fetchContinental()),
        fetchBar: ()=> dispatch(actions.fetchBar())
        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(ProductMenu);
