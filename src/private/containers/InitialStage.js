import React, {Component} from 'react';
import {Grid, Form, Dropdown, Button, Label, Input, Icon } from 'semantic-ui-react';
import Map from '../components/Map';
import { connect } from 'react-redux';
import { getIndustries, getActivities } from '../../appStore/actions/naceActions';
import {getCountries,changeCountry} from  '../../appStore/actions/countriesActions';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

class InitialStage extends Component {
    constructor(props){
        super(props)
            this.state = {
                countries: [], 
                activities: [],
                industrySelectedValue: null,
                countrySelectedValue: null,
                latitude: 0,
                longitude: 0
            }
    }
    componentDidMount() {  
        this.props.getCountries(this.props.language);
        this.props.getIndustries(this.props.language);
    }
    
      handleChangeIndustry = (event, data) =>{
        //console.log(data.value);
        //this.setState({industrySelectedValue: data.value}) 
        //const url = `https://localhost:5001/api/NACE/activity/all/${data.value}`
        //await axios.get(url)
        //.then(res => {
        //  const activities = res.data;
        //  this.setState({ activities });
        //})  

        this.props.getActivities(this.props.language, data.value);
    }

    handleChangeCountry = async (event, data) =>{
        this.props.changeCountry(data.value);
    } 
    

      
    render() {
        const countries = this.props.countries.map(({id, countryName}) => ({key: uuid(), value: countryName, text: countryName}))
        const industries = this.props.industries.map(({id, code, title }) => ({key: id, value: code, text: code + ' ' + title}));
        const activities = this.props.activities.map(({ id, code, title }) => ({key: id, value: code, text: code + ' ' + title}));
        console.log(this.props);
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
                                <Map latitude={this.state.latitude} longitude={this.state.longitude}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column textAlign="right">
                                <Button style={{ marginTop: "3vh"}} icon labelPosition='right' as={Link} to='riskAnalysis'>
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
        industries: state.industries,
        language: state.language,
        countries: state.countries,
        selectedCountry:state.selectedCountry
    };
}

export default connect(mapStateToProps, { getActivities, getIndustries,getCountries,changeCountry })(InitialStage);