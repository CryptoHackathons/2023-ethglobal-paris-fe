import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { ButtonSubmit } from '../common/button';
import { useSetAtom } from 'jotai';
import { lotteryAtom } from '../../model';

export function LotteryMissionModal({ show, missionID, onClose }) {
  const [validated, setValidated] = useState(false);
  const setCompleteMission = useSetAtom(lotteryAtom.completeMission);

  const handleClose = useCallback(() => {
    setValidated(false);
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();
      setValidated(true);

      if (form.checkValidity() === false) return;

      setCompleteMission(missionID);
      handleClose();
    },
    [handleClose, missionID, setCompleteMission]
  );

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="mission.verify"
          className="d-grid gap-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="mission.verify.url">
            <Form.Label>Mission Verify URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              placeholder="Enter social media URL to verify mission..."
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <ButtonSubmit loading={false} type="submit" form="mission.verify">
          Submit
        </ButtonSubmit>
      </Modal.Footer>
    </Modal>
  );
}

LotteryMissionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  missionID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
