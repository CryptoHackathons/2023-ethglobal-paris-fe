import React, { useCallback, useState } from 'react';
import { Accordion, Button, InputGroup, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddLotteryMissionSetter from './general/AddLotteryMissionSetter';
import { useAtom } from 'jotai';
import { addLotteryAtom } from '../../model/addLottery';

const EMPTY_MISSION = {
  platform: '',
  action: '',
  accountID: '',
};

export function AddLotteryStep3() {
  const navigate = useNavigate();
  const [missionDraft, setMissionDraft] = useAtom(
    addLotteryAtom.lotteryDraft.missionDraft
  );

  const [validated, setValidated] = useState(false);
  const [missions, setMissions] = useState(missionDraft.missionList);
  const [requiredMissionAmount, setRequiredMissionAmount] = useState(
    missionDraft.totalRequiredMissions
  );

  const handleDeleteMission = useCallback((id) => {
    setMissions((prev) => {
      return prev.filter((_, index) => index !== id);
    });
  }, []);

  const handleAddMission = useCallback(() => {
    setMissions((prev) => {
      return [...prev, { ...EMPTY_MISSION }];
    });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();
      setValidated(true);

      if (form.checkValidity() === false) return;

      const fd = new FormData(form);
      const m = missions.map((m, idx) => ({
        ...m,
        platform: fd.get(`platform.${idx}`),
        action: fd.get(`action.${idx}`),
        accountID: fd.get(`accountID.${idx}`),
      }));

      console.log('data from missions form:', m);

      setMissionDraft((prev) => ({
        ...prev,
        totalRequiredMissions: parseInt(fd.get('totalRequiredMissions')),
        missionList: [...m],
      }));
      navigate('../confirmation');
    },
    [missions, navigate, setMissionDraft]
  );

  return (
    <Card>
      <Card.Body>
        <div className="d-grid gap-4">
          <Form
            id="addLottery.missions"
            className="d-grid gap-4"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Accordion defaultActiveKey="0" alwaysOpen>
              {missions.map((m, idx) => (
                <Accordion.Item key={idx} eventKey={idx.toString()}>
                  <Accordion.Header>Mission {idx + 1}</Accordion.Header>
                  <AddLotteryMissionSetter
                    idx={idx}
                    isLast={missions.length === 1 && idx === 0}
                    mission={m}
                    onDeleteMission={() => handleDeleteMission(idx)}
                  />
                </Accordion.Item>
              ))}
            </Accordion>
            <Button onClick={() => handleAddMission()}> Add Mission</Button>
            <Form.Group controlId="addLottery.missions.requiredMissions">
              <Form.Label> Required Missions to complete</Form.Label>
              <InputGroup className="mb-3">
                <Button
                  variant="outline-secondary"
                  disabled={requiredMissionAmount === 0}
                  onClick={() =>
                    setRequiredMissionAmount(requiredMissionAmount - 1)
                  }
                >
                  <i className={`bi bi-dash-lg`}></i>
                </Button>
                <Form.Control
                  type="int"
                  name="totalRequiredMissions"
                  value={requiredMissionAmount}
                  required
                />
                <Button
                  variant="outline-secondary"
                  disabled={requiredMissionAmount === missions.length}
                  onClick={() =>
                    setRequiredMissionAmount(requiredMissionAmount + 1)
                  }
                >
                  <i className={`bi bi-plus-lg`}></i>
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          <div className="d-grid gap-1 w-50 mx-auto">
            <Button onClick={() => navigate('../rewards')} variant="secondary">
              Back
            </Button>
            {/* <Button onClick={() => navigate('../confirmation')}>Next</Button> */}
            <Button type="submit" form="addLottery.missions">
              Next
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

AddLotteryStep3.propTypes = {};
