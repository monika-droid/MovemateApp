import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/styles.css';

const Banner = ({ onGetQuotation }) => (
  <div className="banner text-center">
    <h2>Get Your Moving Quotation Now!</h2>
    <Button variant="primary" onClick={onGetQuotation}>
      Get Quotation
    </Button>
  </div>
);

export default Banner;
