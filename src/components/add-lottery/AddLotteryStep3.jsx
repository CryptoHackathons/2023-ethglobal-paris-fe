import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

export function AddLotteryStep3() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-grid gap-4">
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
