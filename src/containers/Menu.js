
import React, { PureComponent } from 'react'
import { TableConfig, Styles, customPanelStyle } from '../Config'
import Kitchen from '../components/inventory/Kitchen'
import Category from '../components/inventory/Category'
import { Table, Typography, Tabs, Button, Select, Form, Input, Divider, Collapse, Icon, Alert, notification } from 'antd';
import * as actions from '../store/actions/inventoryActions'
import * as sactions from '../store/actions/storeActions'
import * as pactions from '../store/actions/productActions'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import { position, fullname } from '../store/utility'
import NoAccess from '../components/utility/NoAccess'

const { Text } = Typography;
const TabPane = Tabs.TabPane;
const { Panel } = Collapse;

const Option = Select.Option;


class Menu extends PureComponent {
  state = {
    id: '',
    sid: '',
    category: '',
    kitchen: '',
    can_have_plate: false,
    make_plate: "normal",
    activeTab: "1",
    price: '',
    item: '',
    create: true,
    selectedMenu: [],
    loading: false
  }
  reset = () => {
    this.setState({
      ...this.state,
      id: '',
      sid: '',
      category: '',
      activeTab: "1",
      kitchen: '',
      price: '',
      item: '',
      create: true,
      selectedMenu: [],
      loading: false,
    })
  }

  changeTab = activeKey => {
    this.setState({
      activeTab: activeKey
    });
  }

