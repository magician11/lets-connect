import React from 'react';

import '../styling/person-marker.css';

const PersonMarker = props => {
  return (
    <div className="person-marker">{props.text}</div>
  );
}

export default PersonMarker;
