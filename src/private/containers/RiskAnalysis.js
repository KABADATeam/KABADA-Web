import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import Chart from '../components/Chart';
import { getEurostatData } from '../../appStore/actions/eurostat/eurostatAction';
import { getEurostatAllData } from '../../appStore/actions/eurostat/eurostatAllAction'
import { connect } from 'react-redux';
import uuid from 'react-uuid';

class RiskAnalysis extends React.Component {

    componentDidMount(){
        this.props.getEurostatData()
        this.props.getEurostatAllData()
    }

    compare(a, b) {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
    }

    render() {
        

        if (this.props.loading === true) {
            return (
                <div style={{ textAlign: "center"}}>
                    <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
                        <Loader active>Receiving data from Eurostat...</Loader>
                    </div>
                </div>
            )
        } else {
            const diagrams = this.props.eurostatData.sort(this.compare).map(diagramData =>
                <Grid.Row columns={1} key={uuid()}>
                    <Grid.Column textAlign='center'>
                        <Chart data={diagramData.data}/>
                    </Grid.Column>
                </Grid.Row>
            );

            const euroDiagrams = this.props.eurostatAllData.sort(this.compare).map(diagramData =>
                <Grid.Row columns={1} key={uuid()}>
                    <Grid.Column textAlign='center'>
                        <Chart data={diagramData.data}/>
                    </Grid.Column>
                </Grid.Row>
            );

            return (
                <div style={{ textAlign: "center"}}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "left" }}>
                        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                            <h2>Eurostat data</h2>
                        </div>
                        <Grid style={{ marginTop: "3vh"}}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8} textAlign='center'>
                                    <h2>{this.props.selectedCountry.title}</h2>
                                </Grid.Column>
                                <Grid.Column width={8} textAlign='center'>
                                    <h2>European Union</h2>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8} textAlign='center'>
                                    <Grid>
                                        {diagrams}
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={8} textAlign='center'>
                                    <Grid>
                                        {euroDiagrams}
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            
                        </Grid>     
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        selectedCountry: state.selectedCountry,
        selectedActivity: state.selectedActivity,
        eurostatData: state.eurostatData,
        eurostatAllData: state.eurostatAllData
    };
}

export default connect(mapStateToProps, { getEurostatData, getEurostatAllData })(RiskAnalysis);
