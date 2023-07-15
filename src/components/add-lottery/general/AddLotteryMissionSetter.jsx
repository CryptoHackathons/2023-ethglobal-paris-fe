import React from 'react';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AddLotteryMissionSetter(props) {
  return (
    <Accordion.Body className="d-grid gap-3">
      <Form.Group controlId={`addLottery.missions.${props.idx}.platform`}>
        <Form.Label>Platform</Form.Label>
        <Form.Select
          name={`platform.${props.idx}`}
          defaultValue={props.mission.platform}
          required
        >
          <option selected disabled value="">
            Select platform of this mission...
          </option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId={`addLottery.missions.${props.idx}.action`}>
        <Form.Label>Mission Type </Form.Label>
        <Form.Select
          name={`action.${props.idx}`}
          defaultValue={props.mission.action}
          required
        >
          <option selected disabled value="">
            Select mission type...
          </option>
          <option value="follow">Follow Account</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId={`addLottery.missions.${props.idx}.accountID`}>
        <Form.Label>Account to Follow</Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            type="text"
            name={`accountID.${props.idx}`}
            defaultValue={props.mission.accountID}
            placeholder="AccountID"
            required
          ></Form.Control>
        </InputGroup>
      </Form.Group>
      <Button
        variant="danger"
        onClick={() => props.onDeleteMission()}
        disabled={props.isLast}
      >
        Delete
      </Button>
    </Accordion.Body>
  );
}

AddLotteryMissionSetter.propTypes = {
  idx: PropTypes.number.isRequired,
  mission: PropTypes.shape({
    platform: PropTypes.oneOf(['facebook', 'twitter']).isRequired,
    action: PropTypes.oneOf(['follow']).isRequired,
    accountID: PropTypes.string.isRequired,
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  onDeleteMission: PropTypes.func.isRequired,
};

export default AddLotteryMissionSetter;
