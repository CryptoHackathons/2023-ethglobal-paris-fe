import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import LotteryAttendee from './LotteryAttendee';

function LotteryAttendeeList({ attendees }) {
  return (
    <Row className="g-4">
      {attendees.map((at, idx) => (
        <Col key={idx} md={3}>
          <LotteryAttendee attendee={at} />
        </Col>
      ))}
    </Row>
  );
}

LotteryAttendeeList.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      walletAddr: PropTypes.string.isRequired,
      thumbnailURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default LotteryAttendeeList;
