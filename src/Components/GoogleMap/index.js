import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


const MapComponent = compose(
  withProps({
    //googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyw0xtlbcJiaRUDB3bNWbkcW2IJWprrbc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap  //19.4584778, lng: -70.6732376
    defaultZoom={18}
    center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class FancyComponent extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
        isMarkerShown: false,
        lat: null,
        lng: null,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.delayedShowMarker()
    geocodeByAddress(this.props.childProps.state.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ 
          lat: latLng.lat,
          lng: latLng.lng
         });
      })
      .catch(error => console.error('Error', error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {

    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        lat={this.state.lat}
        lng={this.state.lng}      />
    )
  }
}

export default FancyComponent;