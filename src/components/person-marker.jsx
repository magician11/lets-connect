import React, { Component } from 'react';
import { Modal, Image } from 'react-bootstrap';
import moment from 'moment';

import '../styling/person-marker.css';

class PersonMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({showModal: true});
  }

  hideModal() {
    this.setState({showModal: false});
  }

  render() {
    const { broadcast } = this.props;
    const firstname = broadcast.name.split(' ')[0];

    return (
      <div className="person-marker" onClick={this.showModal}>
        {broadcast.name}

        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
          dialogClassName="person-details"
        >
          <Modal.Header closeButton>
            <Modal.Title id="person-name">{ broadcast.name }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={ broadcast.photo } thumbnail />
            <h5>Reason for wanting to connect</h5>
            <p>{ broadcast.reason }</p>
            <h5>About { firstname }</h5>
            <p>{ broadcast.bio }</p>
            <h5>How to find { firstname }</h5>
            <p>{ broadcast.locationDescription }</p>
            <h5>{ firstname } will be here until</h5>
            <p>{ moment(broadcast.sentAt).add(broadcast.duration.split(' ')[0], 'hours').format('h:mmA (dddd Do MMM YYYY)') }</p>
          </Modal.Body>
        </Modal>
      </div>
      );
    }
  }

  export default PersonMarker;
