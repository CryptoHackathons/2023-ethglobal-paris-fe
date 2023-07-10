import React from 'react';
import AddLotteryReward from './AddLotteryReward';
import PropTypes from 'prop-types';

export function AddLotteryRewardList(props) {
  return (
    <div className="d-grid gap-4">
      {props.rewards.map((reward, idx) => (
        <AddLotteryReward key={idx} reward={reward} />
      ))}
    </div>
  );
}

AddLotteryRewardList.propTypes = {
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
