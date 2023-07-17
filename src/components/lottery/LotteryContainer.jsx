import React, { useMemo } from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import { useAtomValue } from 'jotai';
import { lotteryAtom } from '../../model';
import { getDemoDateString } from '../../utils/functions';
import LotteryMissionList from './LotteryMissionList';
import LotteryAttendeeList from './LotteryAttendeeList';
import LotteryRewardList from './LotteryRewardList';
import LotteryTimer from './LotteryTimer';

export function LotteryContainer() {
  const lottery = useAtomValue(lotteryAtom.lottery);
  const expired = useMemo(() => lottery.endTime < new Date(), [lottery]);

  return (
    <>
      <Image className="w-100 object-fit-cover" src={lottery.bannerURL} />
      <Row>
        <Col md={7} className="px-4 py-5">
          <div className="d-grid gap-5">
            <div id="lottery-title">
              <div className="gap-4 d-flex align-items-center mb-4">
                <Image
                  className="border"
                  roundedCircle
                  width={64}
                  src={lottery.host.thumbnailURL}
                />
                <h4 className="m-0 fw-bold">{lottery.host.name}</h4>
              </div>
              <div>
                <h3 className="fw-bold">{lottery.title}</h3>
                {/* sat timezone and format to Paris for demo purpose */}
                <p className="m-0">
                  {getDemoDateString(lottery.startTime)} ~{' '}
                  {getDemoDateString(lottery.endTime)} (GMT+2)
                </p>
              </div>
            </div>
            <div id="lottery-mission">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Missions</h3>
                <p className="m-0">
                  Finished ({lottery.missions.totalCompletedMissions}/
                  {lottery.missions.totalRequiredMissions})
                </p>
              </div>
              <LotteryMissionList missionList={lottery.missions.missionList} />
            </div>
            <div id="lottery-description">
              <h3 className="fw-bold mb-3">Description</h3>
              <p>{lottery.description}</p>
            </div>
            <div id="lottery-attendee">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Attendee</h3>
                <p className="m-0">{lottery.attendee.totalAttendees} Users</p>
              </div>
              <LotteryAttendeeList attendees={lottery.attendee.sample} />
            </div>
          </div>
        </Col>
        <Col md={5} className="border-start border-dark px-4 py-5">
          <div className="d-grid gap-5">
            <div id="lottery-info-and-action" className="d-grid gap-4">
              {/* <LotteryBadgeHolder /> */}
              <Button disabled={expired}>Draw</Button>
              <LotteryTimer expireTime={lottery.endTime} />
            </div>
            <div id="lottery-rewards">
              <h3 className="fw-bold mb-3">
                Rewards <Badge pill>{lottery.prizes.totalQuantity}</Badge>
              </h3>
              <LotteryRewardList rewardList={lottery.prizes.contents} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}