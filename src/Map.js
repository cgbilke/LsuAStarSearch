import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
// function genMap(props) {
//   console.log(`m[${props.key}] = ${props.value}`);
// }


export class MapObj extends Component {
  constructor(props) {
    super(props);
    // this.genMap = this.genMap.bind(this);
    this.path = {
      coords: [{lat: 30.4133, lng: -91.1800},
      {lat: 30.4120, lng: -91.1700},
      {lat: 30.4120, lng: -91.1750}]
    }
  }

  displayMarkers = () => {
    return this.path.coords.map((path, index) => {
      return <Marker key={index} id={index} position={{
        lat: path.lat,
        lng: path.lng
      }}
      onClick={() => console.log("You clicked me!")} />
    })
  }
  // showMap() {
  //
  // }


  render() {
    const style = {
      width: '80vw',
      height: '60vh',
      margin: '5vh 10vw'
    }
    return (
      <Map
        google={this.props.google}
        style={style}
        zoom={15}
        initialCenter={{lat: 30.4133, lng: -91.1800}}
        >
        {this.displayMarkers()}
        </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDIjGYB6wbN-wgJIsYCT5GRr8hMEc2PgJk'
})(MapObj);
