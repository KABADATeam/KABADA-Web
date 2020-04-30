import React, {Component} from 'react';
import {Grid, Form, Dropdown} from 'semantic-ui-react';
//import ReactMapGL, {Marker} from 'react-map-gl';
import Map from '../components/Map';
import axios from 'axios';
import uuid from 'react-uuid'

const JSON = [
    {key: 1, value: 'Arvydas Sabonis', text: 'Arvydas Sabonis'},
    {key: 2, value: 'Domantas Sabonis', text: 'Domantas Sabonis'},
    {key: 3, value: 'Jonas Valanciunas', text: 'Jonas Valanciunas'},
    {key: 4, value: 'Saras', text: 'Saras'}
]
class InitialStage extends Component {
    state = {
        persons: [],
        countries: []
    }
    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
          .then(res => {
            const countries = res.data;
            this.setState({ countries });
          })
      }
      setCountry = () => {
          let salis = navigator.language
          console.log(salis);

      }
    
 /*   async findCountry() {
        const response = await axios.get('https://restcountries.eu/rest/v2/all')
            this.setState({countries: response.data.results })
            console.log(response.data.results);
    }*/
    render()
        {
            const options = this.state.countries.map(({name}) => ({key: uuid(), value: name, text: name}))
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
                                options={JSON}
                            />
                            <label>Select NACE clasification</label>
                            <Dropdown
                                placeholder='Select NACE clasification'
                                fluid
                                search
                                selection
                                options={JSON}
                            />
                            <label>Select country</label>
                            <Dropdown
                                placeholder='Country '
                                fluid
                                search
                                selection
                                options={options}
                                onChange={this.setCountry}
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