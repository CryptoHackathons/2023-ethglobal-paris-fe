import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

function LotteryAttendee(props) {
  const { userName } = props;

  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column align-items-center gap-3">
          <Image
            roundedCircle
            width={64}
            src="https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail"
          />
          <p className="fw-bold m-0">{userName}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

LotteryAttendee.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default LotteryAttendee;