  handleStoreItem = (value) => {
    this.setState({
      sid: value
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeCategory = (value) => {
    this.setState({
      ...this.state,
      category: value
    })


  }

  onSelectChange = selectedMenu => {
    console.log('selectedMenu changed: ', selectedMenu);
    this.setState({ selectedMenu });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const item = this.state.item;
    const price = this.state.price;

    if (price && item !== '') {
      this.setState({ loading: true });
      this.props.createMenu(this.state);
      if (this.props.result.success !== true && this.props.result.error !== true) {


        setTimeout(() => {
          this.reset()
        }, 1000);

      }
      // setTimeout(() => {
      //   this.setState({
      //     selectedMenu: [],
      //     loading: false,
      //   });
      // }, 1000);
    }
    else {
      notification.success({
        placement: 'topRight',
        top: 44,
        message: 'Error Message',
        description: 'A field is empty, check price or item name',
        style: {
          width: 400,
          backgroundColor: 'red',
          color: 'white'
        },
      });


    }

  }

  handleEdit = (data) => {

    this.setState({
      ...this.state,
      id: data.id,
      item: data.item,
      price: data.price,
      category: data.catId,
      selectedMenu: data.linker,
      create: data.create,
      activeTab: "1"
    })
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.updateMenu(this.state)
    if (this.props.result.success !== true && this.props.result.error !== true) {
      this.reset()

    }

  }

  componentDidMount() {

    this.props.fetchProduct()
    this.props.fetchCategory()
    this.props.fetchMenu()
    this.props.fetchStockList()
  }

  render() {
    if (position() === "SuperAdmin" || position() === "Admin" || position() === "Supervisor") {
      const { kitchenCat, menu, products, result } = this.props

      const { item, price, category, kitchen, loading, selectedMenu } = this.state
      const enabled = category && item && price && selectedMenu.length > 0;
      const rowSelection = {
        selectedMenu,
        onChange: this.onSelectChange,
      };
      const hasSelected = selectedMenu.length > 0;



      const columns = [

        {
          title: 'Menu Name',
          dataIndex: 'item',
          key: 'item'
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: 'Category',
          dataIndex: 'catName',
          key: 'catName'
        },
        {
          title: 'Date',
          key: 'created_at',
          render: (record) => (
            <Text strong type="primary">{record.created_at} </Text>
          )
        },
        {
          title: 'Action',
          key: 'key',
          render: (record) => (
            <React.Fragment>

              {/*{record.options}*/}
              <Button type="secondary" onClick={() => {
                const data = {
                  id: record.id,
                  item: record.item,
                  price: record.price,
                  catId: record.catId,
                  linker: record.linker,
                  create: false
                };
                this.handleEdit(data)
              }}><Icon type="edit" />Edit</Button>
            </React.Fragment>
          )


        }
      ]

      const columns2 = [
        {
          title: 'Product Name',
          dataIndex: 'product_name',
          key: 'product_name',
        }
      ]
      return (
        <React.Fragment>

          <Helmet>
            <title>Menu Management</title>
            <meta name="description" content="Menu Management" />
          </Helmet>


          <div className="mother">
            <div className="child large-12 med-12 small-12">

              <Kitchen />
            </div>
            <div className="child large-12 med-12 small-12">

              <Category />
            </div>
          </div>

          <Tabs onChange={this.changeTab} type="card" activeKey={this.state.activeTab}>
            <TabPane tab={<span><Icon type="coffee" />Create/Modify Menu</span>} key="1">

              <div className="mother">

                <div className="child large-6 med-6 small-6">
                  <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                  >
                    <Panel header=" Menu Management" key="1" style={customPanelStyle}>
                      <Divider type="horizontal">Create a Menu</Divider>
                      <Form layout="vertical" onSubmit={this.state.create ? this.handleSubmit : this.handleUpdate}>
                        <Form.Item label="Select a category">
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a category"
                            optionFilterProp="children"
                            onChange={this.handleChangeCategory}
                            value={this.state.category}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            {kitchenCat && kitchenCat.map((category, key) => {
                              return (
                                <Option key={category.id} value={category.id}> {category.name} - {category.kitchen_name} </Option>
                              )
                            }
                            )}

                          </Select>
                        </Form.Item>

                        <Form.Item label="Menu Item">
                          <Input id="item" value={this.state.item} onChange={this.handleChange} />
                        </Form.Item>


                        <Form.Item label="Price">
                          <Input id="price" value={this.state.price} onChange={this.handleChange} />
                        </Form.Item>



                        <Form.Item>
                          <Button type="secondary" style={Styles.button} onClick={this.reset} > Clear Menu</Button>

                          <Button type="primary" style={Styles.button} disabled={!enabled} htmlType="submit">
                            <Icon type="coffee" />
                            {this.state.create ? "Add Menu" : "Update Menu"}
                          </Button>

                        </Form.Item>

                      </Form>
                      {result.sending ? <Alert
                        message="Error"
                        description={result.message}
                        type="error"
                        showIcon
                      /> : ''}
                    </Panel>
                  </Collapse>
                </div>

                <div className="child large-6 med-6 small-6">

                  <React.Fragment>
                    <div style={{ marginBottom: 6 }}>
                      <Button type="primary" onClick={this.state.create ? this.handleSubmit : this.handleUpdate} disabled={!hasSelected} loading={loading}>
                        Add Menu as Plate
          </Button>
                      <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedMenu.length} items` : ''}
                      </span>
                    </div>
                    <Table rowSelection={rowSelection} rowKey="id" dataSource={products} columns={columns2}
                      {...TableConfig} bordered title={() => <Text strong type="primary"> {kitchen} Product List </Text>} />

                    <div style={{ marginBottom: 6 }}>
                      {/* <Button type="primary" onClick={this.makeMenuPlate} disabled={!hasSelected} loading={loading}>
                        Add Menu as Plate
																 </Button> */}
                      <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedMenu.length} items` : ''}
                      </span>
                    </div>
                  </React.Fragment>


                </div>
              </div>
            </TabPane>

            <TabPane tab={<span><Icon type="shopping-cart" />View Menu</span>} key="2">

              <Table rowKey="id" dataSource={menu} columns={columns}
                {...TableConfig} bordered title={() => <Text strong type="primary">Menu List </Text>} />


            </TabPane>
          </Tabs>

        </React.Fragment>
      )
    }
    return <NoAccess name={fullname()} />
  }
}

const mapStateToProps = (state) => {

  return {

    result: state.form.result,
    kitchenMenu: state.inventory.kitchenMenu,
    menu: state.inventory.menu,
    products: state.product.products,
    kitchenCat: state.inventory.kitchenCat,
    stockList: state.stores.stockList,
    role: state.auth.role
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: () => dispatch(actions.fetchCategory()),
    // getKitchenMenu: (kitchenId) => dispatch(actions.getKitchenMenu(kitchenId)),
    fetchMenu: () => dispatch(actions.fetchMenu()),
    // createProductMenu: (data) => dispatch(actions.createProductMenu(data)),
    createMenu: (data) => dispatch(actions.createMenu(data)),
    updateMenu: (data) => dispatch(actions.updateMenu(data)),
    fetchStockList: () => dispatch(sactions.fetchStockList()),
    fetchProduct: () => dispatch(pactions.fetchProduct())
  }
}
export default
  connect(mapStateToProps, mapDispatchToProps)(Menu);
