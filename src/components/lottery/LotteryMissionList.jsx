import React from 'react';
// import PropTypes from 'prop-types';
import LotteryMissionButton from './LotteryMissionButton';

export function LotteryMissionList() {
  return (
    <div className="d-grid gap-3">
      <LotteryMissionButton icon="facebook" completed={false}>
        Follow Skyline Film 屋頂電影院 on Facebook
      </LotteryMissionButton>
      <LotteryMissionButton icon="instagram" completed={true}>
        Follow Skyline Film 屋頂電影院 on Instagram
      </LotteryMissionButton>
    </div>
  );
}

LotteryMissionList.propTypes = {};
