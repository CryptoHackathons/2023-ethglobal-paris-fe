import React, { useState } from 'react';
import { Button, Accordion, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AddLotteryRewardSetter(props) {
  const [rewardAmount, setRewardAmount] = useState(props.reward.quantity);
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  return (
    <Accordion.Body className="d-grid gap-3">
      {/* <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Reward Photo</Form.Label>
          <Form.Control type="file" size="lg" onChange={handleFileChange} />
          <div>{selectedFile && selectedFile.name}</div>
        </Form.Group> */}
      <Form.Group controlId={`addLottery.rewards.${props.idx}.imageURL`}>
        <Form.Label>Reward Image URL</Form.Label>
        <Form.Control
          type="url"
          name={`imageURL.${props.idx}`}
          defaultValue={props.reward.imageURL}
          placeholder="Enter reward banner URL..."
          required
        />
      </Form.Group>
      <Form.Group controlId={`addLottery.rewards.${props.idx}.title`}>
        <Form.Label>Reward Title</Form.Label>
        <Form.Control
          type="text"
          name={`title.${props.idx}`}
          defaultValue={props.reward.title}
          placeholder="Enter reward title..."
          required
        />
      </Form.Group>
      <Form.Group controlId={`addLottery.rewards.${props.idx}.description`}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name={`description.${props.idx}`}
          defaultValue={props.reward.description}
          rows={6}
          placeholder="Enter reward description..."
          required
        />
      </Form.Group>
      <Form.Group controlId={`addLottery.rewards.${props.idx}.quantity`}>
        <Form.Label>Reward Quantity</Form.Label>
        <InputGroup className="mb-3">
          <Button
            variant="outline-secondary"
            disabled={rewardAmount === 0}
            onClick={() => setRewardAmount(rewardAmount - 1)}
          >
            <i className={`bi bi-dash-lg`}></i>
          </Button>
          <Form.Control
            type="int"
            name={`quantity.${props.idx}`}
            value={rewardAmount}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setRewardAmount(rewardAmount + 1)}
          >
            <i className={`bi bi-plus-lg`}></i>
          </Button>
        </InputGroup>
      </Form.Group>
      <Button
        variant="danger"
        onClick={() => props.onDeleteReward()}
        disabled={props.isLast}
      >
        Delete
      </Button>
    </Accordion.Body>
  );
}

AddLotteryRewardSetter.propTypes = {
  idx: PropTypes.number.isRequired,
  reward: PropTypes.shape({
    imageURL: PropTypes.file,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  onDeleteReward: PropTypes.func.isRequired,
};

export default AddLotteryRewardSetter;
