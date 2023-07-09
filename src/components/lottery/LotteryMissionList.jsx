import React from 'react';
import PropTypes from 'prop-types';
import LotteryMissionButton from './LotteryMissionButton';
import { titleCase } from '../../utils/functions';

const getMissionLink = (mission) => {
  return `https://${
    mission.platform === 'facebook' ? 'www.facebook.com' : 'twitter.com'
  }/${mission.accountID}`;
};

export function LotteryMissionList(props) {
  const { missionList } = props;
  return (
    <div className="d-grid gap-3">
      {missionList.map((m, idx) => (
        <LotteryMissionButton
          key={idx}
          link={getMissionLink(m)}
          icon={m.platform}
          completed={m.completed}
        >
          Follow {m.accountName} on {titleCase(m.platform)}
        </LotteryMissionButton>
      ))}
    </div>
  );
}

LotteryMissionList.propTypes = {
  missionList: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      platform: PropTypes.oneOf(['facebook', 'twitter']),
      action: PropTypes.oneOf(['follow']),
      accountID: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
