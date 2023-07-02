import React from 'react';
// import PropTypes from 'prop-types';
import AddLotteryMissionButton from './AddLotteryMissionButton';

export function AddLotteryMissionList() {
  return (
    <div className="d-grid gap-3">
      <AddLotteryMissionButton icon="facebook" completed={false}>
        Follow Skyline Film 屋頂電影院 on Facebook
      </AddLotteryMissionButton>
      <AddLotteryMissionButton icon="instagram" completed={true}>
        Follow Skyline Film 屋頂電影院 on Instagram
      </AddLotteryMissionButton>
    </div>
  );
}

AddLotteryMissionList.propTypes = {};
