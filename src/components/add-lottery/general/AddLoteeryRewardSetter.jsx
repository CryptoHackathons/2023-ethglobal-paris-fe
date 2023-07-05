import React, { useState } from 'react';
import { Button, Accordion, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AddLoteeryRewardSetter(props) {
  const [rewardAmount, setRewardAmount] = useState(0);

  return (
    <Accordion.Body>
      <Form>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Reward Photo</Form.Label>
          <Form.Control value={props.reward.photoPath} type="file" size="lg" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Reward Title</Form.Label>
          <Form.Control type="text" placeholder="Reward Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label> Description </Form.Label>
          <Form.Control as="textarea" rows={6} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Reward amount </Form.Label>
          <InputGroup className="mb-3">
            <Button
              variant="outline-secondary"
              data-type="minus"
              disabled={rewardAmount === 0}
              onClick={() => setRewardAmount(rewardAmount - 1)}
            >
              -
            </Button>
            <Form.Control
              aria-label="Example text with two button addons"
              type="int"
              value={rewardAmount}
            />
            <Button
              variant="outline-secondary"
              data-type="plus"
              onClick={() => setRewardAmount(rewardAmount + 1)}
            >
              +
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
      <Button onClick={() => props.onDeleteReward()}>Delete</Button>
    </Accordion.Body>
  );
}

AddLoteeryRewardSetter.propTypes = {
  idx: PropTypes.number.isRequired,
  reward: PropTypes.shape({
    photoPath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    RewardAmount: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteReward: PropTypes.func.isRequired,
};

export default AddLoteeryRewardSetter;
