import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MapComponent extends Component {
  state = {
    lat: -34.61053,
    lng: -58.37175,
    zoom: 13,
  }
  road = [L.latLng(-34.61053, -58.37175), L.latLng(-34.61053, -58.37175)]
  map = React.createRef();
  defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.map}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.road.map((point, index) => <Marker key={index} icon={this.defaultIcon} position={point} />)}
        <RoutingMachine
          color="#000"
          map={this.map}
          road={this.road}
        />
      </Map>
    )
  }
}

export default MapComponent;