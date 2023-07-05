import React, { useState } from 'react';
import { Accordion, Button, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddLotteryMissionSetter from './general/AddLotteryMissionSetter';

// import PropTypes from 'prop-types';

export function AddLotteryStep3() {
  const navigate = useNavigate();
  const emptyMission = {
    name: '',
  };

  const [missions, setMissions] = useState([emptyMission]);
  const [requiredMissionAmount, setRequiredMissionAmount] = useState(0);

  const handleDeleteMission = (id) => {
    setMissions((prev) => {
      return prev.filter((_, index) => index !== id);
    });
  };

  const handleAddMission = () => {
    setMissions((prev) => {
      return [...prev, emptyMission];
    });
  };

  return (
    <>
      <div className="d-grid gap-4">
        <Accordion defaultActiveKey="0" alwaysOpen>
          {missions.map((m, idx) => (
            <>
              <Accordion.Item eventKey={idx}>
                <Accordion.Header>Mission {idx + 1}</Accordion.Header>
                <AddLotteryMissionSetter
                  idx={idx}
                  mission={m}
                  onDeleteReward={() => handleDeleteMission(idx)}
                />
              </Accordion.Item>
            </>
          ))}
        </Accordion>
        <Button onClick={() => handleAddMission()}> Add Mission</Button>
        <Form.Label> Required Missions to complete</Form.Label>
        <InputGroup className="mb-3">
          <Button
            variant="outline-secondary"
            data-type="minus"
            disabled={requiredMissionAmount === 0}
            onClick={() => setRequiredMissionAmount(requiredMissionAmount - 1)}
          >
            -
          </Button>
          <Form.Control
            aria-label="Example text with two button addons"
            type="int"
            value={requiredMissionAmount}
          />
          <Button
            variant="outline-secondary"
            data-type="plus"
            disabled={requiredMissionAmount === missions.length}
            onClick={() => setRequiredMissionAmount(requiredMissionAmount + 1)}
          >
            +
          </Button>
        </InputGroup>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button onClick={() => navigate('../rewards')} variant="secondary">
            Back
          </Button>
          <Button onClick={() => navigate('../confirmation')}>Next</Button>
        </div>
      </div>
    </>
  );
}

AddLotteryStep3.propTypes = {};
