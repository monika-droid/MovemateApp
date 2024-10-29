import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../styles/styles.css';

const AboutCards = () => (
  <Row className="my-4">
    {['Trusted Movers', 'Affordable Prices', '24/7 Support'].map((title, index) => (
      <Col md={4} key={index}>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {title === 'Trusted Movers'
                ? 'Our movers are verified and trusted by thousands of users.'
                : title === 'Affordable Prices'
                ? 'We offer the best moving services at the most competitive prices.'
                : 'Our team is available around the clock to assist you.'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default AboutCards;
