import React from 'react';
import LotteryReward from './LotteryReward';
import PropTypes from 'prop-types';

function LotteryRewardList(props) {
  const { rewardList } = props;
  return (
    <div className="d-grid gap-4">
      {rewardList.map((reward, idx) => (
        <LotteryReward key={idx} reward={reward} />
      ))}
    </div>
  );
}

LotteryRewardList.propTypes = {
  rewardList: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default LotteryRewardList;
