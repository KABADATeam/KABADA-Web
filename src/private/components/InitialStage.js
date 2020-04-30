import React, {Component} from 'react';
import {Grid, GridColumn, Form, Dropdown} from 'semantic-ui-react';
import ReactMapGL, {Marker} from 'react-map-gl';

const JSON = [
    {key: 1, value: 'Arvydas Sabonis', text: 'Arvydas Sabonis'},
    {key: 2, value: 'Domantas Sabonis', text: 'Domantas Sabonis'},
    {key: 3, value: 'Jonas Valanciunas', text: 'Jonas Valanciunas'},
    {key: 4, value: 'Saras', text: 'Saras'}
]
class InitialStage extends Component {
    constructor(props) {
        super(props);
          this.state = {
            viewport: {
              width: "10vw",
              height: "10vh",
              latitude: 42.430472,
              longitude: -123.334102,
              zoom: 16
            },
            userLocation: { }
          }
      }
      setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            };
            let newViewport = {
                height: "100vh",
                width: "100vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12
            }
            this.setState({
                viewport: newViewport,
                userLocation: setUserLocation
            })
        })
    }
    render()
        {
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
                                options={JSON}
                            />
                        </Grid.Column>
                        <GridColumn>
                            <button onClick={this.setUserLocation}>My location</button>
                            <ReactMapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/outdoors-v11"
                            onViewportChange={(viewport=> this.setState({viewport}))}
                            mapboxApiAccessToken="pk.eyJ1IjoianVzdGluYXMiLCJhIjoiY2s5bWNsczExMDM5ZTNlcDlvbHl5ZXY0aSJ9.L4-k6fuXGbaUcoQCKDEqZQ">
                            {Object.keys(this.state.userLocation).length !==0 ? (
                                <Marker
                                latitude={this.state.viewport.latitude}
                                longitude={this.state.viewport.longitude}
                                >
                                    <div>I'm here</div>
                            </Marker>
                            ) : (
                                <div>empty</div>
                            )}
                            </ReactMapGL>
                        </GridColumn>
                    </Grid.Row>

                </Grid>
            )
        }
}


export default InitialStage;