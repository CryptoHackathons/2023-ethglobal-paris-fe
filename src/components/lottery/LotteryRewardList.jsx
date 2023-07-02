import React from 'react';
import LotteryReward from './LotteryReward';
// import PropTypes from 'prop-types'

export function LotteryRewardList() {
  return (
    <div className="d-grid gap-4">
      <LotteryReward />
      <LotteryReward />
      <LotteryReward />
    </div>
  );
}

LotteryRewardList.propTypes = {};
