import React from 'react';
import { Grid, Container, Loader } from 'semantic-ui-react';
import Chart from '../components/Chart';
import ChartLoader from '../components/Loader'
import { getEurostatData } from '../../appStore/actions/eurostat/eurostatAction';
import { getEurostatAllData } from '../../appStore/actions/eurostat/eurostatAllAction'
import { connect } from 'react-redux';

class RiskAnalysis extends React.Component {

    componentDidMount(){
        this.props.getEurostatData()
        this.props.getEurostatAllData()
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
            console.log(this.props.eurostatData);
            const diagrams = this.props.eurostatData.map(diagramData =>
                <Grid.Row columns={1} key={new Date().getMilliseconds()}>
                    <Grid.Column textAlign='center'>
                        <Chart data={diagramData}/>
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
                            {diagrams}
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
