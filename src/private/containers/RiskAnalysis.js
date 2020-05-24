import React from 'react';
import {Grid, Form, Button } from 'semantic-ui-react';
import Chart from '../components/Chart';
import {getEurostatData} from '../../appStore/actions/eurostat/eurostatAction'
import { connect } from 'react-redux';

class RiskAnalysis extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>Risk analysis</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
                        <Grid.Row columns={2}>
                            <Grid.Column width={8} style={{ overflow: "hidden" }}>
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
    };
}

export default connect(mapStateToProps, { getEurostatData })(RiskAnalysis);