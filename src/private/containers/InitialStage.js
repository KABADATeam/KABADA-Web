import React, {Component} from 'react';
import {Grid, Form, Dropdown} from 'semantic-ui-react';
//import ReactMapGL, {Marker} from 'react-map-gl';
//import Map from '../components/Map';
import axios from 'axios';
//import uuid from 'react-uuid'

const JSON = [
    {key: 1, value: 'Arvydas Sabonis', text: 'Arvydas Sabonis'},
    {key: 2, value: 'Domantas Sabonis', text: 'Domantas Sabonis'},
    {key: 3, value: 'Jonas Valanciunas', text: 'Jonas Valanciunas'},
    {key: 4, value: 'Saras', text: 'Saras'}
]
class InitialStage extends Component {
    constructor(props){
        super(props)
            this.state = {
                countries: [], 
                industries: [],
                activities: [],
                industrySelectedValue: null
            }
    }
    componentDidMount() {
        axios.get('https://localhost:5001/api/countries/all')
          .then(res => {
            const countries = res.data;
            this.setState({ countries });
          })
        axios.get('https://localhost:5001/api/NACE/industry/all')
          .then(res => {
            const industries = res.data;
            this.setState({ industries });
          })  
        axios.get('https://localhost:5001/api/NACE/activity/all/')
          .then(res => {
            const activities = res.data;
            this.setState({ activities });
          })       
      }
    
      handleChangeActivities = async (event, data) =>{
        console.log(data.value);
        this.setState({industrySelectedValue: data.value}) 
        const url = `https://localhost:5001/api/NACE/activity/all/${data.value}`
        await axios.get(url)
        .then(res => {
          const activities = res.data;
          this.setState({ activities });
        })  
    }

      
    render()
        {
            const countries = this.state.countries.map(({id, countryName}) => ({key: id, value: countryName, text: countryName}))
            const industries = this.state.industries.map(({id, code, title }) => ({key: id, value: code, text: title}));
            const activities = this.state.activities.map(({ id, code, title }) => ({key: id, value: code, text: title}));
            return(
                <Grid divide='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Name of Business Plan</label>
                                    <input placeholder='Name of Business Plan'/>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <label>Select Industry</label>
                            <Dropdown
                                placeholder='Select Industry '
                                fluid
                                search
                                selection
                                value={this.state.industrySelectedValue}
                                options={industries}
                                onChange={this.handleChangeActivities}
                            />
                            <label>Select NACE clasification</label>
                            <Dropdown
                                placeholder='Select NACE clasification'
                                fluid
                                search
                                selection
                                options={activities}
                            />
                            <label>Select country</label>
                            <Dropdown
                                placeholder='Country '
                                fluid
                                search
                                selection
                                options={countries}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            
                        </Grid.Column>
                        <Grid.Column>
                            
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            )
        }
}


export default InitialStage;