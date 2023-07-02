import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export function ButtonIconLeft(props) {
  const {
    bsIcon,
    className,
    bsVariant,
    type,
    form,
    disabled,
    onClick,
    children,
  } = props;

  return (
    <Button
      className={className}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      <i className={`bi ${bsIcon}`}></i>
      {children && <span className="ms-2">{children}</span>}
    </Button>
  );
}

ButtonIconLeft.propTypes = {
  bsIcon: PropTypes.string.isRequired,
  className: PropTypes.string,
  bsVariant: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
