/**
 * Created by wawooh on 4/17/19.
 */
 import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Styles} from '../Config'
import {   Button, Select, Form,Typography} from 'antd';
 import {Helmet} from "react-helmet";
 import * as actions from '../store/actions/settingsActions'
  import '../layout.css'
import {position,fullname} from '../store/utility'
import NoAccess from '../components/utility/NoAccess'
import GeneralSettings from '../components/settings/GeneralSettings'
// const GeneralSettings = lazy(() => import('../components/settings/GeneralSettings'));
const Option = Select.Option;

const {  Text } = Typography;
class Settings extends PureComponent {
        state = {
            id:'',
            currency:'',
            edit:false
        }
  handleSettingsChange = (data) => {
            // console.log(data)
      this.setState({
          ...this.state,
          id:data.id,
          currency:data.currency,
          edit:data.edit
      })
    }
             componentDidMount() {
               this.props.getSystemSettings()
            }


        handleChange = (value)=> {
           this.setState({
                  currency:value
        })
        }

         handleSubmit=(e)=>{
            e.preventDefault();
       this.props.updateSettings(this.state)
             const settings = this.props.settings
        if(settings){
                this.setState({
                    ...this.state,
                    id:settings.id,
                    currency:settings.currency
                })
            }
        }

        render() {
        if (position() === "SuperAdmin" || position() === "Admin") {
            const {settings} = this.props

        return (


<React.Fragment>
<Helmet>
       <title>General Setting</title>
       <meta name="description" content="General Settin" />
         </Helmet>
 <div className="grid">
    {this.state.edit? (
      <div className="column column-6" style={Styles.div}>
          <Text strong >System Settings</Text>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label="Currency">

          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a currency"
    id="currency" name="currency"
    optionFilterProp="children"
    onChange={this.handleChange}
    value={this.state.currency}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
        <Option value="Kz">Angolan kwanza</Option>
        <Option value="&pound;">British pound</Option>
        <Option value="&#8373;">Cedis</Option>
        <Option value="&euro;">Euro</Option>
        <Option value="&#8377;">Indian Rupee</Option>
        <Option value="&#8358;">Naira</Option>
        <Option value="Ɍs">Pakistan Rupee</Option>
        <Option value="₱">Philippine peso</Option>
        <Option value="kr">Sweeden </Option>
        <Option value="&#36;">US Dollar</Option>
        <Option value="CFA">West African CFA franc</Option>
        <Option value="&#90;&#36;">Zimbabwe Dollar</Option>

  </Select>
         </Form.Item>

    <Form.Item>
          <Button  type="primary"  htmlType="submit">
          Update
          </Button>
    </Form.Item>

          </Form>
     </div> )
: ''}
     <div className="column column-6">


    <GeneralSettings settings={settings} click={this.handleSettingsChange}/>
</div>
 </div>

</React.Fragment>
   )
            }
           return <NoAccess name={fullname()}/>
        }
        }


const mapStateToProps = (state)=> {

    return {
        settings: state.setting.settings,
      role: state.auth.role
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
getSystemSettings:(data)=>dispatch(actions.getSystemSettings()),
updateSettings:(data)=>dispatch(actions.updateSettings(data))
  }
}
        export default
        connect(mapStateToProps, mapDispatchToProps)(Settings);
