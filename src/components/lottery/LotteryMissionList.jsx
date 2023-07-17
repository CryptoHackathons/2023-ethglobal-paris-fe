import React from 'react';
import PropTypes from 'prop-types';
import LotteryMissionButton from './LotteryMissionButton';
import { titleCase } from '../../utils/functions';
import { useSetAtom } from 'jotai';
import { lotteryAtom } from '../../model';

// const getMissionLink = (mission) => {
//   return `https://${
//     mission.platform === 'facebook' ? 'www.facebook.com' : 'twitter.com'
//   }/${mission.accountID}`;
// };

function LotteryMissionList(props) {
  const { missionList } = props;
  const setMissionModal = useSetAtom(lotteryAtom.missionModal);

  return (
    <div className="d-grid gap-3">
      {missionList.map((m, idx) => (
        <LotteryMissionButton
          key={idx}
          icon={m.platform}
          completed={m.completed}
          onClick={() =>
            setMissionModal((prev) => ({
              ...prev,
              show: true,
              missionID: m.id,
            }))
          }
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

export default LotteryMissionList;
