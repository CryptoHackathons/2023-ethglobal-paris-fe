import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const addLotteryAtom = {
  submitting: atom(false),
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
  lotteryDraft: {
    hostDraft: atomWithReset({
      thumbnailURL:
        'https://static.accupass.com/org/2105221437371944440174.jpg',
      name: 'Skyline Film',
    }),
    infoDraft: atomWithReset({
      bannerURL: '',
      title: '',
      startTime: '1980-01-01T00:00:00.000Z', // ISO 8601 format (UTC)
      endTime: '1980-01-01T00:00:00.000Z', // ISO 8601 format (UTC)
      description: '',
    }),
    rewardsDraft: atomWithReset({
      totalQuantity: 0,
      contents: [
        {
          // UUID v4 will be generated by backend
          imageURL: '',
          title: '',
          description: '',
          quantity: 0,
        },
      ],
    }),
    missionDraft: atomWithReset({
      totalCompletedMissions: 0,
      totalRequiredMissions: 0,
      missionList: [
        {
          // UUID v4 will be generated by backend
          // completed: boolean will be generated by backend
          platform: '', // facebook | twitter
          action: '', // only 'follow' is supported
          accountID: '',
          // accountName (display name of twitter/facebook account) will be generated by backend
        },
      ],
    }),
  },
};
