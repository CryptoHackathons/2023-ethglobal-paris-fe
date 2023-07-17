import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function LotteryMissionButton(props) {
  const { icon, completed, onClick, children } = props;

  return (
    <Button
      className="d-flex align-items-center text-start ps-3 pe-4 py-3"
      variant={completed ? 'secondary' : 'primary'}
      onClick={onClick}
      disabled={completed}
    >
      <i className={`bi bi-${icon} fs-4 m-0`}></i>
      {children && <span className="mx-3 fs-5 fw-bold w-100">{children}</span>}
      <i
        className="bi bi-check-circle-fill fs-4 m-0"
        style={{ visibility: completed ? null : 'hidden' }}
      ></i>
    </Button>
  );
}

LotteryMissionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default LotteryMissionButton;
