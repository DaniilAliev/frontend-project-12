import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerLoading = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default SpinnerLoading;
