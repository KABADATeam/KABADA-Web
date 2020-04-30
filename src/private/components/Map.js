import React, {Component} from 'react';
import {GridColumn} from 'semantic-ui-react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends Component {
    constructor(props) {
        super(props);
          this.state = {
            viewport: {
              width: "40vw",
              height: "35vh",
              latitude: 0,
              longitude: 0,
              zoom: 16
            },
            userLocation: { }
          }
      }
      componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "40vh",
                width: "35vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12
            }
            this.setState({
                viewport: newViewport
            })
      })
    }

      setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            };
            let newViewport = {
                height: "40vh",
                width: "35vw",
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
    render() {
        return (
            <GridColumn>
                            <ReactMapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/outdoors-v11"
                            onViewportChange={(viewport=> this.setState({viewport}))}
                            mapboxApiAccessToken="pk.eyJ1IjoianVzdGluYXMiLCJhIjoiY2s5bWNsczExMDM5ZTNlcDlvbHl5ZXY0aSJ9.L4-k6fuXGbaUcoQCKDEqZQ">
                                <Marker
                                latitude={this.state.viewport.latitude}
                                longitude={this.state.viewport.longitude}
                                >
                                    <div>I'm here now</div>
                            </Marker>

                            </ReactMapGL>
                        </GridColumn>
        )
    }
}

export default Map;