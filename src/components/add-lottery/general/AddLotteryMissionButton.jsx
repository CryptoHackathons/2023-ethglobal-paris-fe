import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function AddLotteryMissionButton(props) {
  const { icon, onClick, children } = props;

  return (
    <Button
      className="d-flex align-items-center text-start ps-3 pe-4 py-3"
      variant="primary"
      onClick={onClick}
    >
      <i className={`bi bi-${icon} h4 m-0`}></i>
      {children && (
        <span className="mx-3 h5 fw-bold m-0 w-100">{children}</span>
      )}
    </Button>
  );
}

AddLotteryMissionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default AddLotteryMissionButton;
