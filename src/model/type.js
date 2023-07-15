import PropTypes from 'prop-types';

export const LotteryPropType = {
  bannerURL: PropTypes.string.isRequired,
  title: PropTypes.string,
  createdAt: PropTypes.date,
  updatedAt: PropTypes.date,
  startTime: PropTypes.date,
  endTime: PropTypes.date,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number,
  missions: {
    totalRequiredMissions: PropTypes.number,
    missionList: PropTypes.arrayOf({
      accountID: PropTypes.string,
      action: PropTypes.string,
      platform: PropTypes.string,
    }),
  },
  prizes: {
    contents: PropTypes.arrayOf({
      imageURL: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      quantity: PropTypes.number,
    }),
    totalQuantity: PropTypes.number,
  },
  proof: null,
};
