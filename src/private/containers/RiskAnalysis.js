import React from 'react';
import {Grid, Container } from 'semantic-ui-react';
import Chart from '../components/Chart';
import ChartLoader from '../components/Loader'
import { selectActivity, selectActivityForEurostat } from '../../appStore/actions/naceActions';
import { selectCountry} from '../../appStore/actions/countriesActions'
import {getEurostatDataEnterprisesNumber, getEurostatDataProductionValue, getEurostatDataPersonnelCosts} from '../../appStore/actions/eurostat/eurostatAction'
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
    componentDidMount(){
        var selectedCountryObject = Object.getOwnPropertyDescriptors(this.props.selectedCountry)
        var selectedCountry = selectedCountryObject.shortCode.value
        var selectedActivityObject = Object.getOwnPropertyDescriptors(this.props.selectedActivity)
        var naceValue = selectedActivityObject.code.value
        var naceValueWithOutDots = naceValue.split(".")
        naceValueWithOutDots.splice(2,1)
        const selectedActivity = naceValueWithOutDots.join("")
        this.props.getEurostatDataEnterprisesNumber(selectedCountry, selectedActivity)
        this.props.getEurostatDataProductionValue(selectedCountry, selectedActivity)
        this.props.getEurostatDataPersonnelCosts(selectedCountry, selectedActivity)
    }

    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "80%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>Risk analysis</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
                        <Grid.Row columns={2}>
                            <Grid.Column style={{ overflow: "hidden" }}>
                                <Container textAlign='center'>Enterprises - number</Container>
                                <ChartLoader active={this.props.loading}/>
                                <Chart data={this.props.eurostatDataProduction}/>
                            </Grid.Column>
                            <Grid.Column style={{ overflow: "hidden" }}>
                                <Container textAlign='center'>Production value</Container>
                                <ChartLoader active={this.props.loading}/>
                                <Chart data={this.props.eurostatDataProduction}/>
                            </Grid.Column>
                            <Grid.Column style={{ overflow: "hidden" }}>
                                <Container textAlign='center'>Personnel costs</Container>
                                <ChartLoader active={this.props.loading}/>
                                <Chart data={this.props.eurostatDataPersonnel}/>
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
        eurostatDataEnterprises: state.eurostatData,
        eurostatDataProduction: state.eurostatData2,
        eurostatDataPersonnel: state.eurostatDataPersonnel,
        loading: state.loading,
        selectedActivity: state.selectedActivity,
        selectedCountry: state.selectedCountry,
        selectedActivityForEurostat: state.selectedActivityForEurostat
    };
}

export default connect(mapStateToProps, 
    { 
        getEurostatDataEnterprisesNumber,
        getEurostatDataProductionValue,
        getEurostatDataPersonnelCosts,
        selectActivity,
        selectCountry,
        selectActivityForEurostat 
    })
    (RiskAnalysis);