import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../styles/styles.css';

const MoversList = ({ movers, onBook }) => (
  <Row>
    {movers.map((mover) => (
      <Col md={4} key={mover.id}>
        <Card>
          <Card.Img variant="top" src={mover.image} />
          <Card.Body>
            <Card.Title>{mover.name}</Card.Title>
            <Card.Text>
              Location: {mover.location} <br />
              Available: {mover.time}
            </Card.Text>
            <Button variant="success" onClick={() => onBook(mover.id)}>
              Book Now
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default MoversList;
