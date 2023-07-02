import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';

export function LotteryCounter() {
  return (
    <Card>
      <Card.Header className="text-uppercase text-center fw-bold">
        Lucky Draw In
      </Card.Header>
      <Card.Body className="py-4">
        <Row className="g-3">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, idx) => (
            <Col
              key={idx}
              md={3}
              className="d-flex flex-column align-items-center"
            >
              <p className="h2 fw-bold m-0">10</p>
              {unit}
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

LotteryCounter.propTypes = {};
