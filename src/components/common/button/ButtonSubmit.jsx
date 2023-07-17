import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

export function ButtonSubmit(props) {
  const {
    loading,
    className,
    bsVariant,
    disabled,
    type,
    form,
    onClick,
    children,
  } = props;

  return (
    <Button
      className={className}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      form={form}
    >
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}

ButtonSubmit.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  bsVariant: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  form: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
