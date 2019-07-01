        import React, { PureComponent, Suspense } from 'react'
        import {Styles} from '../Config'
        import {connect} from 'react-redux'
        import {Helmet} from "react-helmet"; 
        import PageLoading from '../components/loading/PageLoading'
        import LocalList from '../components/inventory/LocalList'
        import BarList from '../components/inventory/BarList'
        import ContinentalList from '../components/inventory/ContinentalList'
        import * as actions from '../store/actions/inventoryActions'
        import '../layout.css'
        
import { Divider,  Button, Tooltip, Select, Form, Alert, Icon, Input, Spin, Typography } from 'antd';
const Option = Select.Option;

const {  Text } = Typography;

class ProductMenu extends PureComponent {
        state = {
            id:'',
            kitchen: '',
            product_name: '',
            price:'',
            create:true,
            tables: []
        }

        reset=()=>{
            this.setState({
                ...this.state,
                 id:'',
                kitchen: '',
                product_name: '',
                price:'',
                create:true,
                tables: []
            })
        }
        handleEdit = (data) => {
            // console.log(data)
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
              if(this.props.result.success !== true && this.props.result.error !== true) {
                this.reset()

            }

        }

         handleUpdate=(e)=>{
            e.preventDefault();
       this.props.updateProduct(this.state)

        }

        render() {

        const {continental,local, bar, role, result} = this.props
        const {product_name,kitchen, price} = this.state
    const enabled =    product_name &&
                           kitchen  &&
                            price.length > 0;
        return (


<React.Fragment>
<Helmet>
       <title>Menu Management</title>
       <meta name="description" content="Menu Management" />
         </Helmet> 


        {(role && role.indexOf("addMenu") !== -1 )?
         (
         <React.Fragment>
             <div className="grid" style={Styles.div}>

 <div className="column offset-1 column-9">
          
          <Text strong type="primary">Create Product</Text>
  <Suspense fallback={<Spin/>}>
        <Form layout="inline" onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>

         <Form.Item>

<Tooltip placement="top" title="Enter product name">
            <Input id="product_name" placeholder="Add an item"  value={this.state.product_name} onChange={this.handleChange} />
</Tooltip>
          </Form.Item>

             <Form.Item>
<Tooltip placement="top" title="Select a Kitchen">

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
</Tooltip>
         </Form.Item>
<Form.Item>

<Tooltip placement="top" title="Add product price">
    <Input id="price" placeholder="Price"  value={this.state.price} onChange={this.handleChange} />
</Tooltip>
          </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit" disabled={!enabled}
          ><Icon type="gift" />
              {this.state.create ? "Add" : "Save Update"}
          </Button>
             <Button style={{ marginLeft: 8 }} onClick={this.reset}>
              Clear
            </Button>
        </Form.Item>


        </Form>
  </Suspense>

   {  result.sending ? <Alert
          message="Error"
          description={result.message}
          type="error"
          showIcon
        /> : ''}
  </div>

 </div>

    <Divider />
        </React.Fragment>
         ): ''}

 <div className="grid">

 <div className="column column-4" style={Styles.div}>
     <ContinentalList role={role} continental={continental} click={this.handleEdit} />

 </div>

 <div className="column column-4" style={Styles.div}>
       <Suspense fallback={<PageLoading/>}>
<LocalList local={local} role={role} option={this.state} click={this.handleEdit} />
       </Suspense>

 </div>

 <div className="column column-4" style={Styles.div}>
 <BarList bar={bar} role={role} click={this.handleEdit}/>

 </div>


 </div>


</React.Fragment>

        )
        }
        }


        const mapStateToProps = (state)=> {
        // console.log(state)
        return {
        result: state.form.result,
        continental: state.inventory.continental,
        bar: state.inventory.bar,
        local: state.inventory.local,
        role: state.auth.role
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
