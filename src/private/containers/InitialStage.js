import React, {Component} from 'react';
import {Grid, Form, Dropdown, Button, Label, Input, Icon } from 'semantic-ui-react';
import Map from '../components/Map';
import { connect } from 'react-redux';
import { getIndustries, getActivities, selectActivity, selectIndustry } from '../../appStore/actions/naceActions';
import {getCountries,selectCountry} from  '../../appStore/actions/countriesActions';
import {getEurostatData} from '../../appStore/actions/eurostat/eurostatAction'
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import '../../css/Dropdown.css';
class InitialStage extends Component {

    componentDidMount() {  
        this.props.getCountries(this.props.language);
        this.props.getIndustries(this.props.language);
    }
    
      handleChangeIndustry = (event, data) =>{
        this.props.getActivities(this.props.language, data.value);
        this.props.selectIndustry(data.value);
    }
    handleChangeActivity = async (event, data) =>{
        this.props.selectActivity(data.value);
    } 
    handleChangeCountry = async (event, data) =>{
        this.props.selectCountry(data.value);
    } 
    
    
    test() {
        console.log(this.props.selectedIndustry)
        console.log(this.props.selectedActivity)
        console.log(this.props.selectedCountry)
    }
      
    render() {
        const countries = this.props.countries.map(({id, countryName}) => ({key: uuid(), value: countryName, text: countryName}))
<<<<<<< HEAD
        const industries = this.props.industries.map(({id, code, title }) => ({key: id, value: code, text: code + ' ' + title}));
        const activities = this.props.activities.map(({ id, code, title }) => ({key: id, value: code, text: code + ' ' + title}));
=======
        const industries = this.props.industries.map(({id, code, title }) => ({key: id, value: code, text: 
            <div >
            <div className='row'>{code}</div>
            <div className='rows'>{title}</div>
            </div>}));
        const activities = this.props.activities.map(({ id, code, title }) => ({key: id, value: code, text:
        <div >
            <div className='row'>{code}</div>
            <div className='rows'>{title}</div>
        </div>}));
        console.log(this.props);
>>>>>>> 3493e52cb63aa775c1511de4091bd33112cffe47
        return(
            <div style={{ textAlign: "center"}}>
                <div style={{ width: "70%", margin: "0 auto", textAlign: "left" }}>
                    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                        <h2>New business plan creation</h2>
                    </div>
                    <Grid style={{ marginTop: "3vh"}}>
                        <Grid.Row columns={2}>
                            <Grid.Column width={8}>
                                <Form textAlign="left">
                                    <Form.Field>
                                        <Label pointing='below' size={"large"}>Name of Business Plan</Label>
                                        <Input focus placeholder='Name of Business Plan' fluid />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label pointing='below' size={"large"}>Select Industry</Label>
                                        <Dropdown
                                            placeholder='Select Industry '
                                            fluid
                                            search
                                            selection
                                            options={industries}
                                            onChange={this.handleChangeIndustry}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label pointing='below' size={"large"}>Select NACE clasification</Label>
                                        <Dropdown
                                            placeholder='Select NACE clasification'
                                            fluid
                                            search
                                            selection
                                            onChange={this.handleChangeActivity}
                                            options={activities}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Label pointing='below' size={"large"}>Select country</Label>
                                        <Dropdown
                                            placeholder='Country '
                                            fluid
                                            search
                                            selection
                                            options={countries}
                                            onChange={this.handleChangeCountry}
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={8} style={{ overflow: "hidden" }}>
                                
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column textAlign="right">
                                <Button style={{ marginTop: "3vh"}} 
                                        icon labelPosition='right'
                                        as={Link} to='riskAnalysis'
                                        onClick={this.test.bind(this)}
                                >
                                    Next
                                    <Icon name='right arrow' />
                                </Button>
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
        activities: state.activities,
        eurostatData: state.eurostatData,
        industries: state.industries,
        language: state.language,
        countries: state.countries,
        selectedActivity: state.selectedActivity,
        selectedCountry: state.selectedCountry,
        selectedIndustry: state.selectedIndustry
    };
}

export default connect(mapStateToProps, { getActivities, getIndustries, getCountries, selectCountry, selectActivity, selectIndustry, getEurostatData })(InitialStage);