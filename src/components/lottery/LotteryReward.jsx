import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function LotteryReward(props) {
  const { reward } = props;

  return (
    <Card>
      <Row className="g-0">
        <Col sm={4} className="position-relative">
          <Card.Img
            src={reward.imageURL}
            className="object-fit-cover w-100 h-100 rounded-end-0"
          />
        </Col>
        <Col sm={8} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title className="fw-bold">{reward.title}</Card.Title>
            <Card.Text>
              {reward.description}
              <br />
              Quantity: {reward.quantity}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

LotteryReward.propTypes = {
  reward: PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default LotteryReward;
