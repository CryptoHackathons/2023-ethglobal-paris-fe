import React from 'react';
import LotteryReward from './LotteryReward';
// import PropTypes from 'prop-types'

const MOCK_REWARDS = [
  {
    imgUrl: 'https://static.accupass.com/eventintro/2306210815051620670305.jpg',
    title: '海上鋼琴師 The Legend of 1900 電影票',
    description: '7/21(Fri) 19:00 (18:00 開放入場 Opens at 18:00)',
    quantity: 2,
  },
  {
    imgUrl: 'https://static.accupass.com/eventintro/2306210815226000364040.jpg',
    title: '不離職冒險王 Irreductible 電影票',
    description: '7/21(Fri) 21:50 (21:20 開放入場 Opens at 21:20)',
    quantity: 2,
  },
  {
    imgUrl: 'https://static.accupass.com/eventintro/2306210815511462000363.jpg',
    title: '媽的多重宇宙  Everything Everywhere All at Once 電影票',
    description: '7/22(Sat) 19:00 (18:00 開放入場 Opens at 18:00)',
    quantity: 2,
  },
];

export function LotteryRewardList() {
  return (
    <div className="d-grid gap-4">
      {MOCK_REWARDS.map((reward, idx) => (
        <LotteryReward key={idx} reward={reward} />
      ))}
    </div>
  );
}

LotteryRewardList.propTypes = {};
