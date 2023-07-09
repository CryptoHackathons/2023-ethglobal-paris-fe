import { atom } from 'jotai';

export const addLotteryAtom = {
  steps: atom([
    {
      title: 'Lottery Information',
      isCurrent: false,
      url: '/lottery-info',
    },
    {
      title: 'Rewards Information',
      isCurrent: false,
      url: '/rewards',
    },
    {
      title: 'Lottery Missions',
      isCurrent: false,
      url: '/missions',
    },
    {
      title: 'Confirmation',
      isCurrent: true,
      url: '/confirmation',
    },
  ]),
};
