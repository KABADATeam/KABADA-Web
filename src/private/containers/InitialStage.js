import React, {Component} from 'react';
import {Grid, Form, Dropdown, Button, Label, Input, SegmentInline, GridColumn, Container} from 'semantic-ui-react';
//import ReactMapGL, {Marker} from 'react-map-gl';
import Map from '../components/Map';
import axios from 'axios';
//import uuid from 'react-uuid'


class InitialStage extends Component {
    constructor(props){
        super(props)
            this.state = {
                countries: [], 
                industries: [],
                activities: [],
                industrySelectedValue: null,
                countrySelectedValue: null,
                latitude: 0,
                longitude: 0
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

    handleChangeCountry = async (event, data) =>{
        console.log(data.value);
        this.setState({countrySelectedValue: data.value}) 
        const urlLatitude = `https://localhost:5001/api/countries/latitude/${data.value}`
        const urlLongitude = `https://localhost:5001/api/countries/longitude/${data.value}`
        await axios.get(urlLatitude)
        .then(res => {
          const newlatitude = res.data;
          this.setState({ latitude: newlatitude
        });
        })
        console.log(this.state.latitude); 

        await axios.get(urlLongitude)
        .then(res => {
          const newlongitude = res.data;
          this.setState({ longitude: newlongitude
        });
        })
        console.log(this.state.longitude); 
    }

      
    render()
        {
            const countries = this.state.countries.map(({id, countryName}) => ({key: id, value: countryName, text: countryName}))
            const industries = this.state.industries.map(({id, code, title }) => ({key: id, value: code, text: title}));
            const activities = this.state.activities.map(({ id, code, title }) => ({key: id, value: code, text: title}));
            return(
                <div>
                    <Container>
                        <Grid style={{height: '80vh', width: '80vw'}}>
                            <Grid.Row style={{height: '10vh', width: '800vw'}}>
                                <Grid.Column width={8} >
                                    <Form>
                                        <Form.Field>
                                            <SegmentInline>
                                            <Label pointing='below' size={"large"}>Name of Business Plan</Label>
                                            <Input focus placeholder='Name of Business Plan' />
                                            </SegmentInline>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                               
                            </Grid.Row>

                            <Grid.Row centered style={{height: '60vh', width: '40vw'}}>
                                <Grid.Column width={8} style={{justifyContent: 'space-between'}}>

                                    <SegmentInline>
                                        <Label pointing='below' size={"large"}>Select Industry</Label>
                                        <Dropdown
                                            placeholder='Select Industry '
                                            fluid
                                            search
                                            selection
                                            value={this.state.industrySelectedValue}
                                            options={industries}
                                            onChange={this.handleChangeActivities}
                                        />
                                    </SegmentInline>

                                    <SegmentInline>
                                        <Label pointing='below' size={"large"}>Select NACE clasification</Label>
                                        <Dropdown
                                            placeholder='Select NACE clasification'
                                            fluid
                                            search
                                            selection
                                            options={activities}
                                        />
                                    </SegmentInline>

                                    <SegmentInline>
                                        <Label pointing='below' size={"large"}>Select country</Label>
                                        <Dropdown
                                            placeholder='Country '
                                            fluid
                                            search
                                            selection
                                            value={this.state.countrySelectedValue}
                                            options={countries}
                                            onChange={this.handleChangeCountry}
                                        />
                                    </SegmentInline>

                                    <SegmentInline>
                                        <Button size='medium'>Next</Button>
                                    </SegmentInline>
                                                    
                                </Grid.Column>
                                <Grid.Column style={{ width: '40vw'}}>
                                    <Map latitude={this.state.latitude} longitude={this.state.longitude}/>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Container>
                </div>
                
            )
        }
}


export default InitialStage;