import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

export function AddLotteryStep1() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-grid gap-4">
        <Form>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Lottery Banner</Form.Label>
            <Form.Control type="file" size="lg" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> Lottery Ticket</Form.Label>
            <Form.Control type="text" placeholder="Lottery Title..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label> Description </Form.Label>
            <Form.Control as="textarea" rows={6} />
          </Form.Group>
          <div className="mb-3 d-flex gap-3">
            <Form.Group
              className="flex-grow-1"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Label> From </Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group
              className="flex-grow-1"
              controlId="exampleForm.ControlInput4"
            >
              <Form.Label> To </Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </div>
        </Form>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button onClick={() => navigate('../rewards')}>Next</Button>
        </div>
      </div>
    </>
  );
}

AddLotteryStep1.propTypes = {};
