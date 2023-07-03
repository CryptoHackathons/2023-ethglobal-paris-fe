import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

export function AddLotteryStep2() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-grid gap-4">
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button
            onClick={() => navigate('../lottery-info')}
            variant="secondary"
          >
            Back
          </Button>
          <Button onClick={() => navigate('../missions')}>Next</Button>
        </div>
      </div>
    </>
  );
}

AddLotteryStep2.propTypes = {};
