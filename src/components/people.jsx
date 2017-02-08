import React, { Component } from 'react';
import { Grid, Panel } from 'react-bootstrap';
import GoogleMap from 'google-map-react'; // https://github.com/istarkov/google-map-react
import Loader from './loader';
import PersonMarker from './person-marker';
import { getBroadcasts } from '../modules/firebase';

import '../styling/people.css';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      broadcasts: null,
      currentLocation: null,
    };
  }

  componentDidMount() {
    /*
    first get the list of broadcasts..
    then get the user's current location.
    */
    const updateBroadasts = (broadcasts) => {
      const people = [];
      for (let [uid, broadcast] of Object.entries(broadcasts)) {
        const aBroadcast = broadcast;
        aBroadcast.uid = uid;
        people.push(aBroadcast);
      }

      this.setState({broadcasts: people });

      navigator.geolocation.getCurrentPosition((location) => {
        this.setState({ currentLocation: location });
      });
    };

    getBroadcasts(updateBroadasts);
  }

  render() {
    let content;

    if (!this.state.broadcasts) {
      content = <Loader loaderStatus='Loading broadcasts' />;
    } else if (!this.state.currentLocation) {
      content = <Loader loaderStatus='Working out where you are' />;
    }
    else {
      const panelTitle = <h4>Total broadcasts: {this.state.broadcasts.length}</h4>;

      content = (
        <Panel header={panelTitle} className="map">
          <GoogleMap
            bootstrapURLKeys={{ key: "AIzaSyApt0vS9E9QJpjPfUFQp8Nyztq80HQml8A" }}
            defaultCenter={{lat: this.state.currentLocation.coords.latitude, lng: this.state.currentLocation.coords.longitude}}
            defaultZoom={14}
          >
            { this.state.broadcasts.map(broadcast => <PersonMarker text={broadcast.name} lat={broadcast.coordinates.latitude} lng={broadcast.coordinates.longitude} key={broadcast.uid} /> )}
          </GoogleMap>
        </Panel>
        );
      }

      return (
        <Grid className="people">
          { content }
        </Grid>
      );
    }
  }

  export default People;
