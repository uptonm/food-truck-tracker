import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import '../assets/styles/foodTruck.css';

class FoodTruck extends Component {
  state = {
    truck: {}
  };

  componentDidMount = async () => {
    const truck = await axios.get(
      `http://localhost:8000/api/search/${this.props.match.params.id}`
    );
    this.setState({ ...this.state, truck: truck.data });
  };

  renderMap() {
    if (this.state.truck.location) {
      return (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={{
            lat: this.state.truck.location.coordinates[0],
            lng: this.state.truck.location.coordinates[1]
          }}
          defaultZoom={15}
        >
          <AnyReactComponent
            lat={this.state.truck.location.coordinates[0]}
            lng={this.state.truck.location.coordinates[1]}
            text={this.state.truck.name}
          />
        </GoogleMapReact>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }

  renderInfo() {
    if (this.state.truck.location) {
      return (
        <div className="info-container">
          <h1>{this.state.truck.name}</h1>
          <h3>{this.state.truck.type}</h3>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }

  render() {
    return (
      <div className="panel-container">
        <div className="panel info">{this.renderInfo()}</div>
        <div className="panel" style={{ height: '80vh', width: '80%' }}>
          {this.renderMap()}
        </div>
      </div>
    );
  }
}

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '25px 15px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {text}
  </div>
);

export default FoodTruck;
