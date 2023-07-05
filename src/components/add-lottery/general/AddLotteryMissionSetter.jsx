import React, { useState } from 'react';
import { Accordion, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AddLotteryMissionSetter(props) {
  const [selectedPlatform, setSelectedPlatform] = useState('Twitter');

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const [selectedType, setSelectedType] = useState('Follow Account');

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };
  return (
    <Accordion.Body>
      <Form>
        <Form.Group>
          <Form.Label>Platform{props.mission.name}</Form.Label>
          <DropdownButton id="dropdown-basic-button" title={selectedPlatform}>
            <Dropdown.Item onClick={() => handleSelect('Twitter')}>
              Twitter
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect('Facebook')}>
              Facebook
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect('Something else')}>
              Something else
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mission Type </Form.Label>
          <DropdownButton id="dropdown-basic-button" title={selectedType}>
            <Dropdown.Item onClick={() => handleTypeSelect('Follow Account')}>
              Follow Account
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Form.Group>
          <Form.Label>Account to Follow</Form.Label>
          <Form.Control type="text" placeholder="@ETHGlobal"></Form.Control>
        </Form.Group>
      </Form>
    </Accordion.Body>
  );
}

AddLotteryMissionSetter.propTypes = {
  idx: PropTypes.number.isRequired,
  mission: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteMission: PropTypes.func.isRequired,
};

export default AddLotteryMissionSetter;
