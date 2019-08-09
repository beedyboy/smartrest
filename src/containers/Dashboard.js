 
        import React, { PureComponent, Suspense } from 'react' 
        import {connect} from 'react-redux'
        import {Helmet} from "react-helmet";
        import PageLoading from '../components/loading/PageLoading'
        import * as actions from '../store/actions/dashboardActions'
        import shortId from 'shortid'
        import '../layout.css'
        
// import styled from 'styled-components'

 import { Statistic, Card, Row, Col, Icon,Skeleton, Spin } from 'antd';
 import {  AnimateKeyframes } from 'react-simple-animate';
// //  import {
//   VictoryBar,
//   VictoryChart,
//   VictoryTheme,
//   VictoryTooltip, 
//   VictoryLabel,
//   VictoryVoronoiContainer 
// } from "victory";
// import {  Bar } from 'react-chartjs-2';


const data = {
  labels: [],
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data:[]
    //data: [65, 59, 80, 81, 56, 55, 40]
  }]
};

class Dashboard extends PureComponent {

state={
    loading:true,
    play: true
}
componentWillMount(){
   this.props.getSystemStat()
   this.props.topProduct()
   this.setState({
     loading: false
   })

}
componentDidMount(){
    this.props.getSystemStat()
    this.props.topProduct()
    this.setState({
        loading:false
    }) 
}
        render() {
        const {stat, topFour, topProd} = this.props
      const { loading } = this.state;
      let barData =  ''

      if(topFour){
        barData = topFour
      }else {
        barData = data
      }
// let tip =topFour
// topFour.forEach(element => {
//    tip.push(element.menu_name)
// });
 
    if(loading) {
        // if your component doesn't have to wait for an async action, remove this block

      return (
           <Spin/>
      ); // render null when app is not ready
    }
    return (


<React.Fragment>
<Helmet>
       <title>Dashboard</title>
       <meta name="description" content="Dashboard" />
 </Helmet>
 <Suspense fallback={<PageLoading/>}>
<Row gutter={16}>
      <Col span={6}>
        <Card hoverable={true} style={{backgroundColor:'LightSeaGreen'}}>
            <Skeleton loading={loading}>
          <Statistic
            title="Total Users"
            value={stat.user}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="team" />}
          />
            </Skeleton>
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable={true} style={{backgroundColor:'SteelBlue'}}>
           <Skeleton loading={loading}>
          <Statistic
            title="Total Menu"
            value={stat.product}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="coffee"/>}

          />
          </Skeleton>
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable={true} style={{backgroundColor:'LightSkyBlue'}}>
           <Skeleton loading={loading}>
          <Statistic
            title="Supplier"
            value={stat.supplier}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="deployment-unit" />}

          />
          </Skeleton>
        </Card>
      </Col>
    <Col span={6}>
        <Card hoverable={true} style={{backgroundColor:'AntiqueWhite'}}>
           <Skeleton loading={loading}>
          <Statistic
            title="Shop"
            value={stat.shop}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="shop" />}

          />
          </Skeleton>
        </Card>
      </Col>
    </Row>
     </Suspense>
     <Row>

       <Col span={16}>
       {/* < Bar data = {
        barData
      }
       width = { 100 }
       height = { 50 }
       options = {
         {
           maintainAspectRatio: true
         }
       }
       />  */}
       
 

 
</Col>
<Col span={8}>
<div className="m-t-2">
<strong>Top 10 Menu</strong>
 
        </div>
  {topProd && topProd.length > 0 ? 
  <ul className="list">
 
{topProd && topProd.map((prod, key) => {
        return (
          <AnimateKeyframes
          play      
          duration={3}
          keyframes={["opacity: 0", "opacity: 1"]}
          iterationCount="infinite"
          key={shortId.generate()}
        >
            <li key={shortId.generate()}
                    value={prod.key}> {prod.menu_name} </li>
      </AnimateKeyframes>
        )
    }
)}
  </ul>
  :
  <AnimateKeyframes
          play
          duration={3}
          keyframes={["opacity: 0", "opacity: 1"]}
          iterationCount="infinite"
        >
          No sales yet
           </AnimateKeyframes>
        
        } 
 
  </Col>
     </Row>
    
</React.Fragment>

        )
        }
        }


        const mapStateToProps = (state)=> {
        return {
        stat: state.dashboard.stat,
        topProd: state.dashboard.topProd,
        topFour: state.dashboard.topFour,
        }
        }
        const mapDispatchToProps = (dispatch) => {
        return {
        getSystemStat: ()=> dispatch(actions.getSystemStat()),
        topProduct: ()=> dispatch(actions.topProduct()),
        }
        }

        export default
        connect(mapStateToProps, mapDispatchToProps)(Dashboard);
