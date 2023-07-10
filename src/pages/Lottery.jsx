import React, { useEffect, useMemo } from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import {
  LotteryAttendeeList,
  LotteryMissionList,
  LotteryRewardList,
  LotteryTimer,
} from '../components/lottery';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { lotteryAtom } from '../model';
import { getDemoDateString } from '../utils/functions';

export function LotteryPage() {
  const { lotteryID } = useParams();
  const [lottery] = useAtom(lotteryAtom.lottery);

  // Date objects for Lottery
  const dtFrom = useMemo(() => new Date(lottery.info.timeFrom), [lottery]);
  const dtTo = useMemo(() => new Date(lottery.info.timeTo), [lottery]);
  const expired = dtTo < new Date();

  useEffect(() => {
    console.log(lotteryID);
    // TODO: fetch lottery from API
  }, [lotteryID]);

  return (
    <>
      <Image className="w-100 object-fit-cover" src={lottery.info.bannerURL} />
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
                <h3 className="fw-bold">{lottery.info.title}</h3>
                {/* sat timezone and format to Paris for demo purpose */}
                <p className="m-0">
                  {getDemoDateString(dtFrom)} ~ {getDemoDateString(dtTo)}{' '}
                  (GMT+2)
                </p>
              </div>
            </div>
            <div id="lottery-mission">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Missions</h3>
                <p className="m-0">
                  Finished ({lottery.mission.totalCompletedMissions}/
                  {lottery.mission.totalRequiredMissions})
                </p>
              </div>
              <LotteryMissionList missionList={lottery.mission.missionList} />
            </div>
            <div id="lottery-description">
              <h3 className="fw-bold mb-3">Description</h3>
              <p>{lottery.info.description}</p>
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
              <LotteryTimer expireTime={lottery.info.timeTo} />
            </div>
            <div id="lottery-rewards">
              <h3 className="fw-bold mb-3">
                Rewards <Badge pill>{lottery.rewards.totalQuantity}</Badge>
              </h3>
              <LotteryRewardList rewardList={lottery.rewards.contents} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

LotteryPage.propTypes = {};
