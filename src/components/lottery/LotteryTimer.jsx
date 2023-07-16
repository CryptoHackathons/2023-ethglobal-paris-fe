import React, { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useCountdown } from '../../hooks';

function LotteryTimer(props) {
  const { days, hours, minutes, seconds } = useCountdown(props.expireTime);
  // check if it is expired every seconds
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const expired = useMemo(() => props.expireTime < new Date(), [seconds]);

  return (
    <Card>
      <Card.Header className="text-uppercase text-center fw-bold">
        Lucky Draw{!expired && ' In'}
      </Card.Header>
      <Card.Body className="py-4">
        {expired ? (
          <p className="h2 fw-bold m-0 text-center">Expired</p>
        ) : (
          <Row className="g-3">
            <Col md={3} className="d-flex flex-column align-items-center">
              <p className="h2 fw-bold m-0">{days}</p>
              Days
            </Col>
            <Col md={3} className="d-flex flex-column align-items-center">
              <p className="h2 fw-bold m-0">{hours}</p>
              Hours
            </Col>
            <Col md={3} className="d-flex flex-column align-items-center">
              <p className="h2 fw-bold m-0">{minutes}</p>
              Minutes
            </Col>
            <Col md={3} className="d-flex flex-column align-items-center">
              <p className="h2 fw-bold m-0">{seconds}</p>
              Seconds
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

LotteryTimer.propTypes = {
  expireTime: PropTypes.instanceOf(Date).isRequired, // ISO 8601 format
};

export default LotteryTimer;
