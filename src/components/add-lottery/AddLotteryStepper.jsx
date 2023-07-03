import React from 'react';
import PropTypes from 'prop-types';

const STEPS = [
  {
    title: 'Lottery Information',
    isCurrent: false,
    url: '/lottery-info',
  },
  {
    title: 'Rewards Information',
    isCurrent: false,
    url: '/rewards-info',
  },
  {
    title: 'Lottery Missions',
    isCurrent: false,
    url: '/missions',
  },
  {
    title: 'Confirmation',
    isCurrent: true,
    url: '/confirmation',
  },
];

function AddLotteryStep(props) {
  const { isCurrent, isLast, number, title } = props;

  return (
    <div className="d-flex gap-4">
      <div className="d-flex flex-column align-items-center">
        <div
          className={`rounded-circle py-2 px-3 text-white mb-1 ${
            isCurrent ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          {number}
        </div>
        <div
          className={`h-100 bg-secondary${isLast ? ' d-none' : ''}`}
          style={{ width: '1px' }}
        ></div>
      </div>
      <div className="mb-5">
        <p className="text-muted mb-1">Step {number}</p>
        <h5 className="fw-bold m-0">{title}</h5>
      </div>
    </div>
  );
}

AddLotteryStep.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export function AddLotteryStepper() {
  return (
    <div className="d-flex flex-column mt-2 ms-2 gap-1">
      {STEPS.map((step, idx) => (
        <AddLotteryStep
          key={idx}
          isCurrent={step.isCurrent}
          isLast={idx === STEPS.length - 1}
          number={idx + 1}
          title={step.title}
        />
      ))}
    </div>
  );
}
