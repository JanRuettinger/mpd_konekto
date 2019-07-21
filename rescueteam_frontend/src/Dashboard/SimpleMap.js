import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';


class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBZMmIuqK2ZfDRM6ffa01XiBMsY46jokiM' }}
          center={this.props.center}
          zoom={this.props.zoom}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text={this.props.name}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
