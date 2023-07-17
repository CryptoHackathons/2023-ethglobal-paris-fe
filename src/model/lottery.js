import { atom } from 'jotai';

export const lotteryAtom = {
  loading: atom(false),
  submitting: atom(false),
  lottery: atom({
    id: 'c5f9fbf6-7690-4b0f-a532-48e1937edde7', // UUID v4
    startTime: new Date('2023-07-08T05:00:00.000Z'), // ISO 8601 format (UTC)
    endTime: new Date('2023-07-30T05:00:00.000Z'), // ISO 8601 format (UTC)
    bannerURL:
      'https://static.accupass.com/eventbanner/2306261712589032454360.jpg',
    title:
      'Skyline Film 屋頂電影院 7月台北屋頂放映 7/21(Fri) - 7/23(Sun) 贈票活動',
    description:
      '7月的盛夏，沒什麼比在屋頂喝杯冰涼透心的啤酒，吃著香嫩多汁的美式燻肉，伴著徐徐微風與好電影，還要來得痛快。穿越時空與平行宇宙，經典中的經典，還有讓你捧腹大笑的絕妙好戲。台北7月屋頂，滿足你對好電影的所有想像。',
    host: {
      thumbnailURL:
        'https://static.accupass.com/org/2105221437371944440174.jpg',
      name: 'Skyline Film',
    },
    missions: {
      totalCompletedMissions: 1, // count completed missions
      totalRequiredMissions: 2,
      missionList: [
        {
          id: 'f27c1514-abcc-4302-958e-078f9bcaeaae', // UUID v4
          completed: true,
          platform: 'facebook', // facebook | twitter
          action: 'follow', // only 'follow' is supported
          accountID: 'Skylinefilm',
          accountName: 'Skyline Film 屋頂電影院',
        },
        {
          id: '95644117-2ae0-42e2-b426-e81bd2143729', // UUID v4
          completed: false,
          platform: 'twitter', // facebook | twitter
          action: 'follow', // only 'follow' is supported
          accountID: 'SkylineFilms',
          accountName: 'Skyline Film 屋頂電影院',
        },
      ],
    },
    prizes: {
      totalQuantity: 6,
      contents: [
        {
          id: '43e12767-6f48-47d1-809f-8db917d6ace2', // UUID v4
          imageURL:
            'https://static.accupass.com/eventintro/2306210815051620670305.jpg',
          title: '海上鋼琴師 The Legend of 1900 電影票',
          description: '7/21(Fri) 19:00 (18:00 開放入場 Opens at 18:00)',
          quantity: 2,
        },
        {
          id: 'b15aef15-1a3a-45d5-b73b-1d9f4cc99240', // UUID v4
          imageURL:
            'https://static.accupass.com/eventintro/2306210815226000364040.jpg',
          title: '不離職冒險王 Irreductible 電影票',
          description: '7/21(Fri) 21:50 (21:20 開放入場 Opens at 21:20)',
          quantity: 2,
        },
        {
          id: 'cc5532d8-deab-4fcd-826a-10ac37a3959f', // UUID v4
          imageURL:
            'https://static.accupass.com/eventintro/2306210815511462000363.jpg',
          title: '媽的多重宇宙 Everything Everywhere All at Once 電影票',
          description: '7/22(Sat) 19:00 (18:00 開放入場 Opens at 18:00)',
          quantity: 2,
        },
      ],
    },
    attendee: {
      totalAttendees: 89225,
      sample: [
        // random sample of 8 attendees
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
        {
          walletAddr: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          thumbnailURL:
            'https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail',
        },
      ],
    },
  }),
  missionModal: atom({
    show: false,
    missionID: '',
  }),
  completeMission: atom(null, (get, set, missionID) => {
    const lottery = get(lotteryAtom.lottery);
    const isLotteryExists = lottery.missions.missionList
      .map((m) => m.id)
      .includes(missionID);

    if (!isLotteryExists) return;

    const newLottery = {
      ...lottery,
      missions: {
        ...lottery.missions,
        totalCompletedMissions: lottery.missions.totalCompletedMissions + 1,
        missionList: lottery.missions.missionList.map((m) => {
          return m.id === missionID
            ? {
                ...m,
                completed: true,
              }
            : m;
        }),
      },
    };

    set(lotteryAtom.lottery, newLottery);
  }),
};
