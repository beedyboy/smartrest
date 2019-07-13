/**
 * Created by wawooh on 4/25/19.
 */
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
 import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip, 
  VictoryLabel,
  VictoryVoronoiContainer 
} from "victory";


class Dashboard extends PureComponent {

state={
    loading:true,
    play: true
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
let tip = []
topFour.forEach(element => {
   tip.push(element.menu_name)
});

            //console.log(element.menu_name)
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
       
       <VictoryChart 
        theme={VictoryTheme.material}
         domainPadding={30}  
          containerComponent={<VictoryVoronoiContainer />}
           animate={{ duration: 2000, easing: "bounce" }} >
     <VictoryLabel x={150} y={20}
  text={["Top 4 Menu Items"]} verticalAnchor="middle" textAnchor="end"
  style={[{ fill: '#000' }, { fill: '#6128ff' }]}
  lineHeight={[1.22, 2, 3, 1]} 
/>
 
  <VictoryBar
    cornerRadius={{ topLeft: (d) => d.sold * 4 }}
    style={{ data: { fill: "SpringGreen " } }}
    data={topFour}
    x="key"
    y="sold" labelComponent={<VictoryTooltip cornerRadius={0} />}
    animate={{
      onExit: {
        duration: 500,
        before: () => ({
          _y: 0,
          fill: "orange",
          label: "BYE"
        })
      }
    }}
  />
</VictoryChart>

 
</Col>
<Col span={8}>
<div className="m-t-2">
<strong>Top 10 Menu</strong>
 
        </div>
  {topProd.length > 0 ? 
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
     {/* <VictoryPie  colorScale={["#008f68", "#6DB65B", "#4AAE9B", "#EFBB35"]}
  data={[
    { x: "lizard", y: 1234 },
    { x: "snake", y: 2048 },
    { x: "goat", y: 1348 },
    { x: "crocodile", y: 2600 },
    { x: "alligator", y: 9000 },
  ]}
/>  */}
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
