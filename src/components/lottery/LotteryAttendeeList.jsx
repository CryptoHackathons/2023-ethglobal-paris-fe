import React from 'react';
// import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import LotteryAttendee from './LotteryAttendee';

export function LotteryAttendeeList() {
  return (
    <Row className="g-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
        <Col key={idx} md={3}>
          <LotteryAttendee userName={`User ${idx}`} />
        </Col>
      ))}
    </Row>
  );
}

LotteryAttendeeList.propTypes = {};
