import React from 'react';
import {Grid } from 'semantic-ui-react';
import Chart from '../components/Chart';
import ChartLoader from '../components/Loader'
import {getEurostatData} from '../../appStore/actions/eurostat/eurostatAction'
import { connect } from 'react-redux';

class RiskAnalysis extends React.Component {
   /* constructor(props){
        super(props)
        this.state = {
            active : null
        }
    }
    componentDidMount(){
        this.setState({active: true})
        setTimeout(() => {
            this.setState({active: false})
        },2000)
    }*/
    //{this.props.loading === true ? <ChartLoader active={this.props.loading}/> : <Chart data={this.props.eurostatData}/> }
    //<ChartLoader active={this.props.loading}/>
    //<Chart data={this.props.eurostatData}/>
    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>Risk analysis</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
                        <Grid.Row columns={1}>
                            <Grid.Column style={{ overflow: "hidden" }}>
                                <ChartLoader active={this.props.loading}/>
                                <Chart data={this.props.eurostatData}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>     
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eurostatData: state.eurostatData,
        loading: state.loading,
    };
}

export default connect(mapStateToProps, { getEurostatData })(RiskAnalysis);