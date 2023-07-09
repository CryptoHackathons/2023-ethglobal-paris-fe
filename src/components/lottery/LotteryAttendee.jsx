import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

function LotteryAttendee({ attendee }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column align-items-center gap-3">
          <Image roundedCircle width={64} src={attendee.thumbnailURL} />
          <p className="fw-bold m-0 w-100">{attendee.walletAddr}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

LotteryAttendee.propTypes = {
  attendee: PropTypes.shape({
    walletAddr: PropTypes.string.isRequired,
    thumbnailURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default LotteryAttendee;
