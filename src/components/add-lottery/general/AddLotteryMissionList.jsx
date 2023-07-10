import React from 'react';
import PropTypes from 'prop-types';
import AddLotteryMissionButton from './AddLotteryMissionButton';
import { titleCase } from '../../../utils/functions';

export function AddLotteryMissionList(props) {
  return (
    <div className="d-grid gap-3">
      {props.missions.map((m, idx) => (
        <AddLotteryMissionButton key={idx} icon={m.platform} completed={false}>
          Follow @{m.accountID} on {titleCase(m.platform)}
        </AddLotteryMissionButton>
      ))}
    </div>
  );
}

AddLotteryMissionList.propTypes = {
  missions: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.oneOf(['facebook', 'twitter']),
      action: PropTypes.oneOf(['follow']),
      accountID: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
