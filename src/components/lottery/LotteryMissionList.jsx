import React from 'react';
// import PropTypes from 'prop-types';
import LotteryMissionButton from './LotteryMissionButton';

export function LotteryMissionList() {
  return (
    <div className="d-grid gap-3">
      <LotteryMissionButton icon="twitter" completed={false}>
        Follow @ETHGlobal on Twitter
      </LotteryMissionButton>
      <LotteryMissionButton icon="medium" completed={true}>
        Follow @ETHGlobal on Medium
      </LotteryMissionButton>
    </div>
  );
}

LotteryMissionList.propTypes = {};
