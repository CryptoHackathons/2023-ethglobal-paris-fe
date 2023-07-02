import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';

function LotteryReward() {
  return (
    <Card>
      <Row className="g-0">
        <Col sm={4} className="position-relative">
          <Card.Img
            src="https://dummyimage.com/300x300/d9d9d9/000000&text=reward"
            className="object-fit-cover w-100 h-100 rounded-end-0"
          />
        </Col>
        <Col sm={8} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title className="fw-bold">Prize A</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit ametd
              <br />
              Quantity: 1
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

LotteryReward.propTypes = {};

export default LotteryReward;
