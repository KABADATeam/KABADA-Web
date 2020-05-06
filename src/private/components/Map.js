import React, {Component} from 'react';
import {GridColumn} from 'semantic-ui-react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
          this.state = {
            viewport: {
              width: "100vw",
              height: "100vh",
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              zoom: 16
            }
          }
      }
      componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "30vh",
                width: "22.5vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12
            }
            this.setState({
                viewport: newViewport
            })
      })
    }
    handleViewportChange = viewport => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        })
      } 

    render() {
        console.log(this.props)
        return (
            <GridColumn>
              <ReactMapGL {...this.state.viewport} 
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={this.handleViewportChange
                }
                mapboxApiAccessToken="pk.eyJ1IjoianVzdGluYXMiLCJhIjoiY2s5bWNsczExMDM5ZTNlcDlvbHl5ZXY0aSJ9.L4-k6fuXGbaUcoQCKDEqZQ">
                <Marker
                  latitude={this.state.viewport.latitude}
                  longitude={this.state.viewport.longitude}
                >
                  <i className="map marker icon"></i>
                </Marker>

              </ReactMapGL>
            </GridColumn>
        )
    }
}

export default Map;