import React, { useCallback, useMemo } from 'react';
import { Badge, Button, Image } from 'react-bootstrap';
import { AddLotteryMissionList, AddLotteryRewardList } from './general';
import { useNavigate } from 'react-router-dom';
import { addLotteryAtom } from '../../model';
import { useAtom } from 'jotai';
import { getDemoDateString } from '../../utils/functions';

export function AddLotteryStep4() {
  const navigate = useNavigate();
  const [infoDraft] = useAtom(addLotteryAtom.lotteryDraft.infoDraft);
  const [rewardsDraft] = useAtom(addLotteryAtom.lotteryDraft.rewardsDraft);
  const [missionDraft] = useAtom(addLotteryAtom.lotteryDraft.missionDraft);

  // Date objects for Lottery
  const dtFrom = useMemo(() => new Date(infoDraft.timeFrom), [infoDraft]);
  const dtTo = useMemo(() => new Date(infoDraft.timeTo), [infoDraft]);

  const handleSubmitLottery = useCallback(() => {
    console.log('TODO: submit lottery API call');
  }, []);

  return (
    <>
      <div className="d-grid gap-5">
        <Image className="w-100 object-fit-cover" src={infoDraft.bannerURL} />
        <div id="lottery-title">
          <h3 className="fw-bold">{infoDraft.title}</h3>
          <p className="m-0">
            {getDemoDateString(dtFrom)} ~ {getDemoDateString(dtTo)} (GMT+2)
          </p>
        </div>
        <div id="lottery-rewards">
          <h3 className="fw-bold mb-3">
            Rewards <Badge pill>{rewardsDraft.totalQuantity}</Badge>
          </h3>
          <AddLotteryRewardList rewards={rewardsDraft.contents} />
        </div>
        <div id="lottery-mission">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h3 className="fw-bold m-0 flex-fill">Missions</h3>
            <p className="m-0">
              Required Missions: {missionDraft.totalRequiredMissions}
            </p>
          </div>
          <AddLotteryMissionList missions={missionDraft.missionList} />
        </div>
        <div id="lottery-description">
          <h3 className="fw-bold mb-3">Description</h3>
          <p>{infoDraft.description}</p>
        </div>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button onClick={() => navigate('../missions')} variant="secondary">
            Back
          </Button>
          <Button onClick={handleSubmitLottery}>Submit</Button>
        </div>
      </div>
    </>
  );
}
